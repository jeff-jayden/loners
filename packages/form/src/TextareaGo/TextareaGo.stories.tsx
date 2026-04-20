import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import TextareaGo from './index';

const meta: Meta<typeof TextareaGo> = {
  title: 'Form/TextareaGo',
  component: TextareaGo,
  parameters: {
    docs: {
      description: {
        component:
          '对 antd Input.TextArea 的封装：默认 `showCount`、`maxLength=300`、`allowClear`、`autoSize` 行数范围；支持 `fixedWidth` 与 `showQA`（问号在文本域侧方）。',
      },
    },
  },
  argTypes: {
    fixedWidth: {
      description: '为 true 时宽度限制为 `WIDTH_SIZE_ENUM.s`。',
      control: 'boolean',
    },
    showQA: {
      description: '右侧问号说明，使用 `textarea-qa` 定位样式。',
      control: false,
    },
    showCount: { description: '是否显示字数，默认 true。', control: 'boolean' },
    maxLength: { description: '最大字数，默认 300。', control: 'number' },
    allowClear: { description: '是否可清空，默认 true。', control: 'boolean' },
    placeholder: { description: '占位符，默认「请输入」。', control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TextareaGo>;

export const 默认配置: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 520 }}>
      <Form.Item label="备注">
        <TextareaGo {...args} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 固定宽度与QA: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 520 }}>
      <Form.Item label="说明">
        <TextareaGo
          {...args}
          fixedWidth
          showQA={{ title: '多行说明，字数受 maxLength 限制。' }}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {
    maxLength: 200,
  },
};
