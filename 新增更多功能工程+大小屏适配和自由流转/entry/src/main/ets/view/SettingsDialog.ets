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

import PrizeConfigManager, { PrizeConfigItem, WheelColorConfig } from '../viewmodel/PrizeConfigManager';
import DeviceAdapter, { DeviceType } from '../common/utils/DeviceAdapter';
import { PrizeRarity } from '../common/constants/CommonConstants';

/**
 * Settings dialog for customizing prizes and colors.
 */
@CustomDialog
export default struct SettingsDialog {
  controller: CustomDialogController;
  @State prizeConfigs: PrizeConfigItem[] = [];
  @State colorConfig: WheelColorConfig | null = null;
  @State selectedTabIndex: number = 0;
  @State editingPrizeId: number = 0;
  @State tempName: string = '';
  @State tempColor: string = '';

  private configManager: PrizeConfigManager = PrizeConfigManager.getInstance();
  private deviceAdapter: DeviceAdapter = DeviceAdapter.getInstance();

  aboutToAppear(): void {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.prizeConfigs = this.configManager.getPrizeConfigs();
    this.colorConfig = this.configManager.getColorConfig();
  }

  build() {
    Column() {
      // Header
      Row() {
        Text('设置')
          .fontSize(this.deviceAdapter.scaleValue(20))
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')

        Blank()

        Button('重置默认')
          .fontSize(this.deviceAdapter.scaleValue(12))
          .height(32)
          .backgroundColor('#FF6B35')
          .onClick(() => {
            this.configManager.resetToDefault();
            this.loadConfig();
          })

        Button('关闭')
          .fontSize(this.deviceAdapter.scaleValue(12))
          .height(32)
          .backgroundColor('#999999')
          .margin({ left: 8 })
          .onClick(() => {
            this.controller.close();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // Tab bar
      Row() {
        Text('奖品设置')
          .fontSize(this.deviceAdapter.scaleValue(14))
          .fontColor(this.selectedTabIndex === 0 ? '#FF6B35' : '#666666')
          .fontWeight(this.selectedTabIndex === 0 ? FontWeight.Bold : FontWeight.Normal)
          .padding({ left: 16, right: 16, top: 8, bottom: 8 })
          .borderRadius(4)
          .backgroundColor(this.selectedTabIndex === 0 ? '#FFF5F0' : 'transparent')
          .onClick(() => {
            this.selectedTabIndex = 0;
          })

        Text('颜色设置')
          .fontSize(this.deviceAdapter.scaleValue(14))
          .fontColor(this.selectedTabIndex === 1 ? '#FF6B35' : '#666666')
          .fontWeight(this.selectedTabIndex === 1 ? FontWeight.Bold : FontWeight.Normal)
          .padding({ left: 16, right: 16, top: 8, bottom: 8 })
          .borderRadius(4)
          .backgroundColor(this.selectedTabIndex === 1 ? '#FFF5F0' : 'transparent')
          .onClick(() => {
            this.selectedTabIndex = 1;
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .padding({ top: 8, bottom: 8 })
      .backgroundColor('#F5F5F5')

      // Content
      if (this.selectedTabIndex === 0) {
        this.PrizeSettingsPanel()
      } else {
        this.ColorSettingsPanel()
      }
    }
    .width(this.deviceAdapter.isTablet() ? '80%' : '95%')
    .height('80%')
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .shadow({ radius: 20, color: '#33000000', offsetX: 0, offsetY: 4 })
  }

  @Builder
  PrizeSettingsPanel() {
    Scroll() {
      Column() {
        ForEach(this.prizeConfigs, (prize: PrizeConfigItem) => {
          this.PrizeItemBuilder(prize)
        })
      }
      .width('100%')
      .padding(16)
    }
    .width('100%')
    .layoutWeight(1)
    .scrollBar(BarState.Auto)
  }

  @Builder
  PrizeItemBuilder(prize: PrizeConfigItem) {
    Column() {
      Row() {
        // Prize color indicator
        Circle()
          .width(24)
          .height(24)
          .fill(prize.color)

        Column() {
          Text(prize.displayName)
            .fontSize(this.deviceAdapter.scaleValue(14))
            .fontColor('#333333')
            .fontWeight(FontWeight.Medium)

          Text(this.getRarityText(prize.rarity))
            .fontSize(this.deviceAdapter.scaleValue(10))
            .fontColor('#999999')
            .margin({ top: 2 })
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 12 })
        .layoutWeight(1)

        Button('编辑')
          .fontSize(this.deviceAdapter.scaleValue(12))
          .height(28)
          .width(50)
          .backgroundColor('#F0F0F0')
          .fontColor('#666666')
          .onClick(() => {
            this.editingPrizeId = prize.id;
            this.tempName = prize.displayName;
            this.tempColor = prize.color;
          })
      }
      .width('100%')

      // Edit panel
      if (this.editingPrizeId === prize.id) {
        Column() {
          // Name input
          Row() {
            Text('名称:')
              .fontSize(this.deviceAdapter.scaleValue(12))
              .width(50)

            TextInput({ text: this.tempName })
              .fontSize(this.deviceAdapter.scaleValue(12))
              .height(36)
              .layoutWeight(1)
              .backgroundColor('#F5F5F5')
              .borderRadius(4)
              .onChange((value: string) => {
                this.tempName = value;
              })
          }
          .width('100%')
          .margin({ top: 8 })

          // Color input
          Row() {
            Text('颜色:')
              .fontSize(this.deviceAdapter.scaleValue(12))
              .width(50)

            Row() {
              Circle()
                .width(24)
                .height(24)
                .fill('#FF6B6B')
                .border({ width: this.tempColor === '#FF6B6B' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#FF6B6B'; })

              Circle()
                .width(24)
                .height(24)
                .fill('#4ECDC4')
                .border({ width: this.tempColor === '#4ECDC4' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#4ECDC4'; })

              Circle()
                .width(24)
                .height(24)
                .fill('#F38181')
                .border({ width: this.tempColor === '#F38181' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#F38181'; })

              Circle()
                .width(24)
                .height(24)
                .fill('#AA96E3')
                .border({ width: this.tempColor === '#AA96E3' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#AA96E3'; })

              Circle()
                .width(24)
                .height(24)
                .fill('#95E1D3')
                .border({ width: this.tempColor === '#95E1D3' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#95E1D3'; })

              Circle()
                .width(24)
                .height(24)
                .fill('#FCBAD3')
                .border({ width: this.tempColor === '#FCBAD3' ? 2 : 0, color: '#333333' })
                .margin({ right: 4 })
                .onClick(() => { this.tempColor = '#FCBAD3'; })
            }
            .layoutWeight(1)
          }
          .width('100%')
          .margin({ top: 8 })

          // Action buttons
          Row() {
            Button('取消')
              .fontSize(this.deviceAdapter.scaleValue(12))
              .height(28)
              .backgroundColor('#F0F0F0')
              .fontColor('#666666')
              .onClick(() => {
                this.editingPrizeId = 0;
              })

            Button('保存')
              .fontSize(this.deviceAdapter.scaleValue(12))
              .height(28)
              .backgroundColor('#FF6B35')
              .fontColor('#FFFFFF')
              .margin({ left: 8 })
              .onClick(() => {
                this.configManager.updatePrizeName(prize.id, this.tempName);
                this.configManager.updatePrizeColor(prize.id, this.tempColor);
                this.loadConfig();
                this.editingPrizeId = 0;
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.End)
          .margin({ top: 8 })
        }
        .width('100%')
        .padding(8)
        .backgroundColor('#FAFAFA')
        .borderRadius(8)
        .margin({ top: 8 })
      }
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#FFFFFF')
    .borderRadius(8)
    .margin({ bottom: 8 })
    .shadow({ radius: 4, color: '#11000000', offsetX: 0, offsetY: 2 })
  }

  @Builder
  ColorSettingsPanel() {
    Scroll() {
      Column() {
        if (this.colorConfig) {
          // Wheel colors
          Text('转盘颜色')
            .fontSize(this.deviceAdapter.scaleValue(14))
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .width('100%')
            .margin({ bottom: 8 })

          this.ColorItemBuilder('外圈颜色', this.colorConfig.flowerOutColor, 1)
          this.ColorItemBuilder('内圈颜色', this.colorConfig.innerCircleColor, 2)
          this.ColorItemBuilder('中心圆颜色', this.colorConfig.outCircleColor, 3)
          this.ColorItemBuilder('文字颜色', this.colorConfig.textColor, 4)

          // Arc colors
          Text('扇区颜色')
            .fontSize(this.deviceAdapter.scaleValue(14))
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .width('100%')
            .margin({ top: 16, bottom: 8 })

          if (this.colorConfig.arcColors.length > 0) {
            this.ColorItemBuilder('扇区 1', this.colorConfig.arcColors[0], 10)
          }
          if (this.colorConfig.arcColors.length > 1) {
            this.ColorItemBuilder('扇区 2', this.colorConfig.arcColors[1], 11)
          }
          if (this.colorConfig.arcColors.length > 2) {
            this.ColorItemBuilder('扇区 3', this.colorConfig.arcColors[2], 12)
          }
          if (this.colorConfig.arcColors.length > 3) {
            this.ColorItemBuilder('扇区 4', this.colorConfig.arcColors[3], 13)
          }
          if (this.colorConfig.arcColors.length > 4) {
            this.ColorItemBuilder('扇区 5', this.colorConfig.arcColors[4], 14)
          }
          if (this.colorConfig.arcColors.length > 5) {
            this.ColorItemBuilder('扇区 6', this.colorConfig.arcColors[5], 15)
          }
        }
      }
      .width('100%')
      .padding(16)
    }
    .width('100%')
    .layoutWeight(1)
    .scrollBar(BarState.Auto)
  }

  @Builder
  ColorItemBuilder(label: string, currentColor: string, colorType: number) {
    Row() {
      Text(label)
        .fontSize(this.deviceAdapter.scaleValue(12))
        .fontColor('#666666')
        .layoutWeight(1)

      Circle()
        .width(24)
        .height(24)
        .fill(currentColor)
        .margin({ right: 8 })

      Row() {
        Circle()
          .width(20)
          .height(20)
          .fill('#FFC6BD')
          .border({ width: currentColor === '#FFC6BD' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#FFC6BD'); })

        Circle()
          .width(20)
          .height(20)
          .fill('#FFEC90')
          .border({ width: currentColor === '#FFEC90' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#FFEC90'); })

        Circle()
          .width(20)
          .height(20)
          .fill('#ECF9C7')
          .border({ width: currentColor === '#ECF9C7' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#ECF9C7'); })

        Circle()
          .width(20)
          .height(20)
          .fill('#B5EAD7')
          .border({ width: currentColor === '#B5EAD7' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#B5EAD7'); })

        Circle()
          .width(20)
          .height(20)
          .fill('#C7CEEA')
          .border({ width: currentColor === '#C7CEEA' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#C7CEEA'); })

        Circle()
          .width(20)
          .height(20)
          .fill('#FFDAC1')
          .border({ width: currentColor === '#FFDAC1' ? 2 : 0, color: '#333333' })
          .margin({ right: 2 })
          .onClick(() => { this.applyColor(colorType, '#FFDAC1'); })
      }
    }
    .width('100%')
    .padding(8)
    .backgroundColor('#FAFAFA')
    .borderRadius(8)
    .margin({ bottom: 4 })
  }

  private applyColor(colorType: number, color: string): void {
    switch (colorType) {
      case 1: // flowerOutColor
        this.configManager.updateColorConfig(color, undefined, undefined, undefined, undefined);
        break;
      case 2: // innerCircleColor
        this.configManager.updateColorConfig(undefined, color, undefined, undefined, undefined);
        break;
      case 3: // outCircleColor
        this.configManager.updateColorConfig(undefined, undefined, color, undefined, undefined);
        break;
      case 4: // textColor
        this.configManager.updateColorConfig(undefined, undefined, undefined, undefined, color);
        break;
      case 10: // arcColors[0]
        this.configManager.updateArcColor(0, color);
        break;
      case 11: // arcColors[1]
        this.configManager.updateArcColor(1, color);
        break;
      case 12: // arcColors[2]
        this.configManager.updateArcColor(2, color);
        break;
      case 13: // arcColors[3]
        this.configManager.updateArcColor(3, color);
        break;
      case 14: // arcColors[4]
        this.configManager.updateArcColor(4, color);
        break;
      case 15: // arcColors[5]
        this.configManager.updateArcColor(5, color);
        break;
    }
    this.loadConfig();
  }

  private getRarityText(rarity: PrizeRarity): string {
    switch (rarity) {
      case PrizeRarity.SUPER:
        return '超级稀有';
      case PrizeRarity.HIGH:
        return '高级奖品';
      case PrizeRarity.MEDIUM:
        return '中级奖品';
      case PrizeRarity.COMMON:
        return '普通奖品';
      default:
        return '未知';
    }
  }
}
