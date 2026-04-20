import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, Space } from 'antd';

import SelectGo from './index';

const baseOptions = [
  { label: '胖猫咪', value: 'fat_cat' },
  { label: '柯基', value: 'corgi' },
  { label: '金毛', value: 'golden' },
];

const meta: Meta<typeof SelectGo> = {
  title: 'Form/SelectGo',
  component: SelectGo,
  parameters: {
    docs: {
      description: {
        component:
          '基于 antd Select 的封装：支持 `options` 或 `valueEnum` 生成选项；可开启 `tooltip` 长文案省略提示、`showQA` 旁路问号说明、`fixedWidth` 固定短宽度；`mode=multiple` 时使用内部 `Multi` 组件并带「全选」项（值为 -99）。其余属性透传给 antd Select。',
      },
    },
  },
  argTypes: {
    valueEnum: {
      description:
        '用枚举生成 options（与 options 二选一）。支持 `Record<string, string | number>` 或 `Map`，内部会转成 `{ label, value }[]`。',
      control: 'object',
    },
    options: {
      description: '选项列表 `{ label, value }[]`。未传 valueEnum 时使用。',
      control: 'object',
    },
    showQA: {
      description:
        '是否在右侧显示问号帮助：`true` 无标题，或 `{ title: string }` 作为 Tooltip 内容。',
      control: false,
    },
    tooltip: {
      description:
        '为 `true` 时选项用 Tooltip 包一层（长文案省略）；也可传入 antd Tooltip 的 props 对象。',
      control: 'boolean',
    },
    fixedWidth: {
      description:
        '为 `true` 时按设计稿短宽度（`WIDTH_SIZE_ENUM.s`）限制 maxWidth；与 `showQA` 同时开启时会配合右侧间距样式。',
      control: 'boolean',
    },
    mode: {
      description:
        '`multiple` 时走多选分支：选项前会插入「全选」（value=-99），并自定义 onChange 处理全选/取消逻辑。',
      control: false,
    },
    placeholder: { description: '占位符，默认「请选择」。', control: 'text' },
    allowClear: { description: '是否显示清除按钮，默认 `true`。', control: 'boolean' },
    disabled: { description: '是否禁用（透传 antd）。', control: 'boolean' },
    style: {
      description: '外层包裹 div 内 Select 的 style；`fixedWidth` 时会与内部 maxWidth 合并。',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectGo>;

export const 基础用法_options: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 360 }}>
      <Form.Item label="喜欢的动物">
        <SelectGo {...args} options={baseOptions} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {
    placeholder: '请选择',
    allowClear: true,
  },
};

export const valueEnum_映射: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 360 }}>
      <Form.Item label="状态（valueEnum）">
        <SelectGo
          {...args}
          valueEnum={{
            draft: '草稿',
            published: '已发布',
            archived: '已归档',
          }}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 固定宽度与QA: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 420 }}>
      <Form.Item label="短字段（fixedWidth + showQA）">
        <SelectGo
          {...args}
          options={baseOptions}
          fixedWidth
          showQA={{ title: '用于短标签、ID 等场景，宽度与设计规范一致。' }}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 选项内Tooltip长文案: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 420 }}>
      <Form.Item label="悬停看完整文案">
        <SelectGo
          {...args}
          tooltip
          options={[
            { label: '这是一段非常长的选项文案用于演示省略与 Tooltip', value: 'long_1' },
            { label: '另一段很长很长很长的说明文字', value: 'long_2' },
          ]}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 多选与全选: Story = {
  render: (args) => (
    <Space direction="vertical" style={{ width: '100%', maxWidth: 420 }}>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        多选模式下会插入「全选」项；选全选会选中除 -99 外全部 value；再次操作会走内部逻辑（见源码
        Multi）。
      </p>
      <Form layout="vertical">
        <Form.Item label="多选">
          <SelectGo {...args} mode="multiple" options={baseOptions} onChange={action('onChange')} />
        </Form.Item>
      </Form>
    </Space>
  ),
  args: {
    mode: 'multiple',
  },
};
