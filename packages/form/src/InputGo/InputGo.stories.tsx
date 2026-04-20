import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import InputGo from './index';

const meta: Meta<typeof InputGo> = {
  title: 'Form/InputGo',
  component: InputGo,
  parameters: {
    docs: {
      description: {
        component:
          '对 antd Input 的轻量封装：支持 `fixedWidth` 短宽度、`showQA` 右侧问号；默认 placeholder 为「请输入」。其余属性透传给 antd Input。',
      },
    },
  },
  argTypes: {
    fixedWidth: {
      description: '为 true 时使用较短 maxWidth（`WIDTH_SIZE_ENUM.s`），适合短文本。',
      control: 'boolean',
    },
    showQA: {
      description:
        '`boolean | { title: string }`，为 true 时问号无文案，对象形式可传 Tooltip 标题。',
      control: false,
    },
    placeholder: { description: '占位符，默认「请输入」。', control: 'text' },
    disabled: { description: '是否禁用。', control: 'boolean' },
    maxLength: { description: '最大长度（透传 antd）。', control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof InputGo>;

export const 基础用法: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 400 }}>
      <Form.Item label="姓名">
        <InputGo {...args} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 固定宽度与QA: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 440 }}>
      <Form.Item label="短字段">
        <InputGo
          {...args}
          fixedWidth
          showQA={{ title: '与业务规范一致的短输入宽度。' }}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {},
};
