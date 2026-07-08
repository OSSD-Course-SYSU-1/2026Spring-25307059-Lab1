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
import PrizeData from '../viewmodel/PrizeData';
import StyleConstants from '../common/constants/StyleConstants';
import CommonConstants from '../common/constants/CommonConstants';
import ColorConstants from '../common/constants/ColorConstants';
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

  aboutToAppear() {
    // Obtains the width and height of the screen, excluding the height of the navigation view.
    window.getLastWindow(context)
      .then((windowClass: window.Window) => {
        windowClass.setWindowLayoutFullScreen(true);
        let windowProperties = windowClass.getWindowProperties();
        this.screenWidth = this.getUIContext().px2vp(windowProperties.windowRect.width);
        this.screenHeight = this.getUIContext().px2vp(windowProperties.windowRect.height);
      })
      .catch((error: Error) => {
        Logger.error('Failed to obtain the window size. Cause: ' + JSON.stringify(error));
      })
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
        .width(StyleConstants.CENTER_IMAGE_WIDTH)
        .height(StyleConstants.CENTER_IMAGE_HEIGHT)
        .enabled(this.enableFlag)
        .onClick(() => {
          this.performSingleDraw();
        })

      // Bottom control panel
      Column() {
        // Pity indicator
        Row() {
          Text($r('app.string.pity_counter') + ': ' + this.pityCounter + '/' + CommonConstants.PITY_THRESHOLD)
            .fontSize(12)
            .fontColor('#FFFFFF')
        }
        .width('90%')
        .justifyContent(FlexAlign.Center)
        .padding(8)
        .backgroundColor('#80000000')
        .borderRadius(8)
        .margin({ bottom: 8 })

        // Action buttons
        Row() {
          // Single draw button
          Button($r('app.string.single_draw'))
            .width(80)
            .height(40)
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor(ColorConstants.BUTTON_BG_COLOR)
            .borderRadius(20)
            .enabled(this.enableFlag)
            .onClick(() => {
              this.performSingleDraw();
            })

          // Ten draw button
          Button($r('app.string.ten_draw'))
            .width(80)
            .height(40)
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor('#FF4757')
            .borderRadius(20)
            .enabled(this.enableFlag)
            .onClick(() => {
              this.performTenDraw();
            })

          // History button
          Button($r('app.string.history'))
            .width(60)
            .height(40)
            .fontSize(12)
            .fontColor('#FFFFFF')
            .backgroundColor('#2ED573')
            .borderRadius(20)
            .onClick(() => {
              this.history = this.drawModel.getHistory();
              this.historyDialogController.open();
            })

          // Statistics button
          Button($r('app.string.statistics'))
            .width(60)
            .height(40)
            .fontSize(12)
            .fontColor('#FFFFFF')
            .backgroundColor('#5352ED')
            .borderRadius(20)
            .onClick(() => {
              this.statistics = this.drawModel.getStatistics();
              this.pityCounter = this.drawModel.getPityCounter();
              this.statisticsDialogController.open();
            })
        }
        .width('95%')
        .justifyContent(FlexAlign.SpaceEvenly)
      }
      .width(StyleConstants.FULL_PERCENT)
      .align(Alignment.Bottom)
      .margin({ bottom: 40 })
    }
    .width(StyleConstants.FULL_PERCENT)
    .height(StyleConstants.FULL_PERCENT)
    .backgroundImage($r('app.media.ic_background'), ImageRepeat.NoRepeat)
    .backgroundImageSize({
      width: StyleConstants.FULL_PERCENT,
      height: StyleConstants.BACKGROUND_IMAGE_SIZE
    })
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
