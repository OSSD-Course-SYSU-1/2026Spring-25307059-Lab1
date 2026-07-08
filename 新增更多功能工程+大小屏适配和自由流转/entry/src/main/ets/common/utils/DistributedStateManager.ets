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

import { hilog } from '@kit.PerformanceAnalysisKit';
import { Want } from '@kit.AbilityKit';

/**
 * Application state for distributed migration
 */
export interface AppMigrationState {
  // Draw statistics
  totalDraws: number;
  singleDraws: number;
  tenDraws: number;
  commonCount: number;
  mediumCount: number;
  highCount: number;
  superCount: number;
  
  // Pity counter
  pityCounter: number;
  
  // History records
  history: HistoryRecord[];
  
  // Timestamp
  migrateTime: number;
  
  // Source device info
  sourceDevice?: string;
}

/**
 * History record for migration
 */
export interface HistoryRecord {
  index: number;
  name: string;
  rarity: number;
  timestamp: number;
  imageSrc: string;
}

/**
 * Distributed state manager for cross-device migration
 */
export class DistributedStateManager {
  private static instance: DistributedStateManager;
  private readonly TAG: string = 'DistributedStateManager';
  private readonly DOMAIN: number = 0x0000;
  
  // Current migration state
  private currentState: AppMigrationState | null = null;
  
  // Migration listeners
  private stateListeners: ((state: AppMigrationState) => void)[] = [];
  
  private constructor() {}
  
  /**
   * Get singleton instance
   */
  static getInstance(): DistributedStateManager {
    if (!DistributedStateManager.instance) {
      DistributedStateManager.instance = new DistributedStateManager();
    }
    return DistributedStateManager.instance;
  }
  
  /**
   * Save current application state for migration
   */
  saveState(state: AppMigrationState): void {
    // Manual copy to avoid spread operator (not supported in ArkTS)
    this.currentState = {
      totalDraws: state.totalDraws,
      singleDraws: state.singleDraws,
      tenDraws: state.tenDraws,
      commonCount: state.commonCount,
      mediumCount: state.mediumCount,
      highCount: state.highCount,
      superCount: state.superCount,
      pityCounter: state.pityCounter,
      history: state.history,
      migrateTime: Date.now(),
      sourceDevice: state.sourceDevice
    };
    hilog.info(this.DOMAIN, this.TAG, 'State saved for migration: totalDraws=%{public}d', state.totalDraws);
  }
  
  /**
   * Get saved state for migration
   */
  getState(): AppMigrationState | null {
    return this.currentState;
  }
  
  /**
   * Clear saved state after migration complete
   */
  clearState(): void {
    this.currentState = null;
    hilog.info(this.DOMAIN, this.TAG, 'Migration state cleared');
  }
  
  /**
   * Serialize state to string for transfer
   */
  serializeState(): string {
    if (!this.currentState) {
      return '';
    }
    try {
      return JSON.stringify(this.currentState);
    } catch (error) {
      hilog.error(this.DOMAIN, this.TAG, 'Failed to serialize state: %{public}s', JSON.stringify(error));
      return '';
    }
  }
  
  /**
   * Deserialize state from string
   */
  deserializeState(data: string): AppMigrationState | null {
    if (!data) {
      return null;
    }
    try {
      const state = JSON.parse(data) as AppMigrationState;
      hilog.info(this.DOMAIN, this.TAG, 'State deserialized: totalDraws=%{public}d', state.totalDraws);
      return state;
    } catch (error) {
      hilog.error(this.DOMAIN, this.TAG, 'Failed to deserialize state: %{public}s', JSON.stringify(error));
      return null;
    }
  }
  
  /**
   * Register state change listener
   */
  addStateListener(listener: (state: AppMigrationState) => void): void {
    this.stateListeners.push(listener);
  }
  
  /**
   * Remove state change listener
   */
  removeStateListener(listener: (state: AppMigrationState) => void): void {
    const index = this.stateListeners.indexOf(listener);
    if (index > -1) {
      this.stateListeners.splice(index, 1);
    }
  }
  
  /**
   * Notify all listeners of state change
   */
  notifyStateChange(state: AppMigrationState): void {
    this.stateListeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        hilog.error(this.DOMAIN, this.TAG, 'Listener error: %{public}s', JSON.stringify(error));
      }
    });
  }
  
  /**
   * Check if migration is available
   */
  isMigrationAvailable(): boolean {
    return this.currentState !== null;
  }
  
  /**
   * Get migration summary for display
   */
  getMigrationSummary(): string {
    if (!this.currentState) {
      return '无迁移数据';
    }
    return `总抽奖: ${this.currentState.totalDraws}次 | 保底计数: ${this.currentState.pityCounter}`;
  }
}

/**
 * Migration continuation result
 */
export class MigrationResult {
  isSuccess: boolean = false;
  errorMessage: string = '';
  state: AppMigrationState | null = null;
  
  static success(state: AppMigrationState): MigrationResult {
    const result = new MigrationResult();
    result.isSuccess = true;
    result.state = state;
    return result;
  }
  
  static fail(message: string): MigrationResult {
    const result = new MigrationResult();
    result.isSuccess = false;
    result.errorMessage = message;
    return result;
  }
}
