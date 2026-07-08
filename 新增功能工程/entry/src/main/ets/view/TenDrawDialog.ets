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

import PrizeData from '../viewmodel/PrizeData';
import StyleConstants from '../common/constants/StyleConstants';
import CommonConstants, { PrizeRarity } from '../common/constants/CommonConstants';
import ColorConstants from '../common/constants/ColorConstants';

@CustomDialog
export default struct TenDrawDialog {
  @Link prizes: PrizeData[];
  @Link enableFlag: boolean;
  private controller?: CustomDialogController;

  build() {
    Column() {
      Text($r('app.string.ten_draw_result'))
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 16 })

      // Prize grid
      Grid() {
        ForEach(this.prizes, (prize: PrizeData, index: number) => {
          GridItem() {
            Column() {
              Image(prize.imageSrc !== undefined ? prize.imageSrc : '')
                .width(50)
                .height(50)
                .margin({ bottom: 4 })

              Text(this.getRarityText(prize.rarity))
                .fontSize(10)
                .fontColor(this.getRarityColor(prize.rarity))
                .fontWeight(FontWeight.Bold)
            }
            .padding(8)
            .backgroundColor(this.getRarityBgColor(prize.rarity))
            .borderRadius(8)
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .rowsTemplate('1fr 1fr')
      .columnsGap(8)
      .rowsGap(8)
      .width('90%')
      .height(180)
      .margin({ bottom: 16 })

      // Summary
      Row() {
        Text($r('app.string.super_count') + ': ' + this.getCountByRarity(PrizeRarity.SUPER))
          .fontSize(12)
          .fontColor(ColorConstants.SUPER_PRIZE_COLOR)
        Text($r('app.string.high_count') + ': ' + this.getCountByRarity(PrizeRarity.HIGH))
          .fontSize(12)
          .fontColor(ColorConstants.HIGH_PRIZE_COLOR)
          .margin({ left: 8 })
        Text($r('app.string.medium_count') + ': ' + this.getCountByRarity(PrizeRarity.MEDIUM))
          .fontSize(12)
          .fontColor(ColorConstants.MEDIUM_PRIZE_COLOR)
          .margin({ left: 8 })
      }
      .margin({ bottom: 16 })

      Text($r('app.string.text_confirm'))
        .fontColor($r('app.color.text_font_color'))
        .fontWeight(StyleConstants.FONT_WEIGHT)
        .fontSize($r('app.float.dialog_font_size'))
        .textAlign(TextAlign.Center)
        .onClick(() => {
          this.controller?.close();
          this.enableFlag = !this.enableFlag;
        })
    }
    .backgroundColor($r('app.color.dialog_background'))
    .width('90%')
    .height(350)
    .borderRadius(16)
  }

  private getRarityText(rarity: PrizeRarity): string {
    switch (rarity) {
      case PrizeRarity.SUPER:
        return '★★★';
      case PrizeRarity.HIGH:
        return '★★';
      case PrizeRarity.MEDIUM:
        return '★';
      default:
        return '-';
    }
  }

  private getRarityColor(rarity: PrizeRarity): ResourceColor {
    switch (rarity) {
      case PrizeRarity.SUPER:
        return ColorConstants.SUPER_PRIZE_COLOR;
      case PrizeRarity.HIGH:
        return ColorConstants.HIGH_PRIZE_COLOR;
      case PrizeRarity.MEDIUM:
        return ColorConstants.MEDIUM_PRIZE_COLOR;
      default:
        return ColorConstants.COMMON_PRIZE_COLOR;
    }
  }

  private getRarityBgColor(rarity: PrizeRarity): ResourceColor {
    switch (rarity) {
      case PrizeRarity.SUPER:
        return '#FFFDE7';
      case PrizeRarity.HIGH:
        return '#E3F2FD';
      case PrizeRarity.MEDIUM:
        return '#E8F5E9';
      default:
        return '#F5F5F5';
    }
  }

  private getCountByRarity(rarity: PrizeRarity): number {
    return this.prizes.filter(p => p.rarity === rarity).length;
  }
}
