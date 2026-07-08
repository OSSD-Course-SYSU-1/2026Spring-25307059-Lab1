import { PrizeRarity } from "@bundle:com.example.canvascomponent/entry/ets/common/constants/CommonConstants";
/**
 * Prize data.
 */
export default class PrizeData {
    /**
     * The prize message.
     */
    message?: Resource;
    /**
     * Image src.
     */
    imageSrc?: string;
    /**
     * Prize rarity level.
     */
    rarity: PrizeRarity = PrizeRarity.COMMON;
    /**
     * Prize name for display.
     */
    name?: string;
    /**
     * Prize index on the wheel.
     */
    index: number = 0;
    /**
     * Timestamp when obtained.
     */
    timestamp: number = 0;
}
