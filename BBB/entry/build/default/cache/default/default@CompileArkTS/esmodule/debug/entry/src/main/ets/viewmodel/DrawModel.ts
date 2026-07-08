import CommonConstants, { EnumeratedValue, PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
import ColorConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/ColorConstants";
import StyleConstants from "@bundle:com.example.canvascomponent/entry/ets/common/constants/StyleConstants";
import PrizeData from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/PrizeData";
import FillArcData from "@bundle:com.example.canvascomponent/entry/ets/viewmodel/FillArcData";
import Logger from "@bundle:com.example.canvascomponent/entry/ets/common/utils/Logger";
import CheckEmptyUtils from "@bundle:com.example.canvascomponent/entry/ets/common/utils/CheckEmptyUtils";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
/**
 * Draw statistics.
 */
export class DrawStatistics {
    totalDraws: number = 0;
    singleDraws: number = 0;
    tenDraws: number = 0;
    pityCounter: number = 0;
    commonCount: number = 0;
    mediumCount: number = 0;
    highCount: number = 0;
    superCount: number = 0;
}
/**
 * Canvas drawing method class with gacha system.
 */
export default class DrawModel {
    private startAngle: number = 0;
    private avgAngle: number = CommonConstants.CIRCLE / CommonConstants.COUNT;
    private screenWidth: number = 0;
    private canvasContext?: CanvasRenderingContext2D;
    // Gacha system state
    private pityCounter: number = 0;
    private statistics: DrawStatistics = new DrawStatistics();
    private history: PrizeData[] = [];
    /**
     * Draw the raffle round turntable.
     *
     * @param canvasContext canvasContext.
     * @param screenWidth screenWidth.
     * @param screenHeight screenHeight.
     */
    draw(canvasContext: CanvasRenderingContext2D, screenWidth: number, screenHeight: number) {
        if (CheckEmptyUtils.isEmptyObj(canvasContext)) {
            Logger.error('[DrawModel][draw] canvasContext is empty.');
            return;
        }
        this.canvasContext = canvasContext;
        this.screenWidth = screenWidth;
        this.canvasContext.clearRect(0, 0, this.screenWidth, screenHeight);
        // Translates the canvas along the X and Y axes by a specified distance.
        this.canvasContext.translate(this.screenWidth / CommonConstants.TWO, screenHeight / CommonConstants.TWO);
        // Painted outer disc petal.
        this.drawFlower();
        // Draw outer disc, small circle.
        this.drawOutCircle();
        // Draw the inner disc.
        this.drawInnerCircle();
        // Draw the interior fan-shaped raffle area.
        this.drawInnerArc();
        // Draw text in the internal fan area.
        this.drawArcText();
        // Draw the picture corresponding to the prize in the internal fan area.
        this.drawImage();
        this.canvasContext.translate(-this.screenWidth / CommonConstants.TWO, -screenHeight / CommonConstants.TWO);
    }
    /**
     * Method of drawing arcs.
     *
     * @param fillArcData fillArcData.
     * @param fillColor fillColor.
     */
    fillArc(fillArcData: FillArcData, fillColor: string) {
        if (CheckEmptyUtils.isEmptyObj(fillArcData) || CheckEmptyUtils.isEmptyStr(fillColor)) {
            Logger.error('[DrawModel][fillArc] fillArcData or fillColor is empty.');
            return;
        }
        if (this.canvasContext !== undefined) {
            this.canvasContext.beginPath();
            this.canvasContext.fillStyle = fillColor;
            this.canvasContext.arc(fillArcData.x, fillArcData.y, fillArcData.radius, fillArcData.startAngle, fillArcData.endAngle);
            this.canvasContext.fill();
        }
    }
    /**
     * Painted outer disc petal.
     */
    drawFlower() {
        let beginAngle = this.startAngle + this.avgAngle;
        const pointY = this.screenWidth * CommonConstants.FLOWER_POINT_Y_RATIOS;
        const radius = this.screenWidth * CommonConstants.FLOWER_RADIUS_RATIOS;
        const innerRadius = this.screenWidth * CommonConstants.FLOWER_INNER_RATIOS;
        for (let i = 0; i < CommonConstants.COUNT; i++) {
            this.canvasContext?.save();
            this.canvasContext?.rotate(beginAngle * Math.PI / CommonConstants.HALF_CIRCLE);
            this.fillArc(new FillArcData(0, -pointY, radius, 0, Math.PI * CommonConstants.TWO), ColorConstants.FLOWER_OUT_COLOR);
            this.fillArc(new FillArcData(0, -pointY, innerRadius, 0, Math.PI * CommonConstants.TWO), ColorConstants.FLOWER_INNER_COLOR);
            beginAngle += this.avgAngle;
            this.canvasContext?.restore();
        }
    }
    /**
     * Draw outer disc, small circle.
     */
    drawOutCircle() {
        // Draw outer disc.
        this.fillArc(new FillArcData(0, 0, this.screenWidth * CommonConstants.OUT_CIRCLE_RATIOS, 0, Math.PI * CommonConstants.TWO), ColorConstants.OUT_CIRCLE_COLOR);
        let beginAngle = this.startAngle;
        // Draw small circle.
        for (let i = 0; i < CommonConstants.SMALL_CIRCLE_COUNT; i++) {
            this.canvasContext?.save();
            this.canvasContext?.rotate(beginAngle * Math.PI / CommonConstants.HALF_CIRCLE);
            this.fillArc(new FillArcData(this.screenWidth * CommonConstants.SMALL_CIRCLE_RATIOS, 0, CommonConstants.SMALL_CIRCLE_RADIUS, 0, Math.PI * CommonConstants.TWO), ColorConstants.WHITE_COLOR);
            beginAngle = beginAngle + CommonConstants.CIRCLE / CommonConstants.SMALL_CIRCLE_COUNT;
            this.canvasContext?.restore();
        }
    }
    /**
     * Draw the inner disc.
     */
    drawInnerCircle() {
        this.fillArc(new FillArcData(0, 0, this.screenWidth * CommonConstants.INNER_CIRCLE_RATIOS, 0, Math.PI * CommonConstants.TWO), ColorConstants.INNER_CIRCLE_COLOR);
        this.fillArc(new FillArcData(0, 0, this.screenWidth * CommonConstants.INNER_WHITE_CIRCLE_RATIOS, 0, Math.PI * CommonConstants.TWO), ColorConstants.WHITE_COLOR);
    }
    /**
     * Draw the interior fan-shaped raffle area.
     */
    drawInnerArc() {
        let colors = [
            ColorConstants.ARC_PINK_COLOR, ColorConstants.ARC_YELLOW_COLOR,
            ColorConstants.ARC_GREEN_COLOR, ColorConstants.ARC_PINK_COLOR,
            ColorConstants.ARC_YELLOW_COLOR, ColorConstants.ARC_GREEN_COLOR
        ];
        let radius = this.screenWidth * CommonConstants.INNER_ARC_RATIOS;
        for (let i = 0; i < CommonConstants.COUNT; i++) {
            this.fillArc(new FillArcData(0, 0, radius, this.startAngle * Math.PI / CommonConstants.HALF_CIRCLE, (this.startAngle + this.avgAngle) * Math.PI / CommonConstants.HALF_CIRCLE), colors[i]);
            this.canvasContext?.lineTo(0, 0);
            this.canvasContext?.fill();
            this.startAngle += this.avgAngle;
        }
    }
    /**
     * Draw text in the internal fan area.
     */
    drawArcText() {
        if (this.canvasContext !== undefined) {
            this.canvasContext.textAlign = CommonConstants.TEXT_ALIGN;
            this.canvasContext.textBaseline = CommonConstants.TEXT_BASE_LINE;
            this.canvasContext.fillStyle = ColorConstants.TEXT_COLOR;
            this.canvasContext.font = StyleConstants.ARC_TEXT_SIZE + CommonConstants.CANVAS_FONT;
        }
        let textArrays = [
            { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
            { "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
            { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
            { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
            { "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" },
            { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" }
        ];
        let arcTextStartAngle = CommonConstants.ARC_START_ANGLE;
        let arcTextEndAngle = CommonConstants.ARC_END_ANGLE;
        for (let i = 0; i < CommonConstants.COUNT; i++) {
            this.drawCircularText(this.getResourceString(textArrays[i]), (this.startAngle + arcTextStartAngle) * Math.PI / CommonConstants.HALF_CIRCLE, (this.startAngle + arcTextEndAngle) * Math.PI / CommonConstants.HALF_CIRCLE);
            this.startAngle += this.avgAngle;
        }
    }
    /**
     * Obtains the character string corresponding to the specified resource ID.
     *
     * @param resource resource.
     */
    getResourceString(resource: Resource): string {
        if (CheckEmptyUtils.isEmptyObj(resource)) {
            Logger.error('[DrawModel][getResourceString] resource is empty.');
            return '';
        }
        let resourceString: string = '';
        try {
            resourceString = uiContext!.getHostContext()!.resourceManager.getStringSync(resource.id);
        }
        catch (error) {
            Logger.error(`[DrawModel][getResourceString]getStringSync failed, error : ${JSON.stringify(error)}.`);
        }
        return resourceString;
    }
    /**
     * Draw Arc Text.
     *
     * @param textString textString.
     * @param startAngle startAngle.
     * @param endAngle endAngle.
     */
    drawCircularText(textString: string, startAngle: number, endAngle: number) {
        if (CheckEmptyUtils.isEmptyStr(textString)) {
            Logger.error('[DrawModel][drawCircularText] textString is empty.');
            return;
        }
        class CircleText {
            x: number = 0;
            y: number = 0;
            radius: number = 0;
        }
        let circleText: CircleText = {
            x: 0,
            y: 0,
            radius: this.screenWidth * CommonConstants.INNER_ARC_RATIOS
        };
        // The radius of the circle.
        let radius = circleText.radius - circleText.radius / CommonConstants.COUNT;
        // The radians occupied by each letter.
        let angleDecrement = (startAngle - endAngle) / (textString.length - 1);
        let angle = startAngle;
        let index = 0;
        let character: string;
        while (index < textString.length) {
            character = textString.charAt(index);
            this.canvasContext?.save();
            this.canvasContext?.beginPath();
            this.canvasContext?.translate(circleText.x + Math.cos(angle) * radius, circleText.y - Math.sin(angle) * radius);
            this.canvasContext?.rotate(Math.PI / CommonConstants.TWO - angle);
            this.canvasContext?.fillText(character, 0, 0);
            angle -= angleDecrement;
            index++;
            this.canvasContext?.restore();
        }
    }
    /**
     * Draw the picture corresponding to the prize in the internal fan area.
     */
    drawImage() {
        let beginAngle = this.startAngle;
        let imageSrc = [
            CommonConstants.WATERMELON_IMAGE_URL, CommonConstants.HAMBURG_IMAGE_URL,
            CommonConstants.SMILE_IMAGE_URL, CommonConstants.CAKE_IMAGE_URL,
            CommonConstants.HAMBURG_IMAGE_URL, CommonConstants.SMILE_IMAGE_URL
        ];
        for (let i = 0; i < CommonConstants.COUNT; i++) {
            let image = new ImageBitmap(imageSrc[i]);
            this.canvasContext?.save();
            this.canvasContext?.rotate(beginAngle * Math.PI / CommonConstants.HALF_CIRCLE);
            this.canvasContext?.drawImage(image, this.screenWidth * CommonConstants.IMAGE_DX_RATIOS, this.screenWidth * CommonConstants.IMAGE_DY_RATIOS, CommonConstants.IMAGE_SIZE, CommonConstants.IMAGE_SIZE);
            beginAngle += this.avgAngle;
            this.canvasContext?.restore();
        }
    }
    /**
     * Calculate probability with pity system.
     * Returns a prize index based on weighted probability.
     */
    private calculatePrizeIndex(): number {
        const rand = Math.random() * 10000; // 0-10000 scale
        // Calculate high prize probability with soft pity
        let highRate = CommonConstants.HIGH_PRIZE_BASE_RATE;
        if (this.pityCounter >= CommonConstants.SOFT_PITY_START) {
            // Soft pity: increase probability after threshold
            highRate += (this.pityCounter - CommonConstants.SOFT_PITY_START) * 100;
        }
        // Hard pity: guarantee high prize
        if (this.pityCounter >= CommonConstants.PITY_THRESHOLD) {
            this.pityCounter = 0;
            return this.getHighPrizeIndex();
        }
        // Super prize (watermelon) - very rare
        if (rand < 10) { // 0.1%
            this.pityCounter = 0;
            return EnumeratedValue.ONE; // Watermelon
        }
        // High prize (cake)
        if (rand < 10 + highRate) {
            this.pityCounter = 0;
            return EnumeratedValue.FOUR; // Cake
        }
        // Medium prize (hamburger)
        if (rand < 10 + highRate + CommonConstants.MEDIUM_PRIZE_BASE_RATE) {
            this.pityCounter++;
            return EnumeratedValue.TWO; // Hamburger
        }
        // Common prize (thanks)
        this.pityCounter++;
        return EnumeratedValue.THREE; // Thanks
    }
    /**
     * Get a random high prize index.
     */
    private getHighPrizeIndex(): number {
        const rand = Math.random();
        if (rand < 0.1) {
            return EnumeratedValue.ONE; // Watermelon (super rare)
        }
        return EnumeratedValue.FOUR; // Cake
    }
    /**
     * Perform single draw with pity system.
     */
    drawSingle(): PrizeData {
        const prizeIndex = this.calculatePrizeIndex();
        const prizeData = this.getPrizeData(prizeIndex);
        prizeData.timestamp = Date.now();
        // Update statistics
        this.statistics.totalDraws++;
        this.statistics.singleDraws++;
        this.updatePrizeCount(prizeData.rarity);
        // Add to history
        this.addToHistory(prizeData);
        return prizeData;
    }
    /**
     * Perform ten consecutive draws.
     */
    drawTen(): PrizeData[] {
        const results: PrizeData[] = [];
        for (let i = 0; i < CommonConstants.TEN; i++) {
            const prize = this.drawSingle();
            results.push(prize);
        }
        // Update ten draw count (already updated single draws in drawSingle)
        this.statistics.tenDraws++;
        return results;
    }
    /**
     * Update prize count in statistics.
     */
    private updatePrizeCount(rarity: PrizeRarity) {
        switch (rarity) {
            case PrizeRarity.COMMON:
                this.statistics.commonCount++;
                break;
            case PrizeRarity.MEDIUM:
                this.statistics.mediumCount++;
                break;
            case PrizeRarity.HIGH:
                this.statistics.highCount++;
                break;
            case PrizeRarity.SUPER:
                this.statistics.superCount++;
                break;
        }
    }
    /**
     * Add prize to history.
     */
    private addToHistory(prize: PrizeData) {
        this.history.unshift(prize);
        if (this.history.length > CommonConstants.MAX_HISTORY_RECORDS) {
            this.history.pop();
        }
    }
    /**
     * Get draw statistics.
     */
    getStatistics(): DrawStatistics {
        return this.statistics;
    }
    /**
     * Get draw history.
     */
    getHistory(): PrizeData[] {
        return this.history;
    }
    /**
     * Get current pity counter.
     */
    getPityCounter(): number {
        return this.pityCounter;
    }
    /**
     * Get remaining draws until pity.
     */
    getRemainingPity(): number {
        return CommonConstants.PITY_THRESHOLD - this.pityCounter;
    }
    /**
     * Displaying information about prizes (for wheel animation).
     *
     * @param randomAngle randomAngle.
     */
    showPrizeData(randomAngle: number): PrizeData {
        for (let i = 1; i <= CommonConstants.COUNT; i++) {
            if (randomAngle <= i * this.avgAngle) {
                return this.getPrizeData(i);
            }
        }
        return new PrizeData();
    }
    /**
     * Obtaining information about prizes.
     *
     * @param scopeNum scopeNum.
     */
    getPrizeData(scopeNum: number): PrizeData {
        let prizeData: PrizeData = new PrizeData();
        prizeData.index = scopeNum;
        switch (scopeNum) {
            case EnumeratedValue.ONE:
                prizeData.message = { "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" };
                prizeData.imageSrc = CommonConstants.WATERMELON_IMAGE_URL;
                prizeData.rarity = PrizeRarity.SUPER;
                prizeData.name = 'Watermelon';
                break;
            case EnumeratedValue.THREE:
            case EnumeratedValue.SIX:
                prizeData.message = { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" };
                prizeData.imageSrc = CommonConstants.SMILE_IMAGE_URL;
                prizeData.rarity = PrizeRarity.COMMON;
                prizeData.name = 'Thanks';
                break;
            case EnumeratedValue.FOUR:
                prizeData.message = { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" };
                prizeData.imageSrc = CommonConstants.CAKE_IMAGE_URL;
                prizeData.rarity = PrizeRarity.HIGH;
                prizeData.name = 'Cake';
                break;
            case EnumeratedValue.TWO:
            case EnumeratedValue.FIVE:
                prizeData.message = { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.canvascomponent", "moduleName": "entry" };
                prizeData.imageSrc = CommonConstants.HAMBURG_IMAGE_URL;
                prizeData.rarity = PrizeRarity.MEDIUM;
                prizeData.name = 'Hamburger';
                break;
            default:
                break;
        }
        return prizeData;
    }
}
