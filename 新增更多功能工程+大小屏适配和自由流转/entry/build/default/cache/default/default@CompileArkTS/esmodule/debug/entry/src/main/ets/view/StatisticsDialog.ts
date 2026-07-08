if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatisticsDialog_Params {
    statistics?: DrawStatistics;
    pityCounter?: number;
    controller?: CustomDialogController;
}
import type { DrawStatistics } from '../viewmodel/DrawModel';
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import CommonConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
export default class StatisticsDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__statistics = new SynchedPropertyObjectTwoWayPU(params.statistics, this, "statistics");
        this.__pityCounter = new SynchedPropertySimpleTwoWayPU(params.pityCounter, this, "pityCounter");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatisticsDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: StatisticsDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__statistics.purgeDependencyOnElmtId(rmElmtId);
        this.__pityCounter.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__statistics.aboutToBeDeleted();
        this.__pityCounter.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __statistics: SynchedPropertySimpleOneWayPU<DrawStatistics>;
    get statistics() {
        return this.__statistics.get();
    }
    set statistics(newValue: DrawStatistics) {
        this.__statistics.set(newValue);
    }
    private __pityCounter: SynchedPropertySimpleTwoWayPU<number>;
    get pityCounter() {
        return this.__pityCounter.get();
    }
    set pityCounter(newValue: number) {
        this.__pityCounter.set(newValue);
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Column.width('90%');
            Column.height(500);
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 16, bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Pity progress
            Column.create();
            // Pity progress
            Column.width('90%');
            // Pity progress
            Column.padding(16);
            // Pity progress
            Column.backgroundColor('#F5F5F5');
            // Pity progress
            Column.borderRadius(8);
            // Pity progress
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({
                value: this.pityCounter,
                total: CommonConstants.PITY_THRESHOLD,
                type: ProgressType.Linear
            });
            Progress.width('80%');
            Progress.color(ColorConstants.HIGH_PRIZE_COLOR);
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.pityCounter} / ${CommonConstants.PITY_THRESHOLD}`);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } + `: ${CommonConstants.PITY_THRESHOLD - this.pityCounter}`);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        // Pity progress
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Statistics grid
            Column.create();
            // Statistics grid
            Column.width('90%');
            // Statistics grid
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.StatItem.bind(this)({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }, this.statistics.totalDraws.toString());
        this.StatItem.bind(this)({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }, this.statistics.singleDraws.toString());
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.StatItem.bind(this)({ "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }, this.statistics.tenDraws.toString());
        this.StatItem.bind(this)({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }, this.statistics.totalDraws.toString());
        Row.pop();
        // Statistics grid
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Prize distribution
            Column.create();
            // Prize distribution
            Column.width('90%');
            // Prize distribution
            Column.padding(16);
            // Prize distribution
            Column.backgroundColor('#F5F5F5');
            // Prize distribution
            Column.borderRadius(8);
            // Prize distribution
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.PrizeStatItem.bind(this)('★★★', this.statistics.superCount, ColorConstants.SUPER_PRIZE_COLOR);
        this.PrizeStatItem.bind(this)('★★', this.statistics.highCount, ColorConstants.HIGH_PRIZE_COLOR);
        this.PrizeStatItem.bind(this)('★', this.statistics.mediumCount, ColorConstants.MEDIUM_PRIZE_COLOR);
        this.PrizeStatItem.bind(this)('-', this.statistics.commonCount, ColorConstants.COMMON_PRIZE_COLOR);
        Row.pop();
        // Prize distribution
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontWeight(StyleConstants.FONT_WEIGHT);
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.controller?.close();
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    StatItem(label: Resource | string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.padding(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    PrizeStatItem(rarity: string, count: number, color: ResourceColor, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(rarity);
            Text.fontSize(14);
            Text.fontColor(color);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(count.toString());
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
