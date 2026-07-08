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

import DeviceAdapter, { DeviceType } from '../utils/DeviceAdapter';

const uiContext: UIContext | undefined = AppStorage.get('uiContext');

export default class StyleConstants {
  /**
   * Font weight.
   */
  static readonly FONT_WEIGHT: number = 500;

  /**
   * One hundred percent.
   */
  static readonly FULL_PERCENT: string = '100%';

  /**
   * Background image size.
   */
  static readonly BACKGROUND_IMAGE_SIZE: string = '38.7%';

  /**
   * Center circle image width.
   */
  static readonly CENTER_IMAGE_WIDTH: string = '19.3%';

  /**
   * Center circle image height.
   */
  static readonly CENTER_IMAGE_HEIGHT: string = '10.6%';

  /**
   * Arc text size.
   */
  static readonly ARC_TEXT_SIZE: number = uiContext!.fp2px(14);

  /**
   * Button width.
   */
  static readonly BUTTON_WIDTH: string = '80vp';

  /**
   * Button height.
   */
  static readonly BUTTON_HEIGHT: string = '40vp';

  /**
   * Panel width.
   */
  static readonly PANEL_WIDTH: string = '90%';

  /**
   * Panel max height.
   */
  static readonly PANEL_MAX_HEIGHT: string = '60%';

  /**
   * History item height.
   */
  static readonly HISTORY_ITEM_HEIGHT: string = '60vp';

  /**
   * Prize grid item size.
   */
  static readonly PRIZE_GRID_SIZE: string = '80vp';

  /**
   * Get responsive arc text size based on device type.
   */
  static getArcTextSize(): number {
    const adapter = DeviceAdapter.getInstance();
    const baseSize = 14;
    return uiContext!.fp2px(adapter.scaleValue(baseSize));
  }

  /**
   * Get responsive panel width.
   */
  static getPanelWidth(): string {
    const adapter = DeviceAdapter.getInstance();
    const config = adapter.getConfig();
    return config.panelWidth;
  }

  /**
   * Get responsive panel max height.
   */
  static getPanelMaxHeight(): string {
    const adapter = DeviceAdapter.getInstance();
    const config = adapter.getConfig();
    return config.panelMaxHeight;
  }

  /**
   * Get responsive grid columns.
   */
  static getGridColumns(): number {
    const adapter = DeviceAdapter.getInstance();
    return adapter.getGridColumns();
  }

  /**
   * Get responsive prize grid item size.
   */
  static getPrizeGridSize(): string {
    const adapter = DeviceAdapter.getInstance();
    const baseSize = 80;
    const scaledSize = adapter.scaleValue(baseSize);
    return `${scaledSize}vp`;
  }

  /**
   * Get responsive history item height.
   */
  static getHistoryItemHeight(): string {
    const adapter = DeviceAdapter.getInstance();
    const baseSize = 60;
    const scaledSize = adapter.scaleValue(baseSize);
    return `${scaledSize}vp`;
  }
}
