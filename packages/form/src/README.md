[toc]

## FormTool

> FormItem 的配置化工具

### FormTool Props 参数说明

- **action**: 表单模式，`'edit' | 'add' | 'readonly'`。`readonly` 下默认禁用表单项；若某 item 配了 `renderText`，会用 `renderText(text, record, fm)` 渲染只读展示。
- **items**: 表单项配置数组（核心参数）。每项为 `FormToolItem`，常用字段：
  - **type**: 控件类型，如 `InputText / SimpleSelect / RadioGroup / RangePicker / InputNumber / Switch / InputLoading / Textarea / Customize`。
  - **name/label/rules/...**: 透传给 `antd Form.Item` 的常用配置。
  - **fieldProps**: 透传给具体控件的 props（如 options、placeholder、maxLength 等）。
  - **show**: `boolean | (fm, action) => boolean`，用于控制该表单项是否显示。
  - **disabled**: `(action) => boolean`，用于按模式动态禁用（`readonly` 也会默认禁用）。
  - **colProps**: 栅格布局参数（透传给 `antd Col`）。
  - **renderFormItem / render / renderText**: 仅 `type=Customize` 生效，用于完全自定义渲染（以及只读文本渲染）。
- **其他参数**: 其余属性会透传给外层 `antd Row`（例如 `gutter`、`justify`、`align` 等）。

## FormWidget

> 可传入 items 到达表单配置化，类似 table 的 columns

- 新增 clearRules，表单项里的各项可以根据指定清除规则来达到清空 value 的功能

### FormWidget Props 参数说明

- **items**: 表单项配置（同 `FormTool` 的 `items`）。传入后会自动渲染 `FormTool`。
- **formToolProps**: 透传给内部 `FormTool` 的 props（不包含 items），例如 `action / className / gutter` 等。
- **clearRules**: 联动清空规则数组。当 `changedName` 字段变化时，把 `clearedName` 对应字段值重置为 `undefined`。支持 `string | string[]`。
- **formRef**: 用于拿到内部 `FormInstance` 的 ref（可选）。
- **其他参数**: 其余属性会透传给内部 `antd Form`（例如 `initialValues`、`layout`、`labelCol`、`wrapperCol` 等）。

## SelectGo

> `FormTool` 中 `type: SimpleSelect` 时使用的下拉封装

### SelectGo Props 参数说明

- **options**: `{ label, value }[]`，与 **valueEnum** 二选一。
- **valueEnum**: `Record` 或 `Map`，键为 value、值为展示 label，内部会转为 options。
- **showQA**: `boolean | { title: string }`，右侧问号提示；`true` 时无标题文案。
- **tooltip**: `boolean` 或 antd Tooltip props；为 true 时选项文案过长可省略，悬停看完整内容。
- **fixedWidth**: `boolean`，为 true 时使用较短固定 maxWidth（短字段场景）。
- **mode**: `multiple` 时使用 `Multi` 子组件：选项前增加「全选」（value 为 `-99`），并自定义全选/取消逻辑。
- **其余属性**: 透传 antd `Select`（如 `placeholder` 默认「请选择」、`allowClear` 默认 true、`disabled` 等）。

## 表单项子组件（Storybook）

根目录执行 `yarn storybook`，在侧边栏 **Form** 下可查看下列演示（各目录均有 `*.stories.tsx`，Docs 面板含参数说明）：

| 组件           | Story 标题            | 说明                         |
| -------------- | --------------------- | ---------------------------- |
| QA             | `Form/QA`             | 问号 Tooltip                 |
| InputGo        | `Form/InputGo`        | 输入框 + fixedWidth + showQA |
| InputNumberGo  | `Form/InputNumberGo`  | 数字输入 + fixedWidth        |
| TextareaGo     | `Form/TextareaGo`     | 多行 + 默认字数与 autoSize   |
| SwitchGo       | `Form/SwitchGo`       | 开关 + showQA                |
| RangePickerGo  | `Form/RangePickerGo`  | 日期区间 + 快捷 ranges       |
| InputLoadingGo | `Form/InputLoadingGo` | 聚焦请求 + 加载态 + tips     |
| SelectGo       | `Form/SelectGo`       | 下拉（见上文 SelectGo 节）   |
| FormTool       | `Form/FormTool`       | items 配置化                 |
| FormWidget     | `Form/FormWidget`     | Form + clearRules            |
| SubmitForm     | `Form/SubmitForm`     | 分组提交表单                 |

### InputGo / InputNumberGo / TextareaGo / SwitchGo

- **fixedWidth**（InputGo、InputNumberGo、TextareaGo）：为 true 时使用 `WIDTH_SIZE_ENUM.s` 限制宽度。
- **showQA**（InputGo、TextareaGo、SwitchGo 等）：`boolean \| { title: string }`，右侧问号说明。
- 其余字段分别透传对应 antd 组件（Input / InputNumber / TextArea / Switch）。

### RangePickerGo

- 基于 **moment** 的 `RangePicker`，内置快捷范围（今天、当月、3/7/15/30 日等），默认占位「开始时间 / 结束时间」。

### InputLoadingGo

- **request**：`fetchFunc`（异步）、`formatResult`（结果展开到内部 `InputNumberGo`）、`formatParams`（用 `fm.getFieldsValue()` 组装参数）、`formatTips`、`loadingText`。
- **fm**：可选，传入后 focus 时可根据整表字段请求建议值。

## SubmitForm

> 提交表单，底部默认配置「返回」与「提交」按钮

### SubmitForm Props 参数说明

- **action**: 表单模式，`'edit' | 'add' | 'readonly'`。`readonly` 会让表单项进入只读（disabled）并隐藏底部「提交」按钮。
- **groups**: 表单分组配置（必填）。每个分组包含：
  - **title**: 分组标题（可选）。
  - **items**: 该分组内的表单项配置（同 `FormTool` 的 `items`）。
  - **show**: `(fm, action) => boolean`，用于控制整个分组是否展示。与 `shouldUpdate` 搭配可实现“依赖表单值动态显隐”。
  - **shouldUpdate**: 传给 `Form.Item` 的 `shouldUpdate`，用于在依赖字段变化时触发重新计算 `show`。
- **footerRender**: 自定义底部渲染（可选）。传入后会完全替换默认的「返回 / 提交」区域。
- **onFinish**: 提交回调（可选），入参为表单 values。
- **其他参数**: 其余属性会透传给内部的 `FormWidget` / `antd Form`（例如 `initialValues`、`layout`、`labelCol` 等）。

## 常用的 items 配置

> 详见 [FormToolItem Interface](./FormTool/interface.ts)

```JavaScript
 const items = [
     {
         type: 'InputText',
         label: '姓名',
         name: 'name',
     },
     {
         type: 'RadioGroup',
         label: '性别',
         name: 'sex',
         fieldProps: {
             options: [
                 {
                     label: '男',
                     value: 'man',
                 },
                 {
                     label: '女',
                     value: 'woman'
                 }
             ],
         },
     },
     {
         type: 'SimpleSelect',
         label: '喜欢的动物',
         name: 'favorite_animals',
          fieldProps: {
             options: [
                 {
                     label: '胖猫咪',
                     value: 'fat_cat',
                 },
                 {
                     label: '柯基',
                     value: 'corgi'
                 }
             ],
         },
     },
 ]

```
