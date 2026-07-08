if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PrizeDialog_Params {
    prizeData?: PrizeData;
    enableFlag?: boolean;
    controller?: CustomDialogController;
}
import type PrizeData from '../viewmodel/PrizeData';
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import CommonConstants, { PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
export default class PrizeDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__prizeData = new SynchedPropertyObjectTwoWayPU(params.prizeData, this, "prizeData");
        this.__enableFlag = new SynchedPropertySimpleTwoWayPU(params.enableFlag, this, "enableFlag");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PrizeDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: PrizeDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__prizeData.purgeDependencyOnElmtId(rmElmtId);
        this.__enableFlag.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__prizeData.aboutToBeDeleted();
        this.__enableFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __prizeData: SynchedPropertySimpleOneWayPU<PrizeData>;
    get prizeData() {
        return this.__prizeData.get();
    }
    set prizeData(newValue: PrizeData) {
        this.__prizeData.set(newValue);
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
            Column.width(StyleConstants.FULL_PERCENT);
            Column.height({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.prizeData.imageSrc !== undefined ? this.prizeData.imageSrc : '');
            Image.width({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Image.height({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Image.margin({
                top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
                bottom: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }
            });
            Image.rotate({
                x: 0,
                y: 0,
                z: 1,
                angle: CommonConstants.TRANSFORM_ANGLE
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Rarity indicator
            Row.create();
            // Rarity indicator
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getRarityText());
            Text.fontSize(12);
            Text.fontColor(this.getRarityColor());
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // Rarity indicator
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.prizeData.message);
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.margin({ bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" } });
        }, Text);
        Text.pop();
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
    private getRarityText(): string {
        switch (this.prizeData.rarity) {
            case PrizeRarity.SUPER:
                return '★★★ SUPER ★★★';
            case PrizeRarity.HIGH:
                return '★★ HIGH ★★';
            case PrizeRarity.MEDIUM:
                return '★ MEDIUM ★';
            default:
                return 'COMMON';
        }
    }
    private getRarityColor(): ResourceColor {
        switch (this.prizeData.rarity) {
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
    rerender() {
        this.updateDirtyElements();
    }
}
