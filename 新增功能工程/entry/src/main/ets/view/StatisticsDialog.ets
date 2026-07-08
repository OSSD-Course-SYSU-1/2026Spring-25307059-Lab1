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

import { DrawStatistics } from '../viewmodel/DrawModel';
import StyleConstants from '../common/constants/StyleConstants';
import CommonConstants from '../common/constants/CommonConstants';
import ColorConstants from '../common/constants/ColorConstants';

@CustomDialog
export default struct StatisticsDialog {
  @Link statistics: DrawStatistics;
  @Link pityCounter: number;
  private controller?: CustomDialogController;

  build() {
    Column() {
      Text($r('app.string.draw_statistics'))
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 16 })

      // Pity progress
      Column() {
        Text($r('app.string.pity_progress'))
          .fontSize(14)
          .fontWeight(FontWeight.Medium)
          .margin({ bottom: 8 })

        Progress({
          value: this.pityCounter,
          total: CommonConstants.PITY_THRESHOLD,
          type: ProgressType.Linear
        })
          .width('80%')
          .color(ColorConstants.HIGH_PRIZE_COLOR)

        Text(`${this.pityCounter} / ${CommonConstants.PITY_THRESHOLD}`)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })

        Text($r('app.string.remaining_pity') + `: ${CommonConstants.PITY_THRESHOLD - this.pityCounter}`)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .width('90%')
      .padding(16)
      .backgroundColor('#F5F5F5')
      .borderRadius(8)
      .margin({ bottom: 16 })

      // Statistics grid
      Column() {
        Row() {
          this.StatItem($r('app.string.total_draws'), this.statistics.totalDraws.toString())
          this.StatItem($r('app.string.single_draws'), this.statistics.singleDraws.toString())
        }
        Row() {
          this.StatItem($r('app.string.ten_draws'), this.statistics.tenDraws.toString())
          this.StatItem($r('app.string.draw_count'), this.statistics.totalDraws.toString())
        }
      }
      .width('90%')
      .margin({ bottom: 16 })

      // Prize distribution
      Column() {
        Text($r('app.string.prize_distribution'))
          .fontSize(14)
          .fontWeight(FontWeight.Medium)
          .margin({ bottom: 8 })

        Row() {
          this.PrizeStatItem('★★★', this.statistics.superCount, ColorConstants.SUPER_PRIZE_COLOR)
          this.PrizeStatItem('★★', this.statistics.highCount, ColorConstants.HIGH_PRIZE_COLOR)
          this.PrizeStatItem('★', this.statistics.mediumCount, ColorConstants.MEDIUM_PRIZE_COLOR)
          this.PrizeStatItem('-', this.statistics.commonCount, ColorConstants.COMMON_PRIZE_COLOR)
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
      }
      .width('90%')
      .padding(16)
      .backgroundColor('#F5F5F5')
      .borderRadius(8)
      .margin({ bottom: 16 })

      Text($r('app.string.text_confirm'))
        .fontColor($r('app.color.text_font_color'))
        .fontWeight(StyleConstants.FONT_WEIGHT)
        .fontSize($r('app.float.dialog_font_size'))
        .textAlign(TextAlign.Center)
        .onClick(() => {
          this.controller?.close();
        })
    }
    .backgroundColor($r('app.color.dialog_background'))
    .width('90%')
    .height(500)
    .borderRadius(16)
  }

  @Builder
  StatItem(label: Resource | string, value: string) {
    Column() {
      Text(label)
        .fontSize(12)
        .fontColor('#666666')
      Text(value)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ top: 4 })
    }
    .layoutWeight(1)
    .padding(8)
  }

  @Builder
  PrizeStatItem(rarity: string, count: number, color: ResourceColor) {
    Column() {
      Text(rarity)
        .fontSize(14)
        .fontColor(color)
        .fontWeight(FontWeight.Bold)
      Text(count.toString())
        .fontSize(16)
        .fontColor('#333333')
        .margin({ top: 4 })
    }
    .layoutWeight(1)
  }
}
