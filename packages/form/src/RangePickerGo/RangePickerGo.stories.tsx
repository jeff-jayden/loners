import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import RangePickerGo from './index';

const meta: Meta<typeof RangePickerGo> = {
  title: 'Form/RangePickerGo',
  component: RangePickerGo,
  parameters: {
    docs: {
      description: {
        component:
          '基于 antd RangePicker（moment）的日期区间选择：默认中文占位「开始时间/结束时间」，并内置常用快捷范围（今天、当月、3/7/15/30 日等）。其余属性透传 RangePicker。',
      },
    },
  },
  argTypes: {
    style: { description: '容器 style。', control: false },
    disabled: { description: '是否禁用。', control: 'boolean' },
    allowClear: { description: '是否可清空。', control: 'boolean' },
    showTime: { description: '是否可选择时间。', control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof RangePickerGo>;

export const 基础用法: Story = {
  render: (args) => (
    <Form
      layout="vertical"
      style={{ maxWidth: 480 }}
      initialValues={{
        period: [moment().subtract(6, 'day').startOf('day'), moment().endOf('day')],
      }}
    >
      <Form.Item label="活动区间" name="period">
        <RangePickerGo {...args} onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {},
};

export const 含时间: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 560 }}>
      <Form.Item label="起止（含时间）" name="period2">
        <RangePickerGo {...args} showTime onChange={action('onChange')} />
      </Form.Item>
    </Form>
  ),
  args: {
    showTime: true,
  },
};
