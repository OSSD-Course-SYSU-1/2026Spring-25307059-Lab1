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
import { PrizeRarity } from '../common/constants/CommonConstants';
import ColorConstants from '../common/constants/ColorConstants';

@CustomDialog
export default struct HistoryDialog {
  @Link history: PrizeData[];
  private controller?: CustomDialogController;

  build() {
    Column() {
      Text($r('app.string.draw_history'))
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 16 })

      if (this.history.length === 0) {
        Text($r('app.string.no_history'))
          .fontSize(14)
          .fontColor('#999999')
          .margin({ top: 40, bottom: 40 })
      } else {
        List() {
          ForEach(this.history, (prize: PrizeData, index: number) => {
            ListItem() {
              Row() {
                Image(prize.imageSrc !== undefined ? prize.imageSrc : '')
                  .width(40)
                  .height(40)
                  .margin({ right: 12 })

                Column() {
                  Text(prize.name !== undefined ? prize.name : '')
                    .fontSize(14)
                    .fontWeight(FontWeight.Medium)

                  Text(this.formatTime(prize.timestamp))
                    .fontSize(10)
                    .fontColor('#999999')
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.Start)
                .layoutWeight(1)

                Text(this.getRarityText(prize.rarity))
                  .fontSize(12)
                  .fontColor(this.getRarityColor(prize.rarity))
                  .fontWeight(FontWeight.Bold)
              }
              .width('100%')
              .padding(12)
              .backgroundColor(index % 2 === 0 ? '#FFFFFF' : '#F9F9F9')
            }
          })
        }
        .width('90%')
        .height(300)
        .divider({ strokeWidth: 1, color: '#EEEEEE' })
      }

      Text($r('app.string.text_confirm'))
        .fontColor($r('app.color.text_font_color'))
        .fontWeight(StyleConstants.FONT_WEIGHT)
        .fontSize($r('app.float.dialog_font_size'))
        .textAlign(TextAlign.Center)
        .margin({ top: 16, bottom: 16 })
        .onClick(() => {
          this.controller?.close();
        })
    }
    .backgroundColor($r('app.color.dialog_background'))
    .width('90%')
    .height(450)
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

  private formatTime(timestamp: number): string {
    if (timestamp === 0) return '';
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}
