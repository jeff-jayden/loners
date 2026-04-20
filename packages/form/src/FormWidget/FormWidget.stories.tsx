import React, { useMemo, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Space, Tag } from 'antd';
import type { FormInstance } from 'antd';

import FormWidget from './index';
import type { FormWidgetProps } from './interface';

const meta: Meta<typeof FormWidget> = {
  title: 'Form/FormWidget',
  component: FormWidget,
  parameters: {
    docs: {
      description: {
        component:
          '业务型 Form 容器：基于 antd Form，支持通过 items（FormTool 配置）快速渲染表单，并提供 clearRules 做联动清空；也可通过 formRef 暴露内部 FormInstance。',
      },
    },
  },
  argTypes: {
    items: {
      description:
        '表单项配置（同 FormTool 的 items）。传入后会自动渲染 FormTool；你也可以不传 items，改用 children 自己写 Form.Item。',
      control: false,
    },
    clearRules: {
      description:
        '联动清空规则：当 changedName 字段变化时，把 clearedName 对应字段的值重置为 undefined。支持 string / string[]。',
      control: false,
    },
    formRef: {
      description: '用于拿到内部 FormInstance 的 ref（可选）。',
      control: false,
    },
    formToolProps: {
      description:
        '透传给内部 FormTool 的 props（不包含 items），例如 className / gutter / action 等。',
      control: false,
    },
    initialValues: {
      description: '表单初始值（透传给 antd Form）。',
      control: 'object',
    },
    onFinish: {
      description: '表单提交回调（内部做了 300ms throttle）。',
      control: false,
    },
    children: {
      description: '表单内 children（会渲染在 items 对应的 FormTool 之后）。',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormWidget>;

function DemoForm(args: FormWidgetProps & { showRefPanel?: boolean }) {
  const formRef = useRef<FormInstance>(null as any);

  const items = useMemo<FormWidgetProps['items']>(
    () => [
      { type: 'InputText', label: '关键词', name: 'keyword', colProps: { span: 12 } },
      {
        type: 'SimpleSelect',
        label: '类型',
        name: 'type',
        colProps: { span: 12 },
        fieldProps: {
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
          ],
        },
      },
      {
        type: 'InputNumber',
        label: '数量',
        name: 'count',
        colProps: { span: 12 },
        fieldProps: { min: 0, precision: 0, style: { width: '100%' } },
      },
      {
        type: 'Switch',
        label: '启用高级',
        name: 'advanced',
        colProps: { span: 12 },
      },
      {
        type: 'InputText',
        label: '高级字段',
        name: 'advanced_value',
        colProps: { span: 24 },
        show: (fm) => !!fm.getFieldValue('advanced'),
      },
    ],
    [],
  );

  const clearRules = useMemo<FormWidgetProps['clearRules']>(
    () => [
      // 关闭高级时，清空高级字段
      { changedName: 'advanced', clearedName: 'advanced_value' },
      // 类型变化时，清空数量
      { changedName: 'type', clearedName: 'count' },
    ],
    [],
  );

  return (
    <div>
      <FormWidget
        {...args}
        items={items}
        clearRules={clearRules}
        formRef={formRef}
        onFinish={action('onFinish')}
      >
        <div style={{ marginTop: 12 }}>
          <Space>
            <Button onClick={() => formRef.current?.resetFields()}>resetFields()</Button>
            <Button
              onClick={() => {
                const v = formRef.current?.getFieldsValue(true);
                action('getFieldsValue')(v);
              }}
            >
              getFieldsValue()
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </div>
      </FormWidget>

      {args.showRefPanel && (
        <div style={{ marginTop: 16 }}>
          <Tag>提示：切换「启用高级」会触发 clearRules 清空高级字段</Tag>
        </div>
      )}
    </div>
  );
}

export const 基础用法_含联动清空: Story = {
  render: (args) => <DemoForm {...(args as any)} />,
  args: {
    initialValues: { keyword: 'demo', type: 'A', count: 1, advanced: false },
    showRefPanel: true,
    formToolProps: { gutter: { xs: 8, sm: 16, md: 24, lg: 32 } },
  } as any,
};
