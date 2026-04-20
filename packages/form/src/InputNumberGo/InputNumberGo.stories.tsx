import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import InputNumberGo from './index';

const meta: Meta<typeof InputNumberGo> = {
  title: 'Form/InputNumberGo',
  component: InputNumberGo,
  parameters: {
    docs: {
      description: {
        component:
          '对 antd InputNumber 的轻量封装：`fixedWidth` 为 true 时设置固定宽度（`WIDTH_SIZE_ENUM.s`）。其余透传 antd InputNumber。',
      },
    },
  },
  argTypes: {
    fixedWidth: {
      description: '为 true 时使用标准短宽度。',
      control: 'boolean',
    },
    placeholder: { description: '占位符，默认「请输入」。', control: 'text' },
    min: { description: '最小值。', control: 'number' },
    max: { description: '最大值。', control: 'number' },
    precision: { description: '精度。', control: 'number' },
    disabled: { description: '是否禁用。', control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof InputNumberGo>;

export const 基础用法: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 360 }}>
      <Form.Item label="数量" name="count">
        <InputNumberGo {...args} style={{ width: '100%' }} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {
    min: 0,
    max: 999,
    precision: 0,
  },
};

export const 固定宽度: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 360 }}>
      <Form.Item label="金额">
        <InputNumberGo {...args} fixedWidth onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {
    min: 0,
    precision: 2,
  },
};
