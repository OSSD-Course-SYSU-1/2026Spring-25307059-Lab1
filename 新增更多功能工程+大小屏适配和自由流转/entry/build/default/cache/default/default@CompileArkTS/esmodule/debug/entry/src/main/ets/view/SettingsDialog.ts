if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingsDialog_Params {
    controller?: CustomDialogController;
    prizeConfigs?: PrizeConfigItem[];
    colorConfig?: WheelColorConfig | null;
    selectedTabIndex?: number;
    editingPrizeId?: number;
    tempName?: string;
    tempColor?: string;
    configManager?: PrizeConfigManager;
    deviceAdapter?: DeviceAdapter;
}
import PrizeConfigManager from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/PrizeConfigManager";
import type { PrizeConfigItem, WheelColorConfig } from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/PrizeConfigManager";
import DeviceAdapter from "@bundle:com.example.canvascomponent/entry/ets/common/utils/DeviceAdapter";
import { PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
export default class SettingsDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.__prizeConfigs = new ObservedPropertyObjectPU([], this, "prizeConfigs");
        this.__colorConfig = new ObservedPropertyObjectPU(null, this, "colorConfig");
        this.__selectedTabIndex = new ObservedPropertySimplePU(0, this, "selectedTabIndex");
        this.__editingPrizeId = new ObservedPropertySimplePU(0, this, "editingPrizeId");
        this.__tempName = new ObservedPropertySimplePU('', this, "tempName");
        this.__tempColor = new ObservedPropertySimplePU('', this, "tempColor");
        this.configManager = PrizeConfigManager.getInstance();
        this.deviceAdapter = DeviceAdapter.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingsDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.prizeConfigs !== undefined) {
            this.prizeConfigs = params.prizeConfigs;
        }
        if (params.colorConfig !== undefined) {
            this.colorConfig = params.colorConfig;
        }
        if (params.selectedTabIndex !== undefined) {
            this.selectedTabIndex = params.selectedTabIndex;
        }
        if (params.editingPrizeId !== undefined) {
            this.editingPrizeId = params.editingPrizeId;
        }
        if (params.tempName !== undefined) {
            this.tempName = params.tempName;
        }
        if (params.tempColor !== undefined) {
            this.tempColor = params.tempColor;
        }
        if (params.configManager !== undefined) {
            this.configManager = params.configManager;
        }
        if (params.deviceAdapter !== undefined) {
            this.deviceAdapter = params.deviceAdapter;
        }
    }
    updateStateVars(params: SettingsDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__prizeConfigs.purgeDependencyOnElmtId(rmElmtId);
        this.__colorConfig.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__editingPrizeId.purgeDependencyOnElmtId(rmElmtId);
        this.__tempName.purgeDependencyOnElmtId(rmElmtId);
        this.__tempColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__prizeConfigs.aboutToBeDeleted();
        this.__colorConfig.aboutToBeDeleted();
        this.__selectedTabIndex.aboutToBeDeleted();
        this.__editingPrizeId.aboutToBeDeleted();
        this.__tempName.aboutToBeDeleted();
        this.__tempColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __prizeConfigs: ObservedPropertyObjectPU<PrizeConfigItem[]>;
    get prizeConfigs() {
        return this.__prizeConfigs.get();
    }
    set prizeConfigs(newValue: PrizeConfigItem[]) {
        this.__prizeConfigs.set(newValue);
    }
    private __colorConfig: ObservedPropertyObjectPU<WheelColorConfig | null>;
    get colorConfig() {
        return this.__colorConfig.get();
    }
    set colorConfig(newValue: WheelColorConfig | null) {
        this.__colorConfig.set(newValue);
    }
    private __selectedTabIndex: ObservedPropertySimplePU<number>;
    get selectedTabIndex() {
        return this.__selectedTabIndex.get();
    }
    set selectedTabIndex(newValue: number) {
        this.__selectedTabIndex.set(newValue);
    }
    private __editingPrizeId: ObservedPropertySimplePU<number>;
    get editingPrizeId() {
        return this.__editingPrizeId.get();
    }
    set editingPrizeId(newValue: number) {
        this.__editingPrizeId.set(newValue);
    }
    private __tempName: ObservedPropertySimplePU<string>;
    get tempName() {
        return this.__tempName.get();
    }
    set tempName(newValue: string) {
        this.__tempName.set(newValue);
    }
    private __tempColor: ObservedPropertySimplePU<string>;
    get tempColor() {
        return this.__tempColor.get();
    }
    set tempColor(newValue: string) {
        this.__tempColor.set(newValue);
    }
    private configManager: PrizeConfigManager;
    private deviceAdapter: DeviceAdapter;
    aboutToAppear(): void {
        this.loadConfig();
    }
    private loadConfig(): void {
        this.prizeConfigs = this.configManager.getPrizeConfigs();
        this.colorConfig = this.configManager.getColorConfig();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.deviceAdapter.isTablet() ? '80%' : '95%');
            Column.height('80%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.shadow({ radius: 20, color: '#33000000', offsetX: 0, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            // Header
            Row.width('100%');
            // Header
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(this.deviceAdapter.scaleValue(20));
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置默认');
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            Button.height(32);
            Button.backgroundColor('#FF6B35');
            Button.onClick(() => {
                this.configManager.resetToDefault();
                this.loadConfig();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            Button.height(32);
            Button.backgroundColor('#999999');
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.controller.close();
            });
        }, Button);
        Button.pop();
        // Header
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Tab bar
            Row.create();
            // Tab bar
            Row.width('100%');
            // Tab bar
            Row.justifyContent(FlexAlign.Center);
            // Tab bar
            Row.padding({ top: 8, bottom: 8 });
            // Tab bar
            Row.backgroundColor('#F5F5F5');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('奖品设置');
            Text.fontSize(this.deviceAdapter.scaleValue(14));
            Text.fontColor(this.selectedTabIndex === 0 ? '#FF6B35' : '#666666');
            Text.fontWeight(this.selectedTabIndex === 0 ? FontWeight.Bold : FontWeight.Normal);
            Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
            Text.borderRadius(4);
            Text.backgroundColor(this.selectedTabIndex === 0 ? '#FFF5F0' : 'transparent');
            Text.onClick(() => {
                this.selectedTabIndex = 0;
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('颜色设置');
            Text.fontSize(this.deviceAdapter.scaleValue(14));
            Text.fontColor(this.selectedTabIndex === 1 ? '#FF6B35' : '#666666');
            Text.fontWeight(this.selectedTabIndex === 1 ? FontWeight.Bold : FontWeight.Normal);
            Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
            Text.borderRadius(4);
            Text.backgroundColor(this.selectedTabIndex === 1 ? '#FFF5F0' : 'transparent');
            Text.onClick(() => {
                this.selectedTabIndex = 1;
            });
        }, Text);
        Text.pop();
        // Tab bar
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Content
            if (this.selectedTabIndex === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.PrizeSettingsPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ColorSettingsPanel.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    PrizeSettingsPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const prize = _item;
                this.PrizeItemBuilder.bind(this)(prize);
            };
            this.forEachUpdateFunction(elmtId, this.prizeConfigs, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    PrizeItemBuilder(prize: PrizeConfigItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(8);
            Column.margin({ bottom: 8 });
            Column.shadow({ radius: 4, color: '#11000000', offsetX: 0, offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Prize color indicator
            Circle.create();
            // Prize color indicator
            Circle.width(24);
            // Prize color indicator
            Circle.height(24);
            // Prize color indicator
            Circle.fill(prize.color);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(prize.displayName);
            Text.fontSize(this.deviceAdapter.scaleValue(14));
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getRarityText(prize.rarity));
            Text.fontSize(this.deviceAdapter.scaleValue(10));
            Text.fontColor('#999999');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('编辑');
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            Button.height(28);
            Button.width(50);
            Button.backgroundColor('#F0F0F0');
            Button.fontColor('#666666');
            Button.onClick(() => {
                this.editingPrizeId = prize.id;
                this.tempName = prize.displayName;
                this.tempColor = prize.color;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Edit panel
            if (this.editingPrizeId === prize.id) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(8);
                        Column.backgroundColor('#FAFAFA');
                        Column.borderRadius(8);
                        Column.margin({ top: 8 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Name input
                        Row.create();
                        // Name input
                        Row.width('100%');
                        // Name input
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('名称:');
                        Text.fontSize(this.deviceAdapter.scaleValue(12));
                        Text.width(50);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.tempName });
                        TextInput.fontSize(this.deviceAdapter.scaleValue(12));
                        TextInput.height(36);
                        TextInput.layoutWeight(1);
                        TextInput.backgroundColor('#F5F5F5');
                        TextInput.borderRadius(4);
                        TextInput.onChange((value: string) => {
                            this.tempName = value;
                        });
                    }, TextInput);
                    // Name input
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Color input
                        Row.create();
                        // Color input
                        Row.width('100%');
                        // Color input
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('颜色:');
                        Text.fontSize(this.deviceAdapter.scaleValue(12));
                        Text.width(50);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.layoutWeight(1);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#FF6B6B');
                        Circle.border({ width: this.tempColor === '#FF6B6B' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#FF6B6B'; });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#4ECDC4');
                        Circle.border({ width: this.tempColor === '#4ECDC4' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#4ECDC4'; });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#F38181');
                        Circle.border({ width: this.tempColor === '#F38181' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#F38181'; });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#AA96E3');
                        Circle.border({ width: this.tempColor === '#AA96E3' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#AA96E3'; });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#95E1D3');
                        Circle.border({ width: this.tempColor === '#95E1D3' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#95E1D3'; });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create();
                        Circle.width(24);
                        Circle.height(24);
                        Circle.fill('#FCBAD3');
                        Circle.border({ width: this.tempColor === '#FCBAD3' ? 2 : 0, color: '#333333' });
                        Circle.margin({ right: 4 });
                        Circle.onClick(() => { this.tempColor = '#FCBAD3'; });
                    }, Circle);
                    Row.pop();
                    // Color input
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Action buttons
                        Row.create();
                        // Action buttons
                        Row.width('100%');
                        // Action buttons
                        Row.justifyContent(FlexAlign.End);
                        // Action buttons
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.fontSize(this.deviceAdapter.scaleValue(12));
                        Button.height(28);
                        Button.backgroundColor('#F0F0F0');
                        Button.fontColor('#666666');
                        Button.onClick(() => {
                            this.editingPrizeId = 0;
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('保存');
                        Button.fontSize(this.deviceAdapter.scaleValue(12));
                        Button.height(28);
                        Button.backgroundColor('#FF6B35');
                        Button.fontColor('#FFFFFF');
                        Button.margin({ left: 8 });
                        Button.onClick(() => {
                            this.configManager.updatePrizeName(prize.id, this.tempName);
                            this.configManager.updatePrizeColor(prize.id, this.tempColor);
                            this.loadConfig();
                            this.editingPrizeId = 0;
                        });
                    }, Button);
                    Button.pop();
                    // Action buttons
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    ColorSettingsPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.colorConfig) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Wheel colors
                        Text.create('转盘颜色');
                        // Wheel colors
                        Text.fontSize(this.deviceAdapter.scaleValue(14));
                        // Wheel colors
                        Text.fontWeight(FontWeight.Bold);
                        // Wheel colors
                        Text.fontColor('#333333');
                        // Wheel colors
                        Text.width('100%');
                        // Wheel colors
                        Text.margin({ bottom: 8 });
                    }, Text);
                    // Wheel colors
                    Text.pop();
                    this.ColorItemBuilder.bind(this)('外圈颜色', this.colorConfig.flowerOutColor, 1);
                    this.ColorItemBuilder.bind(this)('内圈颜色', this.colorConfig.innerCircleColor, 2);
                    this.ColorItemBuilder.bind(this)('中心圆颜色', this.colorConfig.outCircleColor, 3);
                    this.ColorItemBuilder.bind(this)('文字颜色', this.colorConfig.textColor, 4);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Arc colors
                        Text.create('扇区颜色');
                        // Arc colors
                        Text.fontSize(this.deviceAdapter.scaleValue(14));
                        // Arc colors
                        Text.fontWeight(FontWeight.Bold);
                        // Arc colors
                        Text.fontColor('#333333');
                        // Arc colors
                        Text.width('100%');
                        // Arc colors
                        Text.margin({ top: 16, bottom: 8 });
                    }, Text);
                    // Arc colors
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 1', this.colorConfig.arcColors[0], 10);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 1) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 2', this.colorConfig.arcColors[1], 11);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 2) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 3', this.colorConfig.arcColors[2], 12);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 3) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 4', this.colorConfig.arcColors[3], 13);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 4) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 5', this.colorConfig.arcColors[4], 14);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.colorConfig.arcColors.length > 5) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.ColorItemBuilder.bind(this)('扇区 6', this.colorConfig.arcColors[5], 15);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    ColorItemBuilder(label: string, currentColor: string, colorType: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(8);
            Row.backgroundColor('#FAFAFA');
            Row.borderRadius(8);
            Row.margin({ bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(this.deviceAdapter.scaleValue(12));
            Text.fontColor('#666666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(24);
            Circle.height(24);
            Circle.fill(currentColor);
            Circle.margin({ right: 8 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#FFC6BD');
            Circle.border({ width: currentColor === '#FFC6BD' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#FFC6BD'); });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#FFEC90');
            Circle.border({ width: currentColor === '#FFEC90' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#FFEC90'); });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#ECF9C7');
            Circle.border({ width: currentColor === '#ECF9C7' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#ECF9C7'); });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#B5EAD7');
            Circle.border({ width: currentColor === '#B5EAD7' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#B5EAD7'); });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#C7CEEA');
            Circle.border({ width: currentColor === '#C7CEEA' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#C7CEEA'); });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(20);
            Circle.height(20);
            Circle.fill('#FFDAC1');
            Circle.border({ width: currentColor === '#FFDAC1' ? 2 : 0, color: '#333333' });
            Circle.margin({ right: 2 });
            Circle.onClick(() => { this.applyColor(colorType, '#FFDAC1'); });
        }, Circle);
        Row.pop();
        Row.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
}
