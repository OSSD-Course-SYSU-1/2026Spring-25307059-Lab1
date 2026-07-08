import json
import re

# 读取文件
file_path = r"C:\Users\yukino\AppData\Local\OpenHarmony\Sdk\20\ets\api\device-define\default.json"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 要移除的 SysCap
to_remove = [
    "SystemCapability.Telephony.CellularData",
    "SystemCapability.Telephony.CoreService",
    "SystemCapability.Telephony.StateRegistry",
    "SystemCapability.Telephony.SmsMms",
    "SystemCapability.Telephony.CallManager",
    "SystemCapability.Communication.Bluetooth.Core",
    "SystemCapability.DistributedHardware.DeviceManager",
    "SystemCapability.Multimedia.Drm.Core",
    "SystemCapability.Advertising.Ads",
    "SystemCapability.BundleManager.AppDomainVerify",
    "SystemCapability.Customization.EnterpriseDeviceManager",
    "SystemCapability.Multimedia.Media.AVTranscoder"
]

# 移除 SysCap
for syscap in to_remove:
    content = content.replace(f'"{syscap}",', '')
    content = content.replace(f'"{syscap}"', '')

# 清理多余的逗号
content = re.sub(r',(\s*\])', r'\1', content)

# 保存文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("修改完成！")
