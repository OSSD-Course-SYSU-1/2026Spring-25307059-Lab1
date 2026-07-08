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
    // Dialog controllers
    prizeDialogController?: CustomDialogController;
    tenDrawDialogController?: CustomDialogController;
    historyDialogController?: CustomDialogController;
    statisticsDialogController?: CustomDialogController;
}
import window from "@ohos:window";
import Logger from "@bundle:com.example.canvascomponent/entry/ets/common/utils/Logger";
import DrawModel, { DrawStatistics } from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/DrawModel";
import PrizeDialog from "@bundle:com.example.canvascomponent/entry/ets/view/PrizeDialog";
import TenDrawDialog from "@bundle:com.example.canvascomponent/entry/ets/view/TenDrawDialog";
import HistoryDialog from "@bundle:com.example.canvascomponent/entry/ets/view/HistoryDialog";
import StatisticsDialog from "@bundle:com.example.canvascomponent/entry/ets/view/StatisticsDialog";
import PrizeData from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/PrizeData";
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import CommonConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
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
        this.prizeDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new PrizeDialog(this, {
                    prizeData: this.__prizeData,
                    enableFlag: this.__enableFlag
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 51, col: 14 });
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
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 63, col: 14 });
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
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 75, col: 14 });
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
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/CanvasPage.ets", line: 83, col: 14 });
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
    // Dialog controllers
    private prizeDialogController: CustomDialogController;
    private tenDrawDialogController: CustomDialogController;
    private historyDialogController: CustomDialogController;
    private statisticsDialogController: CustomDialogController;
    aboutToAppear() {
        // Obtains the width and height of the screen, excluding the height of the navigation view.
        window.getLastWindow(context)
            .then((windowClass: window.Window) => {
            windowClass.setWindowLayoutFullScreen(true);
            let windowProperties = windowClass.getWindowProperties();
            this.screenWidth = this.getUIContext().px2vp(windowProperties.windowRect.width);
            this.screenHeight = this.getUIContext().px2vp(windowProperties.windowRect.height);
        })
            .catch((error: Error) => {
            Logger.error('Failed to obtain the window size. Cause: ' + JSON.stringify(error));
        });
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
            Image.width(StyleConstants.CENTER_IMAGE_WIDTH);
            // Center draw button
            Image.height(StyleConstants.CENTER_IMAGE_HEIGHT);
            // Center draw button
            Image.enabled(this.enableFlag);
            // Center draw button
            Image.onClick(() => {
                this.performSingleDraw();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Bottom control panel
            Column.create();
            // Bottom control panel
            Column.width(StyleConstants.FULL_PERCENT);
            // Bottom control panel
            Column.align(Alignment.Bottom);
            // Bottom control panel
            Column.margin({ bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Pity indicator
            Row.create();
            // Pity indicator
            Row.width('90%');
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
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        // Pity indicator
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Action buttons
            Row.create();
            // Action buttons
            Row.width('95%');
            // Action buttons
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Single draw button
            Button.createWithLabel({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            // Single draw button
            Button.width(80);
            // Single draw button
            Button.height(40);
            // Single draw button
            Button.fontSize(14);
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
            Button.width(80);
            // Ten draw button
            Button.height(40);
            // Ten draw button
            Button.fontSize(14);
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
            Button.width(60);
            // History button
            Button.height(40);
            // History button
            Button.fontSize(12);
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
            Button.width(60);
            // Statistics button
            Button.height(40);
            // Statistics button
            Button.fontSize(12);
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
        // Action buttons
        Row.pop();
        // Bottom control panel
        Column.pop();
        Stack.pop();
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
