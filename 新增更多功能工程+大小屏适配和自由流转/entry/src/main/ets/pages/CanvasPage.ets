/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { window } from '@kit.ArkUI';
import Logger from '../common/utils/Logger';
import DrawModel, { DrawStatistics } from '../viewmodel/DrawModel';
import PrizeDialog from '../view/PrizeDialog';
import TenDrawDialog from '../view/TenDrawDialog';
import HistoryDialog from '../view/HistoryDialog';
import StatisticsDialog from '../view/StatisticsDialog';
import SettingsDialog from '../view/SettingsDialog';
import PrizeData from '../viewmodel/PrizeData';
import StyleConstants from '../common/constants/StyleConstants';
import CommonConstants from '../common/constants/CommonConstants';
import ColorConstants from '../common/constants/ColorConstants';
import DeviceAdapter, { DeviceType, DeviceConfig } from '../common/utils/DeviceAdapter';
import { DistributedStateManager, AppMigrationState, HistoryRecord } from '../common/utils/DistributedStateManager';
import { Context } from '@kit.AbilityKit';

// Get context.
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
let context: Context = uiContext!.getHostContext()!;

@Entry
@Component
struct CanvasPage {
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private canvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  @State drawModel: DrawModel = new DrawModel();
  @State screenWidth: number = 0;
  @State screenHeight: number = 0;
  @State rotateDegree: number = 0;
  @State enableFlag: boolean = true;
  @State prizeData: PrizeData = new PrizeData();
  @State tenDrawResults: PrizeData[] = [];
  @State history: PrizeData[] = [];
  @State statistics: DrawStatistics = new DrawStatistics();
  @State pityCounter: number = 0;
  @State deviceConfig: DeviceConfig | null = null;
  @State isLandscape: boolean = false;
  @State isMigrated: boolean = false;
  @State migrationSummary: string = '';

  private deviceAdapter: DeviceAdapter = DeviceAdapter.getInstance();
  private stateManager: DistributedStateManager = DistributedStateManager.getInstance();

  // Dialog controllers
  prizeDialogController: CustomDialogController = new CustomDialogController({
    builder: PrizeDialog({
      prizeData: $prizeData,
      enableFlag: $enableFlag
    }),
    autoCancel: false,
    alignment: DialogAlignment.Center,
    cancel: () => {
      this.enableFlag = !this.enableFlag;
    }
  });

  tenDrawDialogController: CustomDialogController = new CustomDialogController({
    builder: TenDrawDialog({
      prizes: $tenDrawResults,
      enableFlag: $enableFlag
    }),
    autoCancel: false,
    alignment: DialogAlignment.Center,
    cancel: () => {
      this.enableFlag = !this.enableFlag;
    }
  });

  historyDialogController: CustomDialogController = new CustomDialogController({
    builder: HistoryDialog({
      history: $history
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center
  });

  statisticsDialogController: CustomDialogController = new CustomDialogController({
    builder: StatisticsDialog({
      statistics: $statistics,
      pityCounter: $pityCounter
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center
  });

  settingsDialogController: CustomDialogController = new CustomDialogController({
    builder: SettingsDialog({}),
    autoCancel: true,
    alignment: DialogAlignment.Center
  });

  aboutToAppear() {
    // Register migration state listener
    this.stateManager.addStateListener(this.onMigrationStateRestore.bind(this));
    
    // Check for restored migration state from AppStorage (set by EntryAbility)
    const restoredStateStr = AppStorage.get<string>('restoredMigrationState');
    if (restoredStateStr) {
      const restoredState = this.stateManager.deserializeState(restoredStateStr);
      if (restoredState) {
        this.restoreFromMigration(restoredState);
        // Clear the restored state flag
        AppStorage.setOrCreate('restoredMigrationState', '');
      }
    }
    
    // Also check for existing state in state manager
    const existingState = this.stateManager.getState();
    if (existingState) {
      this.restoreFromMigration(existingState);
    }
    
    // Obtains the width and height of the screen, excluding the height of the navigation view.
    window.getLastWindow(context)
      .then((windowClass: window.Window) => {
        windowClass.setWindowLayoutFullScreen(true);
        let windowProperties = windowClass.getWindowProperties();
        this.screenWidth = this.getUIContext().px2vp(windowProperties.windowRect.width);
        this.screenHeight = this.getUIContext().px2vp(windowProperties.windowRect.height);
        
        // Initialize device adapter
        this.deviceConfig = this.deviceAdapter.initConfig(this.screenWidth, this.screenHeight);
        this.isLandscape = this.deviceConfig.isLandscape;
      })
      .catch((error: Error) => {
        Logger.error('Failed to obtain the window size. Cause: ' + JSON.stringify(error));
      })
  }
  
  aboutToDisappear() {
    // Save state for potential migration
    this.saveMigrationState();
    // Remove migration listener
    this.stateManager.removeStateListener(this.onMigrationStateRestore.bind(this));
  }
  
  /**
   * Save current state for distributed migration
   */
  private saveMigrationState(): void {
    // Convert history to records
    const historyRecords: HistoryRecord[] = [];
    for (let i = 0; i < this.history.length; i++) {
      const p = this.history[i];
      const record: HistoryRecord = {
        index: p.index,
        name: p.name ?? '',
        rarity: p.rarity,
        timestamp: p.timestamp,
        imageSrc: p.imageSrc ?? ''
      };
      historyRecords.push(record);
    }
    
    const state: AppMigrationState = {
      totalDraws: this.statistics.totalDraws,
      singleDraws: this.statistics.singleDraws,
      tenDraws: this.statistics.tenDraws,
      commonCount: this.statistics.commonCount,
      mediumCount: this.statistics.mediumCount,
      highCount: this.statistics.highCount,
      superCount: this.statistics.superCount,
      pityCounter: this.pityCounter,
      history: historyRecords,
      migrateTime: Date.now()
    };
    this.stateManager.saveState(state);
    
    // Also save to AppStorage for EntryAbility to access during migration
    const stateStr = this.stateManager.serializeState();
    AppStorage.setOrCreate('migrationState', stateStr);
  }
  
  /**
   * Restore state from migration
   */
  private restoreFromMigration(state: AppMigrationState): void {
    Logger.info('Restoring state from migration');
    
    // Restore statistics
    this.statistics.totalDraws = state.totalDraws;
    this.statistics.singleDraws = state.singleDraws;
    this.statistics.tenDraws = state.tenDraws;
    this.statistics.commonCount = state.commonCount;
    this.statistics.mediumCount = state.mediumCount;
    this.statistics.highCount = state.highCount;
    this.statistics.superCount = state.superCount;
    
    // Restore pity counter
    this.pityCounter = state.pityCounter;
    
    // Restore history using for loop (ArkTS compatible)
    const restoredHistory: PrizeData[] = [];
    for (let i = 0; i < state.history.length; i++) {
      const h = state.history[i];
      const prize = new PrizeData();
      prize.index = h.index;
      prize.name = h.name;
      prize.rarity = h.rarity;
      prize.timestamp = h.timestamp;
      prize.imageSrc = h.imageSrc;
      restoredHistory.push(prize);
    }
    this.history = restoredHistory;
    
    // Update draw model state
    this.drawModel.restoreState(state);
    
    // Mark as migrated
    this.isMigrated = true;
    this.migrationSummary = this.stateManager.getMigrationSummary();
    
    Logger.info('Migration restored: ' + this.migrationSummary);
  }
  
  /**
   * Handle migration state restore callback
   */
  private onMigrationStateRestore(state: AppMigrationState): void {
    this.restoreFromMigration(state);
  }
  
  /**
   * Simulate migration for testing on emulator
   * This saves current state, clears it, then restores to verify the logic works
   */
  private simulateMigration(): void {
    // Step 1: Save current state
    this.saveMigrationState();
    const savedState = this.stateManager.getState();
    
    if (!savedState) {
      Logger.error('No state to simulate migration');
      return;
    }
    
    // Step 2: Clear current UI state (simulate new device)
    this.statistics = new DrawStatistics();
    this.pityCounter = 0;
    this.history = [];
    this.isMigrated = false;
    
    // Step 3: Restore after delay (simulate receiving migration data)
    setTimeout(() => {
      this.restoreFromMigration(savedState);
      Logger.info('Migration simulation completed');
    }, 500);
  }

  build() {
    Stack({ alignContent: Alignment.Center }) {
      Canvas(this.canvasContext)
        .width(StyleConstants.FULL_PERCENT)
        .height(StyleConstants.FULL_PERCENT)
        .onReady(() => {
          this.drawModel.draw(this.canvasContext, this.screenWidth, this.screenHeight);
        })
        .rotate({
          x: 0,
          y: 0,
          z: 1,
          angle: this.rotateDegree,
          centerX: this.screenWidth / CommonConstants.TWO,
          centerY: this.screenHeight / CommonConstants.TWO
        })

      // Center draw button
      Image($r('app.media.ic_center'))
        .width(this.getWheelButtonSize())
        .height(this.getWheelButtonSize())
        .enabled(this.enableFlag)
        .onClick(() => {
          this.performSingleDraw();
        })

      // Top device info indicator
      if (this.deviceConfig) {
        Column() {
          // Migration status indicator
          if (this.isMigrated) {
            Row() {
              Text('🔄 已从其他设备迁移')
                .fontSize(this.deviceAdapter.scaleValue(12))
                .fontColor('#4CAF50')
              Text(this.migrationSummary)
                .fontSize(this.deviceAdapter.scaleValue(10))
                .fontColor('#FFFFFF')
                .opacity(0.7)
                .margin({ left: 8 })
            }
            .width('90%')
            .justifyContent(FlexAlign.Center)
            .padding(8)
            .backgroundColor('#80000000')
            .borderRadius(8)
            .margin({ bottom: 8 })
          }
          
          Row() {
            Text(this.getDeviceTypeText())
              .fontSize(this.deviceAdapter.scaleValue(10))
              .fontColor('#FFFFFF')
              .opacity(0.7)
          }
          .width('90%')
          .justifyContent(FlexAlign.End)
          .padding(8)
        }
        .width('100%')
        .align(Alignment.Top)
        .margin({ top: 20 })
      }

      // Bottom control panel
      Column() {
        // Pity indicator
        Row() {
          Text($r('app.string.pity_counter') + ': ' + this.pityCounter + '/' + CommonConstants.PITY_THRESHOLD)
            .fontSize(this.deviceAdapter.scaleValue(12))
            .fontColor('#FFFFFF')
        }
        .width(this.isLandscape ? '50%' : '90%')
        .justifyContent(FlexAlign.Center)
        .padding(8)
        .backgroundColor('#80000000')
        .borderRadius(8)
        .margin({ bottom: 8 })

        // Action buttons - responsive layout
        if (this.isLandscape) {
          // Landscape layout - horizontal scroll
          Scroll() {
            Row() {
              this.ActionButtonsBuilder()
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceEvenly)
          }
          .scrollable(ScrollDirection.Horizontal)
          .width('95%')
          .height(50)
        } else {
          // Portrait layout - grid
          Column() {
            Row() {
              this.ActionButtonsBuilder()
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceEvenly)
          }
          .width('95%')
        }
      }
      .width(StyleConstants.FULL_PERCENT)
      .align(Alignment.Bottom)
      .margin({ bottom: this.deviceAdapter.isTablet() ? 60 : 40 })
    }
    .width(StyleConstants.FULL_PERCENT)
    .height(StyleConstants.FULL_PERCENT)
    .backgroundImage($r('app.media.ic_background'), ImageRepeat.NoRepeat)
    .backgroundImageSize({
      width: StyleConstants.FULL_PERCENT,
      height: StyleConstants.BACKGROUND_IMAGE_SIZE
    })
  }

  @Builder
  ActionButtonsBuilder() {
    // Single draw button
    Button($r('app.string.single_draw'))
      .width(this.getButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(14))
      .fontColor('#FFFFFF')
      .backgroundColor(ColorConstants.BUTTON_BG_COLOR)
      .borderRadius(20)
      .enabled(this.enableFlag)
      .onClick(() => {
        this.performSingleDraw();
      })

    // Ten draw button
    Button($r('app.string.ten_draw'))
      .width(this.getButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(14))
      .fontColor('#FFFFFF')
      .backgroundColor('#FF4757')
      .borderRadius(20)
      .enabled(this.enableFlag)
      .onClick(() => {
        this.performTenDraw();
      })

    // History button
    Button($r('app.string.history'))
      .width(this.getSmallButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(12))
      .fontColor('#FFFFFF')
      .backgroundColor('#2ED573')
      .borderRadius(20)
      .onClick(() => {
        this.history = this.drawModel.getHistory();
        this.historyDialogController.open();
      })

    // Statistics button
    Button($r('app.string.statistics'))
      .width(this.getSmallButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(12))
      .fontColor('#FFFFFF')
      .backgroundColor('#5352ED')
      .borderRadius(20)
      .onClick(() => {
        this.statistics = this.drawModel.getStatistics();
        this.pityCounter = this.drawModel.getPityCounter();
        this.statisticsDialogController.open();
      })

    // Settings button
    Button('设置')
      .width(this.getSmallButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(12))
      .fontColor('#FFFFFF')
      .backgroundColor('#FF9500')
      .borderRadius(20)
      .onClick(() => {
        this.settingsDialogController.open();
      })

    // Simulate migration button (for testing on emulator)
    Button('模拟迁移')
      .width(this.getSmallButtonWidth())
      .height(this.getButtonHeight())
      .fontSize(this.deviceAdapter.scaleValue(12))
      .fontColor('#FFFFFF')
      .backgroundColor('#9C27B0')
      .borderRadius(20)
      .onClick(() => {
        this.simulateMigration();
      })
  }

  private getWheelButtonSize(): string {
    if (this.deviceAdapter.isTablet()) {
      return '15%';
    } else if (this.deviceAdapter.isFoldable()) {
      return '17%';
    } else {
      return this.isLandscape ? '12%' : '19.3%';
    }
  }

  private getButtonWidth(): number {
    const config = this.deviceAdapter.getConfig();
    return config.buttonWidth;
  }

  private getSmallButtonWidth(): number {
    const config = this.deviceAdapter.getConfig();
    return Math.round(config.buttonWidth * 0.75);
  }

  private getButtonHeight(): number {
    const config = this.deviceAdapter.getConfig();
    return config.buttonHeight;
  }

  private getDeviceTypeText(): string {
    const type = this.deviceAdapter.getDeviceType();
    switch (type) {
      case DeviceType.TABLET:
        return '📱 平板模式';
      case DeviceType.FOLDABLE:
        return '📱 折叠屏模式';
      case DeviceType.PHONE:
      default:
        return '📱 手机模式';
    }
  }

  /**
   * Perform single draw with animation.
   */
  performSingleDraw() {
    this.enableFlag = !this.enableFlag;

    // Get prize result using gacha system
    this.prizeData = this.drawModel.drawSingle();
    this.pityCounter = this.drawModel.getPityCounter();

    // Calculate random angle for animation
    let randomAngle = Math.round(Math.random() * CommonConstants.CIRCLE);

    this.getUIContext().animateTo({
      duration: CommonConstants.DURATION,
      curve: Curve.Ease,
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Normal,
      onFinish: () => {
        this.rotateDegree = CommonConstants.ANGLE - randomAngle;
        this.prizeDialogController.open();
      }
    }, () => {
      this.rotateDegree = CommonConstants.CIRCLE * CommonConstants.FIVE +
      CommonConstants.ANGLE - randomAngle;
    })
  }

  /**
   * Perform ten consecutive draws.
   */
  performTenDraw() {
    this.enableFlag = !this.enableFlag;

    // Get ten draw results
    this.tenDrawResults = this.drawModel.drawTen();
    this.pityCounter = this.drawModel.getPityCounter();

    // Calculate random angle for animation
    let randomAngle = Math.round(Math.random() * CommonConstants.CIRCLE);

    this.getUIContext().animateTo({
      duration: CommonConstants.DURATION,
      curve: Curve.Ease,
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Normal,
      onFinish: () => {
        this.rotateDegree = CommonConstants.ANGLE - randomAngle;
        this.tenDrawDialogController.open();
      }
    }, () => {
      this.rotateDegree = CommonConstants.CIRCLE * CommonConstants.FIVE +
      CommonConstants.ANGLE - randomAngle;
    })
  }
}
