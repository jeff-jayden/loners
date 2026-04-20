import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import SwitchGo from './index';

const meta: Meta<typeof SwitchGo> = {
  title: 'Form/SwitchGo',
  component: SwitchGo,
  parameters: {
    docs: {
      description: {
        component:
          '对 antd Switch 的封装：可选 `showQA` 在开关旁展示问号说明。其余属性透传 antd Switch。',
      },
    },
  },
  argTypes: {
    showQA: {
      description: '`boolean | { title: string }`。',
      control: false,
    },
    checked: { description: '是否选中（受控时需配合 onChange）。', control: 'boolean' },
    disabled: { description: '是否禁用。', control: 'boolean' },
    checkedChildren: { description: '选中时内容。', control: 'text' },
    unCheckedChildren: { description: '未选中时内容。', control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof SwitchGo>;

export const 基础用法: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 400 }}>
      <Form.Item label="启用" name="enabled" valuePropName="checked" initialValue={true}>
        <SwitchGo {...args} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {
    checkedChildren: '开',
    unCheckedChildren: '关',
  },
};

export const 带QA说明: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 400 }}>
      <Form.Item label="高级模式" valuePropName="checked">
        <SwitchGo
          {...args}
          showQA={{ title: '开启后将展示更多配置项。' }}
          onChange={action('onChange')}
        />
      </Form.Item>
    </Form>
  ),
  args: {},
};
