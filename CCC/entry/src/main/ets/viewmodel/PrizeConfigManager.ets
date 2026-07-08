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
 * Prize configuration item.
 */
export class PrizeConfigItem {
  id: number = 0;
  name: string = '';
  displayName: string = '';
  color: string = '#999999';
  textColor: string = '#333333';
  rarity: PrizeRarity = PrizeRarity.COMMON;
  probability: number = 0;
  imageKey: string = '';
}

/**
 * Wheel color configuration.
 */
export class WheelColorConfig {
  flowerOutColor: string = '#ED6E21';
  flowerInnerColor: string = '#F8A01E';
  outCircleColor: string = '#F7CD03';
  innerCircleColor: string = '#F8A01E';
  arcColors: string[] = ['#FFC6BD', '#FFEC90', '#ECF9C7', '#FFC6BD', '#FFEC90', '#ECF9C7'];
  textColor: string = '#ED6E21';
}

/**
 * Prize configuration manager for customizing prizes and colors.
 */
export default class PrizeConfigManager {
  private static instance: PrizeConfigManager;
  private prizeConfigs: PrizeConfigItem[] = [];
  private colorConfig: WheelColorConfig = new WheelColorConfig();
  private storageKey: string = 'prize_config';
  private colorStorageKey: string = 'wheel_color_config';

  private constructor() {
    this.initDefaultConfig();
    this.loadFromStorage();
  }

  static getInstance(): PrizeConfigManager {
    if (!PrizeConfigManager.instance) {
      PrizeConfigManager.instance = new PrizeConfigManager();
    }
    return PrizeConfigManager.instance;
  }

  /**
   * Initialize default prize configuration.
   */
  private initDefaultConfig(): void {
    const prizes: PrizeConfigItem[] = [];
    
    let item1 = new PrizeConfigItem();
    item1.id = 1;
    item1.name = 'watermelon';
    item1.displayName = '西瓜';
    item1.color = '#FF6B6B';
    item1.textColor = '#FFFFFF';
    item1.rarity = PrizeRarity.SUPER;
    item1.probability = 0.1;
    item1.imageKey = 'ic_watermelon';
    prizes.push(item1);

    let item2 = new PrizeConfigItem();
    item2.id = 2;
    item2.name = 'hamburger';
    item2.displayName = '汉堡';
    item2.color = '#4ECDC4';
    item2.textColor = '#FFFFFF';
    item2.rarity = PrizeRarity.MEDIUM;
    item2.probability = 6;
    item2.imageKey = 'ic_hamburg';
    prizes.push(item2);

    let item3 = new PrizeConfigItem();
    item3.id = 3;
    item3.name = 'smile';
    item3.displayName = '谢谢参与';
    item3.color = '#95E1D3';
    item3.textColor = '#333333';
    item3.rarity = PrizeRarity.COMMON;
    item3.probability = 93.3;
    item3.imageKey = 'ic_smile';
    prizes.push(item3);

    let item4 = new PrizeConfigItem();
    item4.id = 4;
    item4.name = 'cake';
    item4.displayName = '蛋糕';
    item4.color = '#F38181';
    item4.textColor = '#FFFFFF';
    item4.rarity = PrizeRarity.HIGH;
    item4.probability = 0.6;
    item4.imageKey = 'ic_cake';
    prizes.push(item4);

    let item5 = new PrizeConfigItem();
    item5.id = 5;
    item5.name = 'hamburger2';
    item5.displayName = '汉堡';
    item5.color = '#AA96E3';
    item5.textColor = '#FFFFFF';
    item5.rarity = PrizeRarity.MEDIUM;
    item5.probability = 6;
    item5.imageKey = 'ic_hamburg';
    prizes.push(item5);

    let item6 = new PrizeConfigItem();
    item6.id = 6;
    item6.name = 'smile2';
    item6.displayName = '谢谢参与';
    item6.color = '#FCBAD3';
    item6.textColor = '#333333';
    item6.rarity = PrizeRarity.COMMON;
    item6.probability = 93.3;
    item6.imageKey = 'ic_smile';
    prizes.push(item6);

    this.prizeConfigs = prizes;
    this.colorConfig = new WheelColorConfig();
  }

  /**
   * Load configuration from persistent storage.
   */
  private loadFromStorage(): void {
    try {
      const savedPrizes = AppStorage.get<string>(this.storageKey);
      if (savedPrizes) {
        const parsed = JSON.parse(savedPrizes) as PrizeConfigItem[];
        if (parsed && parsed.length > 0) {
          this.prizeConfigs = parsed;
        }
      }

      const savedColors = AppStorage.get<string>(this.colorStorageKey);
      if (savedColors) {
        const colorParsed = JSON.parse(savedColors) as WheelColorConfig;
        if (colorParsed) {
          this.colorConfig = colorParsed;
        }
      }
    } catch (error) {
      console.error('Failed to load prize config:', error);
    }
  }

  /**
   * Save configuration to persistent storage.
   */
  saveToStorage(): void {
    try {
      AppStorage.setOrCreate<string>(this.storageKey, JSON.stringify(this.prizeConfigs));
      AppStorage.setOrCreate<string>(this.colorStorageKey, JSON.stringify(this.colorConfig));
    } catch (error) {
      console.error('Failed to save prize config:', error);
    }
  }

  /**
   * Get all prize configurations.
   */
  getPrizeConfigs(): PrizeConfigItem[] {
    const result: PrizeConfigItem[] = [];
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      result.push(this.prizeConfigs[i]);
    }
    return result;
  }

  /**
   * Get prize configuration by ID.
   */
  getPrizeConfig(id: number): PrizeConfigItem | undefined {
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      if (this.prizeConfigs[i].id === id) {
        return this.prizeConfigs[i];
      }
    }
    return undefined;
  }

  /**
   * Update prize configuration.
   */
  updatePrizeConfig(id: number, updates: PrizeConfigItem): void {
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      if (this.prizeConfigs[i].id === id) {
        if (updates.displayName !== undefined) {
          this.prizeConfigs[i].displayName = updates.displayName;
        }
        if (updates.color !== undefined) {
          this.prizeConfigs[i].color = updates.color;
        }
        this.saveToStorage();
        break;
      }
    }
  }

  /**
   * Update prize display name.
   */
  updatePrizeName(id: number, displayName: string): void {
    const updates = new PrizeConfigItem();
    updates.displayName = displayName;
    this.updatePrizeConfig(id, updates);
  }

  /**
   * Update prize color.
   */
  updatePrizeColor(id: number, color: string): void {
    const updates = new PrizeConfigItem();
    updates.color = color;
    this.updatePrizeConfig(id, updates);
  }

  /**
   * Get wheel color configuration.
   */
  getColorConfig(): WheelColorConfig {
    const config = new WheelColorConfig();
    config.flowerOutColor = this.colorConfig.flowerOutColor;
    config.flowerInnerColor = this.colorConfig.flowerInnerColor;
    config.outCircleColor = this.colorConfig.outCircleColor;
    config.innerCircleColor = this.colorConfig.innerCircleColor;
    config.textColor = this.colorConfig.textColor;
    config.arcColors = [];
    for (let i = 0; i < this.colorConfig.arcColors.length; i++) {
      config.arcColors.push(this.colorConfig.arcColors[i]);
    }
    return config;
  }

  /**
   * Update wheel color configuration.
   */
  updateColorConfig(flowerOutColor?: string, flowerInnerColor?: string, outCircleColor?: string,
    innerCircleColor?: string, textColor?: string): void {
    if (flowerOutColor !== undefined) {
      this.colorConfig.flowerOutColor = flowerOutColor;
    }
    if (flowerInnerColor !== undefined) {
      this.colorConfig.flowerInnerColor = flowerInnerColor;
    }
    if (outCircleColor !== undefined) {
      this.colorConfig.outCircleColor = outCircleColor;
    }
    if (innerCircleColor !== undefined) {
      this.colorConfig.innerCircleColor = innerCircleColor;
    }
    if (textColor !== undefined) {
      this.colorConfig.textColor = textColor;
    }
    this.saveToStorage();
  }

  /**
   * Update specific arc color.
   */
  updateArcColor(index: number, color: string): void {
    if (index >= 0 && index < this.colorConfig.arcColors.length) {
      this.colorConfig.arcColors[index] = color;
      this.saveToStorage();
    }
  }

  /**
   * Reset to default configuration.
   */
  resetToDefault(): void {
    this.initDefaultConfig();
    this.saveToStorage();
  }

  /**
   * Get display names for all prizes.
   */
  getDisplayNames(): string[] {
    const names: string[] = [];
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      names.push(this.prizeConfigs[i].displayName);
    }
    return names;
  }

  /**
   * Get arc colors for wheel drawing.
   */
  getArcColors(): string[] {
    const colors: string[] = [];
    for (let i = 0; i < this.colorConfig.arcColors.length; i++) {
      colors.push(this.colorConfig.arcColors[i]);
    }
    return colors;
  }

  /**
   * Get prize display name by index (1-based).
   */
  getDisplayNameByIndex(index: number): string {
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      if (this.prizeConfigs[i].id === index) {
        return this.prizeConfigs[i].displayName;
      }
    }
    return '未知奖品';
  }

  /**
   * Get prize color by index (1-based).
   */
  getColorByIndex(index: number): string {
    for (let i = 0; i < this.prizeConfigs.length; i++) {
      if (this.prizeConfigs[i].id === index) {
        return this.prizeConfigs[i].color;
      }
    }
    return '#999999';
  }
}
