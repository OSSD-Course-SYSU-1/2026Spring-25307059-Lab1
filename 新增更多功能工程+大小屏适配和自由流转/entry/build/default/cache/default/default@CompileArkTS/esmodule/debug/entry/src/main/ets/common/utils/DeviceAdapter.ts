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
 * Device type enumeration.
 */
export enum DeviceType {
    PHONE = "phone",
    FOLDABLE = "foldable",
    TABLET = "tablet"
}
/**
 * Device configuration for responsive design.
 */
export class DeviceConfig {
    type: DeviceType = DeviceType.PHONE;
    isLandscape: boolean = false;
    screenWidth: number = 0;
    screenHeight: number = 0;
    wheelSizeRatio: number = 0.9;
    buttonWidth: number = 80;
    buttonHeight: number = 40;
    buttonFontSize: number = 14;
    titleFontSize: number = 20;
    normalFontSize: number = 14;
    smallFontSize: number = 12;
    padding: number = 16;
    margin: number = 8;
    panelWidth: string = '90%';
    panelMaxHeight: string = '60%';
    gridColumns: number = 2;
}
/**
 * Button style configuration.
 */
export class ButtonStyle {
    width: number = 80;
    height: number = 40;
    fontSize: number = 14;
}
/**
 * Device adapter for responsive design across phone, foldable, and tablet.
 */
export default class DeviceAdapter {
    private static instance: DeviceAdapter;
    private currentConfig: DeviceConfig | null = null;
    private constructor() { }
    static getInstance(): DeviceAdapter {
        if (!DeviceAdapter.instance) {
            DeviceAdapter.instance = new DeviceAdapter();
        }
        return DeviceAdapter.instance;
    }
    /**
     * Initialize device configuration based on screen dimensions.
     */
    initConfig(screenWidth: number, screenHeight: number): DeviceConfig {
        const isLandscape = screenWidth > screenHeight;
        const minDimension = Math.min(screenWidth, screenHeight);
        const maxDimension = Math.max(screenWidth, screenHeight);
        let type: DeviceType;
        // Determine device type based on screen size
        const aspectRatio = minDimension / maxDimension;
        if (minDimension >= 600) {
            type = DeviceType.TABLET;
        }
        else if (aspectRatio > 0.65 && aspectRatio < 0.85 && maxDimension > 800) {
            type = DeviceType.FOLDABLE;
        }
        else {
            type = DeviceType.PHONE;
        }
        const config = this.getConfigForType(type, screenWidth, screenHeight, isLandscape);
        this.currentConfig = config;
        return config;
    }
    /**
     * Get configuration for specific device type.
     */
    private getConfigForType(type: DeviceType, width: number, height: number, isLandscape: boolean): DeviceConfig {
        const config = new DeviceConfig();
        config.type = type;
        config.isLandscape = isLandscape;
        config.screenWidth = width;
        config.screenHeight = height;
        switch (type) {
            case DeviceType.TABLET:
                config.wheelSizeRatio = 0.7;
                config.buttonWidth = 120;
                config.buttonHeight = 48;
                config.buttonFontSize = 16;
                config.titleFontSize = 28;
                config.normalFontSize = 16;
                config.smallFontSize = 14;
                config.padding = 24;
                config.margin = 12;
                config.panelWidth = '60%';
                config.panelMaxHeight = '70%';
                config.gridColumns = isLandscape ? 4 : 3;
                break;
            case DeviceType.FOLDABLE:
                config.wheelSizeRatio = 0.75;
                config.buttonWidth = 100;
                config.buttonHeight = 44;
                config.buttonFontSize = 15;
                config.titleFontSize = 24;
                config.normalFontSize = 15;
                config.smallFontSize = 13;
                config.padding = 20;
                config.margin = 10;
                config.panelWidth = '75%';
                config.panelMaxHeight = '65%';
                config.gridColumns = isLandscape ? 3 : 2;
                break;
            case DeviceType.PHONE:
            default:
                config.wheelSizeRatio = isLandscape ? 0.6 : 0.9;
                config.buttonWidth = isLandscape ? 70 : 80;
                config.buttonHeight = isLandscape ? 36 : 40;
                config.buttonFontSize = isLandscape ? 12 : 14;
                config.titleFontSize = isLandscape ? 18 : 20;
                config.normalFontSize = isLandscape ? 12 : 14;
                config.smallFontSize = isLandscape ? 10 : 12;
                config.padding = isLandscape ? 12 : 16;
                config.margin = isLandscape ? 6 : 8;
                config.panelWidth = isLandscape ? '50%' : '90%';
                config.panelMaxHeight = '60%';
                config.gridColumns = isLandscape ? 4 : 2;
                break;
        }
        return config;
    }
    /**
     * Get current device configuration.
     */
    getConfig(): DeviceConfig {
        if (!this.currentConfig) {
            return this.initConfig(360, 640);
        }
        return this.currentConfig;
    }
    /**
     * Get device type.
     */
    getDeviceType(): DeviceType {
        return this.getConfig().type;
    }
    /**
     * Check if device is tablet.
     */
    isTablet(): boolean {
        return this.getDeviceType() === DeviceType.TABLET;
    }
    /**
     * Check if device is foldable.
     */
    isFoldable(): boolean {
        return this.getDeviceType() === DeviceType.FOLDABLE;
    }
    /**
     * Check if device is phone.
     */
    isPhone(): boolean {
        return this.getDeviceType() === DeviceType.PHONE;
    }
    /**
     * Check if in landscape mode.
     */
    isLandscape(): boolean {
        return this.getConfig().isLandscape;
    }
    /**
     * Get scaled value based on device type.
     */
    scaleValue(baseValue: number, scaleFactor?: number): number {
        const config = this.getConfig();
        let scale = 1;
        switch (config.type) {
            case DeviceType.TABLET:
                scale = 1.3;
                break;
            case DeviceType.FOLDABLE:
                scale = 1.15;
                break;
            case DeviceType.PHONE:
            default:
                scale = 1;
                break;
        }
        if (scaleFactor) {
            scale *= scaleFactor;
        }
        return Math.round(baseValue * scale);
    }
    /**
     * Get responsive column count for grid layouts.
     */
    getGridColumns(): number {
        return this.getConfig().gridColumns;
    }
    /**
     * Get button style configuration.
     */
    getButtonStyle(): ButtonStyle {
        const config = this.getConfig();
        const style = new ButtonStyle();
        style.width = config.buttonWidth;
        style.height = config.buttonHeight;
        style.fontSize = config.buttonFontSize;
        return style;
    }
}
