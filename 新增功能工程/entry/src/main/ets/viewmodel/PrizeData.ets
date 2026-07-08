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

import { PrizeRarity } from '../common/constants/CommonConstants';

/**
 * Prize data.
 */
export default class PrizeData {
  /**
   * The prize message.
   */
  message?: Resource;

  /**
   * Image src.
   */
  imageSrc?: string;

  /**
   * Prize rarity level.
   */
  rarity: PrizeRarity = PrizeRarity.COMMON;

  /**
   * Prize name for display.
   */
  name?: string;

  /**
   * Prize index on the wheel.
   */
  index: number = 0;

  /**
   * Timestamp when obtained.
   */
  timestamp: number = 0;
}
