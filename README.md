<div align="center">

# Loners

**汤木先生的孤独患者 · 为工作而生**

_React 业务组件与工具 · Yarn Workspaces Monorepo_

[![Repository](https://img.shields.io/badge/GitHub-tangmuchw%2Floners-181717?logo=github)](https://github.com/tangmuchw/loners)

</div>

---

## 目录

- [仓库结构](#仓库结构)
- [包：`loners-form`（表单）](#包loners-form表单)
- [包：`loners-player`（播放器）](#包loners-player播放器)
- [包：`loners-table`（表格）](#包loners-table表格)
- [包：`loners-scripts`（工具方法）](#包loners-scripts工具方法)
- [开发与文档](#开发与文档)
- [注意事项](#注意事项)
- [作者与仓库](#作者与仓库)

---

## 仓库结构

| 包名 | 路径 | 说明 |
| --- | --- | --- |
| `loners-form` | [`packages/form`](./packages/form) | 基于 antd 的可配置化表单与表单项封装 |
| `loners-player` | [`packages/player`](./packages/player) | 视频 / 音频播放器（video.js） |
| `loners-table` | [`packages/table`](./packages/table) | 表格（当前导出占位，见下文） |
| `loners-scripts` | [`packages/scripts`](./packages/scripts) | 常用工具方法（千分位、时间格式化等） |

---

## 包：`loners-form`（表单）

**Peer：** `antd` 4.x、`react` ^16.x。部分组件依赖 `umi` 路由（如 `SubmitForm` 的返回），在 Storybook 中已做兼容。

**入口导出**（[`packages/form/src/index.ts`](./packages/form/src/index.ts)）：

`InputGo`、`InputNumberGo`、`InputLoadingGo`、`SelectGo`、`RangePickerGo`、`SubmitForm`、`FormWidget`、`FormTool`。

以下为各组件职责与 **主要属性 / 方法**（「透传」表示除下列外，其余与对应 antd 组件或类型一致）。

### `FormTool`

配置化渲染一组表单项（内部 `Row` + `Col` + `Form.Item`）。

| 属性 / 方法 | 类型 | 说明 |
| --- | --- | --- |
| `items` | `FormToolItem[]` | 表单项配置（核心） |
| `action` | `'edit' \| 'add' \| 'readonly'` | 只读时禁用控件；只读且存在 `renderText` 时用于展示文本 |
| `className` | `string` | 外层 `Row` 的 class |
| （其余） | `RowProps` | 透传 antd `Row`（如 `gutter`） |

**`FormToolItem`（`items` 单项）常用字段：**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `type` | 见下 | 控件类型：`InputText`、`SimpleSelect`、`RadioGroup`、`RangePicker`、`InputNumber`、`Switch`、`InputLoading`、`Textarea`、`Customize` 等 |
| `name`、`label`、`rules` 等 | — | 透传 `antd` `Form.Item` |
| `fieldProps` | `FieldProps` | 透传给具体控件 |
| `show` | `boolean \| (fm, action) => boolean` | 是否展示该项 |
| `disabled` | `(action) => boolean` | 按模式禁用 |
| `colProps` | `ColProps` | 栅格列 |
| `renderFormItem` / `render` / `renderText` | — | 仅 `type === 'Customize'` 或只读 `renderText` 时使用 |
| `syncToQuery` | `boolean \| function` | 与 URL 查询同步（实现见业务侧） |

### `FormWidget`

在 `antd` `Form` 上封装 `items`、`clearRules`，并节流 `onFinish`。

| 属性 / 方法 | 类型 | 说明 |
| --- | --- | --- |
| `form` | `FormInstance` | 外部传入则使用外部实例 |
| `formRef` | `Ref<FormInstance>` | 暴露当前 `FormInstance` |
| `items` | `FormToolItem[]` | 传入则内部渲染 `FormTool` |
| `formToolProps` | `Omit<FormToolProps,'items'>` | 传给 `FormTool`（如 `action`、`gutter`） |
| `clearRules` | `ClearRule[]` | 字段变化时清空指定字段（值为 `undefined`） |
| `onFinish` | `(values) => void` | 提交回调（内部 300ms throttle） |
| （其余） | `FormProps` | 透传 antd `Form`（如 `initialValues`、`layout`） |

**`ClearRule`：**

| 属性          | 类型                 | 说明             |
| ------------- | -------------------- | ---------------- |
| `changedName` | `string \| string[]` | 监听的字段变化   |
| `clearedName` | `string \| string[]` | 被清空取值的字段 |

### `SubmitForm`

分组表单 + 默认底部「返回 / 提交」（`readonly` 时隐藏提交）；`useHistory().goBack()` 用于返回（需路由环境）。

| 属性 / 方法 | 类型 | 说明 |
| --- | --- | --- |
| `action` | `'edit' \| 'add' \| 'readonly'` | 模式；`readonly` 隐藏提交按钮 |
| `groups` | `FormGroup[]` | 分组列表（每组含 `title`、`items`，可选 `show` + `shouldUpdate`） |
| `footerRender` | `ReactNode` | 自定义底部，替换默认按钮区 |
| `onFinish` | `(values) => void` | 提交（内部对 `onFinish` 节流） |
| `className` | `string` | 外层 `Card` class |
| （其余） | 除 `form` 外同 `FormWidget` | 如 `initialValues` 等透传至 `FormWidget` |

### `SelectGo`

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `options` | `{label,value}[]` | 与 `valueEnum` 二选一 |
| `valueEnum` | `Record` 或 `Map` | 转为 `options` |
| `showQA` | `boolean \| { title: string }` | 右侧问号说明 |
| `tooltip` | `boolean \| TooltipProps` | 选项内长文案省略 + Tooltip |
| `fixedWidth` | `boolean` | 短字段固定最大宽度 |
| `mode` | `SelectProps['mode']` | `multiple` 时使用内置「全选」逻辑（`Multi`） |
| （其余） | `SelectProps` | 默认 `placeholder`「请选择」、`allowClear` 默认 `true` 等 |

### `InputGo` / `InputNumberGo` / `TextareaGo` / `SwitchGo`

| 组件 | 额外属性 | 说明 |
| --- | --- | --- |
| `InputGo` | `fixedWidth`、`showQA` | 透传 antd `Input`；默认 `placeholder`「请输入」 |
| `InputNumberGo` | `fixedWidth` | 透传 antd `InputNumber` |
| `TextareaGo` | `fixedWidth`、`showQA` | 透传 `Input.TextArea`；默认 `showCount`、`maxLength`、`autoSize` 等 |
| `SwitchGo` | `showQA` | 透传 antd `Switch` |

### `RangePickerGo`

| 属性 | 说明 |
| --- | --- |
| （整体） | 基于 **moment** 的 `RangePicker`；默认占位「开始时间 / 结束时间」；内置快捷范围（今天、当月、3/7/15/30 日等） |
| （其余） | 透传 antd `RangePicker` |

### `InputLoadingGo`

在 `InputNumberGo` 外增加聚焦请求、加载态与提示文案（`ahooks` `useRequest`）。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `fm` | `FormInstance` | 可选；`focus` 时用 `getFieldsValue` 组装参数 |
| `request` | 对象 | `fetchFunc`、`formatResult`（展开到内部数字框）、`formatParams`、`formatTips`、`loadingText` |
| `showQA` | `ShowQA` | 无 tips 且非 loading 时可显示问号 |
| （其余） | `InputNumberGoProps` | 透传数字输入 |

### `QA`（未在 `index.ts` 导出，供上述组件使用）

| 属性        | 类型        | 说明         |
| ----------- | ----------- | ------------ |
| `title`     | `ReactNode` | Tooltip 内容 |
| `className` | `string`    | 容器 class   |

### 设计常量（[`packages/form/src/constants.ts`](./packages/form/src/constants.ts)）

- `WIDTH_SIZE_ENUM`：各档宽度（`xs` / `s` / `m` 等），与 `*Go` 的 `fixedWidth` 搭配使用。
- `FORM_ITEM_CLASS_NAME`：表单项包裹层 class 前缀（`loners-form-item`）。

更细的 TypeScript 定义见各目录下 `interface.ts` / 组件内 `export interface`。

---

## 包：`loners-player`（播放器）

**导出：** [`VideoPlayer`](./packages/player/src/Video/index.tsx)、[`AudioPlayer`](./packages/player/src/Audio/index.tsx)。

### `VideoPlayer`

| 属性                  | 类型                                | 说明             |
| --------------------- | ----------------------------------- | ---------------- |
| `id`                  | `string`                            | 容器 id（必填）  |
| `sources`             | `PlayerSource` 或 `{ src, type }[]` | 播放源           |
| `options`             | `VideoJsPlayerOptions`              | video.js 配置    |
| `defaultVolume`       | `number`                            | 默认音量         |
| `defaultPlayBackRate` | `number`                            | 默认倍速         |
| `autoplay`            | `boolean`                           | 自动播放         |
| `poster`              | `string`                            | 海报             |
| `showQuality`         | `boolean`                           | 清晰度选择       |
| `showRotate`          | `boolean`                           | 旋转             |
| `showBackRate`        | `boolean`                           | 倍速 UI          |
| `needHotKeys`         | `boolean`                           | 快捷键           |
| `needPauseMeSmartly`  | `boolean`                           | 智能暂停相关     |
| `showDurationDisplay` | `boolean`                           | 时长展示         |
| `onInitialize`        | `(player: VideoJsPlayer) => void`   | 初始化完成后回调 |
| `onError`             | `() => void`                        | 错误回调         |

### `AudioPlayer`

| 属性        | 类型                         | 说明            |
| ----------- | ---------------------------- | --------------- |
| `id`        | `string`                     | 容器 id（必填） |
| `className` | `string`                     | 可选            |
| `sources`   | `PlayerSource`               | 多清晰度源      |
| `source`    | `PlayerSourceAttr`           | 单源            |
| `preload`   | `'auto' \| 'none' \| 'meta'` | 预加载策略      |

---

## 包：`loners-table`（表格）

当前 [`packages/table/src/index.ts`](./packages/table/src/index.ts) 仅为 `export default {}` 占位；依赖中包含 `@ant-design/pro-table`，具体封装以后续代码为准。

---

## 包：`loners-scripts`（工具方法）

默认导出对象 [`lonersScripts`](./packages/scripts/src/index.ts)，包含：

| 方法                          | 说明                                   |
| ----------------------------- | -------------------------------------- |
| `formatNumToThousands(num?)`  | 数字千分位格式化                       |
| `formatTime(seconds?, rule?)` | 时间格式化，默认 `YYYY-MM-DD HH:mm:ss` |
| `isMobile()`                  | 根据 UA 判断是否为常见移动设备         |

---

## 开发与文档

| 命令                            | 说明                                         |
| ------------------------------- | -------------------------------------------- |
| `yarn`                          | 安装依赖                                     |
| `yarn bdForm` / `yarn bdPlayer` | 按包构建（见根 `package.json`）              |
| `yarn storybook`                | 启动 Storybook（`loners-form` 下各组件演示） |
| `yarn build-storybook`          | 构建静态文档站点                             |

### Storybook 在线演示（GitHub Pages）

仓库已配置 [`.github/workflows/deploy-storybook.yml`](./.github/workflows/deploy-storybook.yml)：向 **`main`** 或 **`master`** 推送代码时会自动构建并部署 Storybook。

**首次启用步骤：**

1. 打开 GitHub 仓库 **Settings → Pages**。
2. **Build and deployment** 里将 **Source** 设为 **GitHub Actions**（不要选 “Deploy from a branch”）。
3. 在 **Actions** 中确认工作流成功；必要时可手动运行 **Deploy Storybook**。

**在线地址（以原仓库 `tangmuchw/loners` 为例，启用 Pages 并部署成功后）：**

**https://tangmuchw.github.io/loners/**

若使用你自己的 fork，请将路径中的用户名、仓库名换成你的 `https://<你的用户名>.github.io/<仓库名>/`。

表单包内更贴近代码的说明可参阅 [`packages/form/src/README.md`](./packages/form/src/README.md)。

---

## 注意事项

- 有 less 文件的需要使用命令生成 `*.less.d.ts` **（待优化）**

  - 即在对应包目录下执行（按实际 glob 调整路径）：

    ```bash
    tcm -p 'src/**/*.less' .
    ```

---

## Fork 的作者与仓库

本仓库由 **汤木先生（tangmuchw）** 创建。

- **作者：** tangmuchw &lt;tangmuchw@163.com&gt;
- **GitHub：** [https://github.com/tangmuchw](https://github.com/tangmuchw)
- **仓库：** [https://github.com/tangmuchw/loners](https://github.com/tangmuchw/loners)

---

MIT License · 为工作而生
