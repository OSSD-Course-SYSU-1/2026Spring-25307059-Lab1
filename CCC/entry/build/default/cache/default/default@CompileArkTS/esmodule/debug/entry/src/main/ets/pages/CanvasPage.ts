if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CanvasPage_Params {
    settings?: RenderingContextSettings;
    canvasContext?: CanvasRenderingContext2D;
    drawModel?: DrawModel;
    screenWidth?: number;
    screenHeight?: number;
    rotateDegree?: number;
    enableFlag?: boolean;
    prizeData?: PrizeData;
    tenDrawResults?: PrizeData[];
    history?: PrizeData[];
    statistics?: DrawStatistics;
    pityCounter?: number;
    deviceConfig?: DeviceConfig | null;
    isLandscape?: boolean;
    isMigrated?: boolean;
    migrationSummary?: string;
    deviceAdapter?: DeviceAdapter;
    stateManager?: DistributedStateManager;
    // Dialog controllers
    prizeDialogController?: CustomDialogController;
    tenDrawDialogController?: CustomDialogController;
    historyDialogController?: CustomDialogController;
    statisticsDialogController?: CustomDialogController;
    settingsDialogController?: CustomDialogController;
}
import window from "@ohos:window";
import Logger from "@bundle:com.example.canvascomponent/entry/ets/common/utils/Logger";
import DrawModel, { DrawStatistics } from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/DrawModel";
import PrizeDialog from "@bundle:com.example.canvascomponent/entry/ets/view/PrizeDialog";
import TenDrawDialog from "@bundle:com.example.canvascomponent/entry/ets/view/TenDrawDialog";
import HistoryDialog from "@bundle:com.example.canvascomponent/entry/ets/view/HistoryDialog";
import StatisticsDialog from "@bundle:com.example.canvascomponent/entry/ets/view/StatisticsDialog";
import SettingsDialog from "@bundle:com.example.canvascomponent/entry/ets/view/SettingsDialog";
import PrizeData from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/PrizeData";
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import CommonConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
import DeviceAdapter, { DeviceType } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/DeviceAdapter";
import type { DeviceConfig } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/DeviceAdapter";
import { DistributedStateManager } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/DistributedStateManager";
import type { AppMigrationState, HistoryRecord } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/DistributedStateManager";
import type { Context } from "@ohos:abilityAccessCtrl";
// Get context.
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
let context: Context = uiContext!.getHostContext()!;
class CanvasPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.settings = new RenderingContextSettings(true);
        this.canvasContext = new CanvasRenderingContext2D(this.settings);
        this.__drawModel = new ObservedPropertyObjectPU(new DrawModel(), this, "drawModel");
        this.__screenWidth = new ObservedPropertySimplePU(0, this, "screenWidth");
        this.__screenHeight = new ObservedPropertySimplePU(0, this, "screenHeight");
        this.__rotateDegree = new ObservedPropertySimplePU(0, this, "rotateDegree");
        this.__enableFlag = new ObservedPropertySimplePU(true, this, "enableFlag");
        this.__prizeData = new ObservedPropertyObjectPU(new PrizeData(), this, "prizeData");
        this.__tenDrawResults = new ObservedPropertyObjectPU([], this, "tenDrawResults");
        this.__history = new ObservedPropertyObjectPU([], this, "history");
        this.__statistics = new ObservedPropertyObjectPU(new DrawStatistics(), this, "statistics");
        this.__pityCounter = new ObservedPropertySimplePU(0, this, "pityCounter");
        this.__deviceConfig = new ObservedPropertyObjectPU(null, this, "deviceConfig");
        this.__isLandscape = new ObservedPropertySimplePU(false, this, "isLandscape");
        this.__isMigrated = new ObservedPropertySimplePU(false, this, "isMigrated");
        this.__migrationSummary = new ObservedPropertySimplePU('', this, "migrationSummary");
        this.deviceAdapter = DeviceAdapter.getInstance();
        this.stateManager = DistributedStateManager.getInstance();
        this.prizeDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new PrizeDialog(this, {
                    prizeData: this.__prizeData,
                    enableFlag: this.__enableFlag
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 61, col: 14 });
                jsDialog.setController(this.
                // Dialog controllers
                prizeDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        prizeData: this.__prizeData,
                        enableFlag: this.__enableFlag
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            alignment: DialogAlignment.Center,
            cancel: () => {
                this.enableFlag = !this.enableFlag;
            }
        }, this);
        this.tenDrawDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new TenDrawDialog(this, {
                    prizes: this.__tenDrawResults,
                    enableFlag: this.__enableFlag
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 73, col: 14 });
                jsDialog.setController(this.tenDrawDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        prizes: this.__tenDrawResults,
                        enableFlag: this.__enableFlag
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            alignment: DialogAlignment.Center,
            cancel: () => {
                this.enableFlag = !this.enableFlag;
            }
        }, this);
        this.historyDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new HistoryDialog(this, {
                    history: this.__history
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 85, col: 14 });
                jsDialog.setController(this.historyDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        history: this.__history
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            alignment: DialogAlignment.Center
        }, this);
        this.statisticsDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new StatisticsDialog(this, {
                    statistics: this.__statistics,
                    pityCounter: this.__pityCounter
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 93, col: 14 });
                jsDialog.setController(this.statisticsDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        statistics: this.__statistics,
                        pityCounter: this.__pityCounter
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            alignment: DialogAlignment.Center
        }, this);
        this.settingsDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SettingsDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 102, col: 14 });
                jsDialog.setController(this.settingsDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            alignment: DialogAlignment.Center
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CanvasPage_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.canvasContext !== undefined) {
            this.canvasContext = params.canvasContext;
        }
        if (params.drawModel !== undefined) {
            this.drawModel = params.drawModel;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.rotateDegree !== undefined) {
            this.rotateDegree = params.rotateDegree;
        }
        if (params.enableFlag !== undefined) {
            this.enableFlag = params.enableFlag;
        }
        if (params.prizeData !== undefined) {
            this.prizeData = params.prizeData;
        }
        if (params.tenDrawResults !== undefined) {
            this.tenDrawResults = params.tenDrawResults;
        }
        if (params.history !== undefined) {
            this.history = params.history;
        }
        if (params.statistics !== undefined) {
            this.statistics = params.statistics;
        }
        if (params.pityCounter !== undefined) {
            this.pityCounter = params.pityCounter;
        }
        if (params.deviceConfig !== undefined) {
            this.deviceConfig = params.deviceConfig;
        }
        if (params.isLandscape !== undefined) {
            this.isLandscape = params.isLandscape;
        }
        if (params.isMigrated !== undefined) {
            this.isMigrated = params.isMigrated;
        }
        if (params.migrationSummary !== undefined) {
            this.migrationSummary = params.migrationSummary;
        }
        if (params.deviceAdapter !== undefined) {
            this.deviceAdapter = params.deviceAdapter;
        }
        if (params.stateManager !== undefined) {
            this.stateManager = params.stateManager;
        }
        if (params.prizeDialogController !== undefined) {
            this.prizeDialogController = params.prizeDialogController;
        }
        if (params.tenDrawDialogController !== undefined) {
            this.tenDrawDialogController = params.tenDrawDialogController;
        }
        if (params.historyDialogController !== undefined) {
            this.historyDialogController = params.historyDialogController;
        }
        if (params.statisticsDialogController !== undefined) {
            this.statisticsDialogController = params.statisticsDialogController;
        }
        if (params.settingsDialogController !== undefined) {
            this.settingsDialogController = params.settingsDialogController;
        }
    }
    updateStateVars(params: CanvasPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__drawModel.purgeDependencyOnElmtId(rmElmtId);
        this.__screenWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__screenHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__rotateDegree.purgeDependencyOnElmtId(rmElmtId);
        this.__enableFlag.purgeDependencyOnElmtId(rmElmtId);
        this.__prizeData.purgeDependencyOnElmtId(rmElmtId);
        this.__tenDrawResults.purgeDependencyOnElmtId(rmElmtId);
        this.__history.purgeDependencyOnElmtId(rmElmtId);
        this.__statistics.purgeDependencyOnElmtId(rmElmtId);
        this.__pityCounter.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceConfig.purgeDependencyOnElmtId(rmElmtId);
        this.__isLandscape.purgeDependencyOnElmtId(rmElmtId);
        this.__isMigrated.purgeDependencyOnElmtId(rmElmtId);
        this.__migrationSummary.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__drawModel.aboutToBeDeleted();
        this.__screenWidth.aboutToBeDeleted();
        this.__screenHeight.aboutToBeDeleted();
        this.__rotateDegree.aboutToBeDeleted();
        this.__enableFlag.aboutToBeDeleted();
        this.__prizeData.aboutToBeDeleted();
        this.__tenDrawResults.aboutToBeDeleted();
        this.__history.aboutToBeDeleted();
        this.__statistics.aboutToBeDeleted();
        this.__pityCounter.aboutToBeDeleted();
        this.__deviceConfig.aboutToBeDeleted();
        this.__isLandscape.aboutToBeDeleted();
        this.__isMigrated.aboutToBeDeleted();
        this.__migrationSummary.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private settings: RenderingContextSettings;
    private canvasContext: CanvasRenderingContext2D;
    private __drawModel: ObservedPropertyObjectPU<DrawModel>;
    get drawModel() {
        return this.__drawModel.get();
    }
    set drawModel(newValue: DrawModel) {
        this.__drawModel.set(newValue);
    }
    private __screenWidth: ObservedPropertySimplePU<number>;
    get screenWidth() {
        return this.__screenWidth.get();
    }
    set screenWidth(newValue: number) {
        this.__screenWidth.set(newValue);
    }
    private __screenHeight: ObservedPropertySimplePU<number>;
    get screenHeight() {
        return this.__screenHeight.get();
    }
    set screenHeight(newValue: number) {
        this.__screenHeight.set(newValue);
    }
    private __rotateDegree: ObservedPropertySimplePU<number>;
    get rotateDegree() {
        return this.__rotateDegree.get();
    }
    set rotateDegree(newValue: number) {
        this.__rotateDegree.set(newValue);
    }
    private __enableFlag: ObservedPropertySimplePU<boolean>;
    get enableFlag() {
        return this.__enableFlag.get();
    }
    set enableFlag(newValue: boolean) {
        this.__enableFlag.set(newValue);
    }
    private __prizeData: ObservedPropertyObjectPU<PrizeData>;
    get prizeData() {
        return this.__prizeData.get();
    }
    set prizeData(newValue: PrizeData) {
        this.__prizeData.set(newValue);
    }
    private __tenDrawResults: ObservedPropertyObjectPU<PrizeData[]>;
    get tenDrawResults() {
        return this.__tenDrawResults.get();
    }
    set tenDrawResults(newValue: PrizeData[]) {
        this.__tenDrawResults.set(newValue);
    }
    private __history: ObservedPropertyObjectPU<PrizeData[]>;
    get history() {
        return this.__history.get();
    }
    set history(newValue: PrizeData[]) {
        this.__history.set(newValue);
    }
    private __statistics: ObservedPropertyObjectPU<DrawStatistics>;
    get statistics() {
        return this.__statistics.get();
    }
    set statistics(newValue: DrawStatistics) {
        this.__statistics.set(newValue);
    }
    private __pityCounter: ObservedPropertySimplePU<number>;
    get pityCounter() {
        return this.__pityCounter.get();
    }
    set pityCounter(newValue: number) {
        this.__pityCounter.set(newValue);
    }
    private __deviceConfig: ObservedPropertyObjectPU<DeviceConfig | null>;
    get deviceConfig() {
        return this.__deviceConfig.get();
    }
    set deviceConfig(newValue: DeviceConfig | null) {
        this.__deviceConfig.set(newValue);
    }
    private __isLandscape: ObservedPropertySimplePU<boolean>;
    get isLandscape() {
        return this.__isLandscape.get();
    }
    set isLandscape(newValue: boolean) {
        this.__isLandscape.set(newValue);
    }
    private __isMigrated: ObservedPropertySimplePU<boolean>;
    get isMigrated() {
        return this.__isMigrated.get();
    }
    set isMigrated(newValue: boolean) {
        this.__isMigrated.set(newValue);
    }
    private __migrationSummary: ObservedPropertySimplePU<string>;
    get migrationSummary() {
        return this.__migrationSummary.get();
    }
    set migrationSummary(newValue: string) {
        this.__migrationSummary.set(newValue);
    }
    private deviceAdapter: DeviceAdapter;
    private stateManager: DistributedStateManager;
    // Dialog controllers
    private prizeDialogController: CustomDialogController;
    private tenDrawDialogController: CustomDialogController;
    private historyDialogController: CustomDialogController;
    private statisticsDialogController: CustomDialogController;
    private settingsDialogController: CustomDialogController;
    aboutToAppear() {
        // Register migration state listener
        this.stateManager.addStateListener(this.onMigrationStateRestore.bind(this));
        // Check for restored migration state from AppStorage (set by EntryAbility)
        const restoredStateStr = AppStorage.get<string>('restoredMigrationState');
        if (restoredStateStr) {
            const restoredState = this.stateManager.deserializeState(restoredStateStr);
            if (restoredState) {
                this.restoreFromMigration(restoredState);
                // Clear the restored state flag
                AppStorage.setOrCreate('restoredMigrationState', '');
            }
        }
        // Also check for existing state in state manager
        const existingState = this.stateManager.getState();
        if (existingState) {
            this.restoreFromMigration(existingState);
        }
        // Obtains the width and height of the screen, excluding the height of the navigation view.
        window.getLastWindow(context)
            .then((windowClass: window.Window) => {
            windowClass.setWindowLayoutFullScreen(true);
            let windowProperties = windowClass.getWindowProperties();
            this.screenWidth = this.getUIContext().px2vp(windowProperties.windowRect.width);
            this.screenHeight = this.getUIContext().px2vp(windowProperties.windowRect.height);
            // Initialize device adapter
            this.deviceConfig = this.deviceAdapter.initConfig(this.screenWidth, this.screenHeight);
            this.isLandscape = this.deviceConfig.isLandscape;
        })
            .catch((error: Error) => {
            Logger.error('Failed to obtain the window size. Cause: ' + JSON.stringify(error));
        });
    }
    aboutToDisappear() {
        // Save state for potential migration
        this.saveMigrationState();
        // Remove migration listener
        this.stateManager.removeStateListener(this.onMigrationStateRestore.bind(this));
    }
    /**
     * Save current state for distributed migration
     */
    private saveMigrationState(): void {
        // Convert history to records
        const historyRecords: HistoryRecord[] = [];
        for (let i = 0; i < this.history.length; i++) {
            const p = this.history[i];
            const record: HistoryRecord = {
                index: p.index,
                name: p.name ?? '',
                rarity: p.rarity,
                timestamp: p.timestamp,
                imageSrc: p.imageSrc ?? ''
            };
            historyRecords.push(record);
        }
        const state: AppMigrationState = {
            totalDraws: this.statistics.totalDraws,
            singleDraws: this.statistics.singleDraws,
            tenDraws: this.statistics.tenDraws,
            commonCount: this.statistics.commonCount,
            mediumCount: this.statistics.mediumCount,
            highCount: this.statistics.highCount,
            superCount: this.statistics.superCount,
            pityCounter: this.pityCounter,
            history: historyRecords,
            migrateTime: Date.now()
        };
        this.stateManager.saveState(state);
        // Also save to AppStorage for EntryAbility to access during migration
        const stateStr = this.stateManager.serializeState();
        AppStorage.setOrCreate('migrationState', stateStr);
    }
    /**
     * Restore state from migration
     */
    private restoreFromMigration(state: AppMigrationState): void {
        Logger.info('Restoring state from migration');
        // Restore statistics
        this.statistics.totalDraws = state.totalDraws;
        this.statistics.singleDraws = state.singleDraws;
        this.statistics.tenDraws = state.tenDraws;
        this.statistics.commonCount = state.commonCount;
        this.statistics.mediumCount = state.mediumCount;
        this.statistics.highCount = state.highCount;
        this.statistics.superCount = state.superCount;
        // Restore pity counter
        this.pityCounter = state.pityCounter;
        // Restore history using for loop (ArkTS compatible)
        const restoredHistory: PrizeData[] = [];
        for (let i = 0; i < state.history.length; i++) {
            const h = state.history[i];
            const prize = new PrizeData();
            prize.index = h.index;
            prize.name = h.name;
            prize.rarity = h.rarity;
            prize.timestamp = h.timestamp;
            prize.imageSrc = h.imageSrc;
            restoredHistory.push(prize);
        }
        this.history = restoredHistory;
        // Update draw model state
        this.drawModel.restoreState(state);
        // Mark as migrated
        this.isMigrated = true;
        this.migrationSummary = this.stateManager.getMigrationSummary();
        Logger.info('Migration restored: ' + this.migrationSummary);
    }
    /**
     * Handle migration state restore callback
     */
    private onMigrationStateRestore(state: AppMigrationState): void {
        this.restoreFromMigration(state);
    }
    /**
     * Simulate migration for testing on emulator
     * This saves current state, clears it, then restores to verify the logic works
     */
    private simulateMigration(): void {
        // Step 1: Save current state
        this.saveMigrationState();
        const savedState = this.stateManager.getState();
        if (!savedState) {
            Logger.error('No state to simulate migration');
            return;
        }
        // Step 2: Clear current UI state (simulate new device)
        this.statistics = new DrawStatistics();
        this.pityCounter = 0;
        this.history = [];
        this.isMigrated = false;
        // Step 3: Restore after delay (simulate receiving migration data)
        setTimeout(() => {
            this.restoreFromMigration(savedState);
            Logger.info('Migration simulation completed');
        }, 500);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width(StyleConstants.FULL_PERCENT);
            Stack.height(StyleConstants.FULL_PERCENT);
            Stack.backgroundImage({ "id": 16777258, "type": 20000, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }, ImageRepeat.NoRepeat);
            Stack.backgroundImageSize({
                width: StyleConstants.FULL_PERCENT,
                height: StyleConstants.BACKGROUND_IMAGE_SIZE
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.canvasContext);
            Canvas.width(StyleConstants.FULL_PERCENT);
            Canvas.height(StyleConstants.FULL_PERCENT);
            Canvas.onReady(() => {
                this.drawModel.draw(this.canvasContext, this.screenWidth, this.screenHeight);
            });
            Canvas.rotate({
                x: 0,
                y: 0,
                z: 1,
                angle: this.rotateDegree,
                centerX: this.screenWidth / CommonConstants.TWO,
                centerY: this.screenHeight / CommonConstants.TWO
            });
        }, Canvas);
        Canvas.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Center draw button
            Image.create({ "id": 16777260, "type": 20000, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // Center draw button
            Image.width(this.getWheelButtonSize());
            // Center draw button
            Image.height(this.getWheelButtonSize());
            // Center draw button
            Image.enabled(this.enableFlag);
            // Center draw button
            Image.onClick(() => {
                this.performSingleDraw();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Top device info indicator
            if (this.deviceConfig) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.align(Alignment.Top);
                        Column.margin({ top: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // Migration status indicator
                        if (this.isMigrated) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('90%');
                                    Row.justifyContent(FlexAlign.Center);
                                    Row.padding(8);
                                    Row.backgroundColor('#80000000');
                                    Row.borderRadius(8);
                                    Row.margin({ bottom: 8 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('🔄 已从其他设备迁移');
                                    Text.fontSize(this.deviceAdapter.scaleValue(12));
                                    Text.fontColor('#4CAF50');
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.migrationSummary);
                                    Text.fontSize(this.deviceAdapter.scaleValue(10));
                                    Text.fontColor('#FFFFFF');
                                    Text.opacity(0.7);
                                    Text.margin({ left: 8 });
                                }, Text);
                                Text.pop();
                                Row.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('90%');
                        Row.justifyContent(FlexAlign.End);
                        Row.padding(8);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getDeviceTypeText());
                        Text.fontSize(this.deviceAdapter.scaleValue(10));
                        Text.fontColor('#FFFFFF');
                        Text.opacity(0.7);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            // Bottom control panel
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Bottom control panel
            Column.create();
            // Bottom control panel
            Column.width(StyleConstants.FULL_PERCENT);
            // Bottom control panel
            Column.align(Alignment.Bottom);
            // Bottom control panel
            Column.margin({ bottom: this.deviceAdapter.isTablet() ? 60 : 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Pity indicator
            Row.create();
            // Pity indicator
            Row.width(this.isLandscape ? '50%' : '90%');
            // Pity indicator
            Row.justifyContent(FlexAlign.Center);
            // Pity indicator
            Row.padding(8);
            // Pity indicator
            Row.backgroundColor('#80000000');
            // Pity indicator
            Row.borderRadius(8);
            // Pity indicator
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } + ': ' + this.pityCounter + '/' + CommonConstants.PITY_THRESHOLD);
            Text.fontSize(this.deviceAdapter.scaleValue(12));
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        // Pity indicator
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Action buttons - responsive layout
            if (this.isLandscape) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Landscape layout - horizontal scroll
                        Scroll.create();
                        // Landscape layout - horizontal scroll
                        Scroll.scrollable(ScrollDirection.Horizontal);
                        // Landscape layout - horizontal scroll
                        Scroll.width('95%');
                        // Landscape layout - horizontal scroll
                        Scroll.height(50);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.SpaceEvenly);
                    }, Row);
                    this.ActionButtonsBuilder.bind(this)();
                    Row.pop();
                    // Landscape layout - horizontal scroll
                    Scroll.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Portrait layout - grid
                        Column.create();
                        // Portrait layout - grid
                        Column.width('95%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.SpaceEvenly);
                    }, Row);
                    this.ActionButtonsBuilder.bind(this)();
                    Row.pop();
                    // Portrait layout - grid
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // Bottom control panel
        Column.pop();
        Stack.pop();
    }
    ActionButtonsBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Single draw button
            Button.createWithLabel({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // Single draw button
            Button.width(this.getButtonWidth());
            // Single draw button
            Button.height(this.getButtonHeight());
            // Single draw button
            Button.fontSize(this.deviceAdapter.scaleValue(14));
            // Single draw button
            Button.fontColor('#FFFFFF');
            // Single draw button
            Button.backgroundColor(ColorConstants.BUTTON_BG_COLOR);
            // Single draw button
            Button.borderRadius(20);
            // Single draw button
            Button.enabled(this.enableFlag);
            // Single draw button
            Button.onClick(() => {
                this.performSingleDraw();
            });
        }, Button);
        // Single draw button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Ten draw button
            Button.createWithLabel({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // Ten draw button
            Button.width(this.getButtonWidth());
            // Ten draw button
            Button.height(this.getButtonHeight());
            // Ten draw button
            Button.fontSize(this.deviceAdapter.scaleValue(14));
            // Ten draw button
            Button.fontColor('#FFFFFF');
            // Ten draw button
            Button.backgroundColor('#FF4757');
            // Ten draw button
            Button.borderRadius(20);
            // Ten draw button
            Button.enabled(this.enableFlag);
            // Ten draw button
            Button.onClick(() => {
                this.performTenDraw();
            });
        }, Button);
        // Ten draw button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // History button
            Button.createWithLabel({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // History button
            Button.width(this.getSmallButtonWidth());
            // History button
            Button.height(this.getButtonHeight());
            // History button
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            // History button
            Button.fontColor('#FFFFFF');
            // History button
            Button.backgroundColor('#2ED573');
            // History button
            Button.borderRadius(20);
            // History button
            Button.onClick(() => {
                this.history = this.drawModel.getHistory();
                this.historyDialogController.open();
            });
        }, Button);
        // History button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Statistics button
            Button.createWithLabel({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // Statistics button
            Button.width(this.getSmallButtonWidth());
            // Statistics button
            Button.height(this.getButtonHeight());
            // Statistics button
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            // Statistics button
            Button.fontColor('#FFFFFF');
            // Statistics button
            Button.backgroundColor('#5352ED');
            // Statistics button
            Button.borderRadius(20);
            // Statistics button
            Button.onClick(() => {
                this.statistics = this.drawModel.getStatistics();
                this.pityCounter = this.drawModel.getPityCounter();
                this.statisticsDialogController.open();
            });
        }, Button);
        // Statistics button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Settings button
            Button.createWithLabel('设置');
            // Settings button
            Button.width(this.getSmallButtonWidth());
            // Settings button
            Button.height(this.getButtonHeight());
            // Settings button
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            // Settings button
            Button.fontColor('#FFFFFF');
            // Settings button
            Button.backgroundColor('#FF9500');
            // Settings button
            Button.borderRadius(20);
            // Settings button
            Button.onClick(() => {
                this.settingsDialogController.open();
            });
        }, Button);
        // Settings button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Simulate migration button (for testing on emulator)
            Button.createWithLabel('模拟迁移');
            // Simulate migration button (for testing on emulator)
            Button.width(this.getSmallButtonWidth());
            // Simulate migration button (for testing on emulator)
            Button.height(this.getButtonHeight());
            // Simulate migration button (for testing on emulator)
            Button.fontSize(this.deviceAdapter.scaleValue(12));
            // Simulate migration button (for testing on emulator)
            Button.fontColor('#FFFFFF');
            // Simulate migration button (for testing on emulator)
            Button.backgroundColor('#9C27B0');
            // Simulate migration button (for testing on emulator)
            Button.borderRadius(20);
            // Simulate migration button (for testing on emulator)
            Button.onClick(() => {
                this.simulateMigration();
            });
        }, Button);
        // Simulate migration button (for testing on emulator)
        Button.pop();
    }
    private getWheelButtonSize(): string {
        if (this.deviceAdapter.isTablet()) {
            return '15%';
        }
        else if (this.deviceAdapter.isFoldable()) {
            return '17%';
        }
        else {
            return this.isLandscape ? '12%' : '19.3%';
        }
    }
    private getButtonWidth(): number {
        const config = this.deviceAdapter.getConfig();
        return config.buttonWidth;
    }
    private getSmallButtonWidth(): number {
        const config = this.deviceAdapter.getConfig();
        return Math.round(config.buttonWidth * 0.75);
    }
    private getButtonHeight(): number {
        const config = this.deviceAdapter.getConfig();
        return config.buttonHeight;
    }
    private getDeviceTypeText(): string {
        const type = this.deviceAdapter.getDeviceType();
        switch (type) {
            case DeviceType.TABLET:
                return '📱 平板模式';
            case DeviceType.FOLDABLE:
                return '📱 折叠屏模式';
            case DeviceType.PHONE:
            default:
                return '📱 手机模式';
        }
    }
    /**
     * Perform single draw with animation.
     */
    performSingleDraw() {
        this.enableFlag = !this.enableFlag;
        // Get prize result using gacha system
        this.prizeData = this.drawModel.drawSingle();
        this.pityCounter = this.drawModel.getPityCounter();
        // Calculate random angle for animation
        let randomAngle = Math.round(Math.random() * CommonConstants.CIRCLE);
        this.getUIContext().animateTo({
            duration: CommonConstants.DURATION,
            curve: Curve.Ease,
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Normal,
            onFinish: () => {
                this.rotateDegree = CommonConstants.ANGLE - randomAngle;
                this.prizeDialogController.open();
            }
        }, () => {
            this.rotateDegree = CommonConstants.CIRCLE * CommonConstants.FIVE +
                CommonConstants.ANGLE - randomAngle;
        });
    }
    /**
     * Perform ten consecutive draws.
     */
    performTenDraw() {
        this.enableFlag = !this.enableFlag;
        // Get ten draw results
        this.tenDrawResults = this.drawModel.drawTen();
        this.pityCounter = this.drawModel.getPityCounter();
        // Calculate random angle for animation
        let randomAngle = Math.round(Math.random() * CommonConstants.CIRCLE);
        this.getUIContext().animateTo({
            duration: CommonConstants.DURATION,
            curve: Curve.Ease,
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Normal,
            onFinish: () => {
                this.rotateDegree = CommonConstants.ANGLE - randomAngle;
                this.tenDrawDialogController.open();
            }
        }, () => {
            this.rotateDegree = CommonConstants.CIRCLE * CommonConstants.FIVE +
                CommonConstants.ANGLE - randomAngle;
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CanvasPage";
    }
}
registerNamedRoute(() => new CanvasPage(undefined, {}), "", { bundleName: "com.example.canvascomponent", moduleName: "entry", pagePath: "pages/CanvasPage", pageFullPath: "entry/src/main/ets/pages/CanvasPage", integratedHsp: "false", moduleType: "followWithHap" });
