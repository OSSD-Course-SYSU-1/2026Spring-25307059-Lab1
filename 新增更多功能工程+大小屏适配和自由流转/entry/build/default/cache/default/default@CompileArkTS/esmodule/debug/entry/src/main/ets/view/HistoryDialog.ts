if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HistoryDialog_Params {
    history?: PrizeData[];
    controller?: CustomDialogController;
}
import type PrizeData from '../viewmodel/PrizeData';
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import { PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
export default class HistoryDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__history = new SynchedPropertyObjectTwoWayPU(params.history, this, "history");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HistoryDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: HistoryDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__history.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__history.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __history: SynchedPropertySimpleOneWayPU<PrizeData[]>;
    get history() {
        return this.__history.get();
    }
    set history(newValue: PrizeData[]) {
        this.__history.set(newValue);
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
            Column.height(450);
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 16, bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.history.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 40, bottom: 40 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('90%');
                        List.height(300);
                        List.divider({ strokeWidth: 1, color: '#EEEEEE' });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const prize = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding(12);
                                        Row.backgroundColor(index % 2 === 0 ? '#FFFFFF' : '#F9F9F9');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(prize.imageSrc !== undefined ? prize.imageSrc : '');
                                        Image.width(40);
                                        Image.height(40);
                                        Image.margin({ right: 12 });
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.layoutWeight(1);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(prize.name !== undefined ? prize.name : '');
                                        Text.fontSize(14);
                                        Text.fontWeight(FontWeight.Medium);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.formatTime(prize.timestamp));
                                        Text.fontSize(10);
                                        Text.fontColor('#999999');
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.getRarityText(prize.rarity));
                                        Text.fontSize(12);
                                        Text.fontColor(this.getRarityColor(prize.rarity));
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.history, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.fontWeight(StyleConstants.FONT_WEIGHT);
            Text.fontSize({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 16, bottom: 16 });
            Text.onClick(() => {
                this.controller?.close();
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
    private formatTime(timestamp: number): string {
        if (timestamp === 0)
            return '';
        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
