https://developer.chrome.com/docs/extensions/reference/commands/

添加触发操作的键盘快捷键。

使用命令 API 添加在扩展程序中触发操作的键盘快捷键，例如打开浏览器操作或向扩展程序发送命令的操作。



#### Usage

命令 API 允许扩展开发人员定义特定命令，并将它们绑定到默认组合键。扩展程序接受的每个命令都必须声明为扩展程序清单中“命令”对象的属性。

属性键用作命令的名称。命令对象可以有两个属性。

* suggested_key

  一个可选属性，声明命令的默认键盘快捷键。如果省略，该命令将被解除绑定。该属性可以采用字符串或对象值。

  * 字符串值指定应在所有平台上使用的默认键盘快捷键。
  * 对象值允许扩展开发人员为每个平台自定义键盘快捷键。提供特定于平台的快捷方式时，有效的对象属性为 default、chromeos、linux、mac 和 windows。

* description

  用于向用户提供命令用途的简短描述的字符串。此字符串出现在扩展键盘快捷键管理 UI 中。标准命令需要描述，但操作命令会忽略描述。

扩展可以有许多命令，但最多可以指定四个建议的键盘快捷键。用户可以从 chrome://extensions/shortcuts 对话框手动添加更多快捷方式。



##### Supported Keys

以下按键是可用的命令快捷键。关键定义区分大小写。尝试使用大小写不正确的密钥加载扩展将导致安装时出现明显解析错误。

* Alpha keys

* Numeric keys

* Standard key strings

  General–`Comma`, `Period`, `Home`, `End`, `PageUp`, `PageDown`, `Space`, `Insert`, `Delete`

  Arrow keys–`Up`, `Down`, `Left`, `Right`

  Media Keys–`MediaNextTrack`, `MediaPlayPause`, `MediaPrevTrack`, `MediaStop`

* Modifier key strings

  `Ctrl`, `Alt` (`Option` on macOS), `Shift`, `MacCtrl` (macOS only), `Command` (macOS only), `Search` (ChromeOS only)

出于可访问性原因，Tab 已从 Chrome 33 中支持的按键列表中删除。



##### Key combination requirements 组合键要求

* 扩展命令快捷键必须包含 Ctrl 或 Alt。
  * 修饰符不能与媒体键结合使用。
* 在 macOS 上，Ctrl 会自动转换为 Command。
  * 要在 macOS 上使用 Control 键，请在定义“mac”快捷方式时将 Ctrl 替换为 MacCtrl。
  * 在另一个平台上组合使用 MacCtrl 将导致验证错误并阻止安装扩展。
* Shift 是所有平台上的可选修饰符。
* Search 是 ChromeOS 独有的可选修饰符。
* 某些操作系统和 Chrome 快捷方式（例如窗口管理）始终优先于扩展程序命令快捷方式，并且不能被覆盖。

不允许使用涉及 Ctrl+Alt 的组合键，以避免与 AltGr 键发生冲突。



##### Handling command events 处理命令事件

```json
{
  "name": "My extension",
  ...
  "commands": {
    "run-foo": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y"
      },
      "description": "Run \"foo\" on the current page."
    },
    "_execute_action": {
      "suggested_key": {
        "windows": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y",
        "chromeos": "Ctrl+Shift+U",
        "linux": "Ctrl+Shift+J"
      }
    }
  },
  ...
}
```

在 Service Worker 中，您可以使用 onCommand.addListener 将处理程序绑定到清单中定义的每个命令。例如：

```js
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});
```



##### Action commands 动作命令

 _execute_action (Manifest V3)、_execute_browser_action (Manifest V2) 和 _execute_page_action (Manifest V2) 命令分别保留用于触发您的操作、浏览器操作或页面操作。这些命令不会像标准命令那样调度 command.onCommand 事件。

如果您需要根据弹出窗口的打开情况采取操作，请考虑在弹出窗口的 JavaScript 中监听 DOMContentLoaded 事件。



#### Scope

默认情况下，命令的范围仅限于 Chrome 浏览器。这意味着当浏览器没有焦点时，命令快捷方式将处于非活动状态。从 Chrome 35 开始，扩展开发人员可以选择将命令标记为“全局”。当 Chrome 没有焦点时，全局命令也可以工作。

> ChromeOS 不支持全局命令。

全局命令的键盘快捷键建议仅限于 Ctrl+Shift+[0..9]。这是一种保护措施，可最大限度地降低覆盖其他应用程序中的快捷方式的风险，因为例如，如果允许 Alt+P 作为全局快捷键，则用于打开打印对话框的键盘快捷方式可能无法在其他应用程序中使用。

最终用户可以使用 chrome://extensions/shortcuts 上公开的 UI 将全局命令重新映射到他们喜欢的组合键。

```json
{
  "name": "My extension",
  ...
  "commands": {
    "toggle-feature-foo": {
      "suggested_key": {
        "default": "Ctrl+Shift+5"
      },
      "description": "Toggle feature foo",
      "global": true
    }
  },
  ...
}
```



#### Examples

以下示例展示了命令 API 的核心功能。



##### Basic command 基本命令

命令允许扩展将逻辑映射到用户可以调用的键盘快捷键。最基本的是，命令只需要扩展清单中的命令声明和侦听器注册，如以下示例所示。

```json
{
  "name": "Command demo - basic",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "service-worker.js"
  },
  "commands": {
    "inject-script": {
      "suggested_key": "Ctrl+Shift+Y",
      "description": "Inject a script on the page"
    }
  }
}
```

```js
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
});
```



##### Action command 动作指令

如“用法”部分中所述，您还可以将命令映射到扩展的操作。以下示例注入一个内容脚本，当用户单击扩展程序的操作或触发键盘快捷键时，该脚本会在当前页面上显示警报。

```json
{
  "name": "Commands demo - action invocation",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "service-worker.js"
  },
  "permissions": ["activeTab", "scripting"],
  "action": {},
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+U",
        "mac": "Command+U"
      }
    }
  }
}
```

```js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: contentScriptFunc,
    args: ['action'],
  });
});

function contentScriptFunc(name) {
  alert(`"${name}" executed`);
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" called`);
});
```



#### Verify commands registered 验证已注册的命令

如果一个分机尝试注册另一个分机已使用的快捷方式，则第二个分机的快捷方式将不会按预期注册。您可以通过预测这种可能性并在安装时检查冲突来提供更强大的最终用户体验。

```js
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let {name, shortcut} of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
    }
  });
}
```



#### Types

###### Command

* description

  扩展命令说明

* name

  扩展命令的名称

* shortcut

  The shortcut active for this command, or blank if not active.

  此命令的快捷方式处于活动状态，如果不活动则为空白。



#### Methods

###### getAll

Returns all the registered extension commands for this extension and their shortcut (if active).

返回此扩展的所有已注册扩展命令及其快捷方式（如果处于活动状态）。



#### Events

###### onCommand

使用键盘快捷键激活注册命令时触发。

`(command: string, tab?: tabs.Tab) => void`
