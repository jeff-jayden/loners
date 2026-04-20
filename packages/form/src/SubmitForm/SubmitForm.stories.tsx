import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Space } from 'antd';
import type { FormInstance } from 'antd';

import SubmitForm from './index';
import type { SubmitFormProps } from './interface';

const meta: Meta<typeof SubmitForm> = {
  title: 'Form/SubmitForm',
  component: SubmitForm,
  parameters: {
    docs: {
      description: {
        component:
          '提交表单组件：以分组（groups）组织 FormItem 配置，底部默认提供「返回 / 提交」按钮；当 action=readonly 时隐藏提交按钮并进入只读展示模式。',
      },
    },
  },
  argTypes: {
    className: {
      description: '外层 Card 的额外 className（会与组件内置 class 合并）。',
      control: 'text',
    },
    action: {
      description:
        '表单模式：edit=编辑、add=新增、readonly=只读。readonly 会让表单项 disabled，并隐藏底部「提交」按钮。',
      control: { type: 'radio' },
      options: ['edit', 'add', 'readonly'],
    },
    groups: {
      description:
        '表单分组配置（必填）。每个分组包含 title 与 items；也可通过 show(fm, action) + shouldUpdate 实现“动态显示/隐藏分组”。',
      control: false,
    },
    onFinish: {
      description: '点击「提交」或触发表单提交时回调，入参为表单 values。',
      control: false,
    },
    footerRender: {
      description:
        '自定义底部区域渲染。传入后会完全替换默认的「返回 / 提交」按钮区域（例如接入保存草稿、额外操作等）。',
      control: false,
    },
    // 其余从 FormWidget 透传的 antd Form props（如 initialValues / layout / labelCol 等）
    initialValues: {
      description: '表单初始值（透传给 antd Form）。',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SubmitForm>;

const demoGroups: SubmitFormProps['groups'] = [
  {
    title: '基础信息',
    items: [
      {
        type: 'InputText',
        label: '姓名',
        name: 'name',
        rules: [{ required: true, message: '请输入姓名' }],
        colProps: { span: 12 },
      },
      {
        type: 'RadioGroup',
        label: '性别',
        name: 'sex',
        colProps: { span: 12 },
        rules: [{ required: true, message: '请选择性别' }],
        fieldProps: {
          options: [
            { label: '男', value: 'man' },
            { label: '女', value: 'woman' },
          ],
        },
      },
      {
        type: 'SimpleSelect',
        label: '喜欢的动物',
        name: 'favorite_animals',
        colProps: { span: 12 },
        fieldProps: {
          options: [
            { label: '胖猫咪', value: 'fat_cat' },
            { label: '柯基', value: 'corgi' },
            { label: '金毛', value: 'golden' },
          ],
        },
      },
      {
        type: 'RangePicker',
        label: '活动区间',
        name: 'active_range',
        colProps: { span: 12 },
      },
      {
        type: 'Textarea',
        label: '备注',
        name: 'remark',
        colProps: { span: 24 },
        fieldProps: { showCount: true, maxLength: 100 },
      },
    ],
  },
  {
    title: '仅女性可见分组（演示 show + shouldUpdate）',
    shouldUpdate: (prev, next) => prev?.sex !== next?.sex,
    show: (fm: FormInstance) => fm.getFieldValue('sex') === 'woman',
    items: [
      {
        type: 'InputNumber',
        label: '年龄',
        name: 'age',
        colProps: { span: 12 },
        fieldProps: { min: 0, max: 120, precision: 0, style: { width: '100%' } },
      },
      {
        type: 'Switch',
        label: '是否订阅',
        name: 'subscribed',
        colProps: { span: 12 },
      },
    ],
  },
];

export const 编辑模式: Story = {
  args: {
    action: 'edit',
    groups: demoGroups,
    initialValues: {
      name: '汤木',
      sex: 'man',
      favorite_animals: 'fat_cat',
      subscribed: true,
    },
    onFinish: action('onFinish'),
  },
};

export const 只读模式: Story = {
  args: {
    action: 'readonly',
    groups: demoGroups,
    initialValues: {
      name: '只读用户',
      sex: 'woman',
      favorite_animals: 'corgi',
      age: 18,
      subscribed: false,
      remark: 'readonly 下会禁用表单项并隐藏提交按钮',
    },
    onFinish: action('onFinish'),
  },
};

export const 自定义底部: Story = {
  args: {
    action: 'add',
    groups: demoGroups,
    initialValues: { sex: 'woman' },
    onFinish: action('onFinish'),
    footerRender: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Space>
          <Button onClick={action('click-cancel')}>取消</Button>
          <Button type="primary" onClick={action('click-save-draft')}>
            保存草稿
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </div>
    ),
  },
};
