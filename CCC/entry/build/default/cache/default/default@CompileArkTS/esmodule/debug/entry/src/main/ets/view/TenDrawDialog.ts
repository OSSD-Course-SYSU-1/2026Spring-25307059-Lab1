if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TenDrawDialog_Params {
    prizes?: PrizeData[];
    enableFlag?: boolean;
    controller?: CustomDialogController;
}
import type PrizeData from '../viewmodel/PrizeData';
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import { PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
export default class TenDrawDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__prizes = new SynchedPropertyObjectTwoWayPU(params.prizes, this, "prizes");
        this.__enableFlag = new SynchedPropertySimpleTwoWayPU(params.enableFlag, this, "enableFlag");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TenDrawDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: TenDrawDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__prizes.purgeDependencyOnElmtId(rmElmtId);
        this.__enableFlag.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__prizes.aboutToBeDeleted();
        this.__enableFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __prizes: SynchedPropertySimpleOneWayPU<PrizeData[]>;
    get prizes() {
        return this.__prizes.get();
    }
    set prizes(newValue: PrizeData[]) {
        this.__prizes.set(newValue);
    }
    private __enableFlag: SynchedPropertySimpleTwoWayPU<boolean>;
    get enableFlag() {
        return this.__enableFlag.get();
    }
    set enableFlag(newValue: boolean) {
        this.__enableFlag.set(newValue);
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
            Column.height(350);
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 16, bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Prize grid
            Grid.create();
            // Prize grid
            Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr');
            // Prize grid
            Grid.rowsTemplate('1fr 1fr');
            // Prize grid
            Grid.columnsGap(8);
            // Prize grid
            Grid.rowsGap(8);
            // Prize grid
            Grid.width('90%');
            // Prize grid
            Grid.height(180);
            // Prize grid
            Grid.margin({ bottom: 16 });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const prize = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.padding(8);
                            Column.backgroundColor(this.getRarityBgColor(prize.rarity));
                            Column.borderRadius(8);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(prize.imageSrc !== undefined ? prize.imageSrc : '');
                            Image.width(50);
                            Image.height(50);
                            Image.margin({ bottom: 4 });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.getRarityText(prize.rarity));
                            Text.fontSize(10);
                            Text.fontColor(this.getRarityColor(prize.rarity));
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.prizes, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // Prize grid
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Summary
            Row.create();
            // Summary
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } + ': ' + this.getCountByRarity(PrizeRarity.SUPER));
            Text.fontSize(12);
            Text.fontColor(ColorConstants.SUPER_PRIZE_COLOR);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } + ': ' + this.getCountByRarity(PrizeRarity.HIGH));
            Text.fontSize(12);
            Text.fontColor(ColorConstants.HIGH_PRIZE_COLOR);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } + ': ' + this.getCountByRarity(PrizeRarity.MEDIUM));
            Text.fontSize(12);
            Text.fontColor(ColorConstants.MEDIUM_PRIZE_COLOR);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // Summary
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontWeight(StyleConstants.FONT_WEIGHT);
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.controller?.close();
                this.enableFlag = !this.enableFlag;
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    private getRarityText(rarity: PrizeRarity): string {
        switch (rarity) {
            case PrizeRarity.SUPER:
                return '★★★';
            case PrizeRarity.HIGH:
                return '★★';
            case PrizeRarity.MEDIUM:
                return '★';
            default:
                return '-';
        }
    }
    private getRarityColor(rarity: PrizeRarity): ResourceColor {
        switch (rarity) {
            case PrizeRarity.SUPER:
                return ColorConstants.SUPER_PRIZE_COLOR;
            case PrizeRarity.HIGH:
                return ColorConstants.HIGH_PRIZE_COLOR;
            case PrizeRarity.MEDIUM:
                return ColorConstants.MEDIUM_PRIZE_COLOR;
            default:
                return ColorConstants.COMMON_PRIZE_COLOR;
        }
    }
    private getRarityBgColor(rarity: PrizeRarity): ResourceColor {
        switch (rarity) {
            case PrizeRarity.SUPER:
                return '#FFFDE7';
            case PrizeRarity.HIGH:
                return '#E3F2FD';
            case PrizeRarity.MEDIUM:
                return '#E8F5E9';
            default:
                return '#F5F5F5';
        }
    }
    private getCountByRarity(rarity: PrizeRarity): number {
        return this.prizes.filter(p => p.rarity === rarity).length;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
