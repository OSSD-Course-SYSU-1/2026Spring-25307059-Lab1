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

/**
 * Style constants for all Component.
 */

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
}
