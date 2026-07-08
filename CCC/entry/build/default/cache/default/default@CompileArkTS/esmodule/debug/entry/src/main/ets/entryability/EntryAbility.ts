import UIAbility from "@ohos:app.ability.UIAbility";
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
const TAG: string = 'EntryAbility';
const DOMAIN: number = 0x0000;
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onCreate');
        // Check if this is a continuation launch
        if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
            hilog.info(DOMAIN, TAG, '%{public}s', 'Launched by continuation');
        }
    }
    onDestroy() {
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/CanvasPage', (err, data) => {
            if (err.code) {
                hilog.error(DOMAIN, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(DOMAIN, TAG, 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
            AppStorage.setOrCreate('uiContext', windowStage.getMainWindowSync().getUIContext());
        });
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onBackground');
    }
    /**
     * Called when ability is about to be continued on another device
     * Save state data for migration
     */
    onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onContinue called for migration');
        // Get migration state from AppStorage
        const migrationState = AppStorage.get<string>('migrationState') ?? '';
        if (migrationState) {
            wantParam['migrationState'] = migrationState;
            wantParam['migrationTime'] = Date.now().toString();
            hilog.info(DOMAIN, TAG, '%{public}s', 'Migration data prepared');
        }
        return AbilityConstant.OnContinueResult.AGREE;
    }
    /**
     * Called when new ability is created from continuation
     * Restore state from migration data
     */
    onCompleteContinuation(want: Want, result: number) {
        hilog.info(DOMAIN, TAG, 'onCompleteContinuation called, result: %{public}d', result);
        if (result === 0) {
            hilog.info(DOMAIN, TAG, '%{public}s', 'Continuation completed successfully');
        }
        else {
            hilog.error(DOMAIN, TAG, 'Continuation failed with result: %{public}d', result);
        }
    }
    /**
     * Called when receiving remote data from source device
     */
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
        hilog.info(DOMAIN, TAG, '%{public}s', 'onNewWant called');
        // Check for migration data
        const stateData = want.parameters?.['migrationState'] as string;
        if (stateData) {
            // Store migration state for page to restore
            AppStorage.setOrCreate('restoredMigrationState', stateData);
            hilog.info(DOMAIN, TAG, '%{public}s', 'Migration state received and stored');
        }
    }
}
