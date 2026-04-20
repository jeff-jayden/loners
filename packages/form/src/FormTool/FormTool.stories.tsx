import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, Button, Space, Tag } from 'antd';
import type { FormInstance } from 'antd';

import FormTool from './index';
import type { FormToolProps } from './interface';

const meta: Meta<typeof FormTool> = {
  title: 'Form/FormTool',
  component: FormTool,
  parameters: {
    docs: {
      description: {
        component:
          'FormItem 配置化渲染工具：通过 items 描述表单项（type/label/name/fieldProps 等），支持 show 动态显隐、readonly 文本渲染、以及 Customize 自定义渲染。',
      },
    },
  },
  argTypes: {
    action: {
      description:
        "表单模式：'edit' | 'add' | 'readonly'。readonly 下默认禁用表单项；若某 item 配了 renderText，会用 renderText 输出只读文本。",
      control: { type: 'radio' },
      options: ['edit', 'add', 'readonly'],
    },
    items: {
      description:
        '表单项配置数组（核心参数）。每一项支持：type（控件类型）、name/label/rules（同 antd Form.Item）、fieldProps（透传到具体控件）、show(fm, action) 动态显隐、disabled(action) 动态禁用、Customize 自定义渲染等。',
      control: false,
    },
    className: {
      description: 'Row 容器的 className。',
      control: 'text',
    },
    children: {
      description: 'Row 内额外插入的 children（可选）。',
      control: false,
    },
    gutter: {
      description: 'Row 的栅格间距（透传给 antd Row）。',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormTool>;

const demoItems: FormToolProps['items'] = [
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
    // 演示 show：只有选择了性别后才出现
    show: (fm: FormInstance) => !!fm.getFieldValue('sex'),
    fieldProps: {
      options: [
        { label: '胖猫咪', value: 'fat_cat' },
        { label: '柯基', value: 'corgi' },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '年龄',
    name: 'age',
    colProps: { span: 12 },
    // 演示 disabled：add 模式不可编辑
    disabled: (act) => act === 'add',
    fieldProps: { min: 0, max: 120, precision: 0, style: { width: '100%' } },
  },
  {
    type: 'Customize',
    label: '自定义渲染',
    name: 'custom',
    colProps: { span: 24 },
    renderFormItem: () => (
      <Space>
        <Tag color="blue">Customize</Tag>
        <Button onClick={action('custom-button-click')}>点我</Button>
      </Space>
    ),
    // readonly 下会用 renderText 展示
    renderText: (text) => <Tag color="green">readonly: {String(text ?? '-')}</Tag>,
  },
];

function DemoForm(props: FormToolProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{
        name: '汤木',
        sex: 'man',
        favorite_animals: 'fat_cat',
        age: 18,
        custom: 'x',
      }}
      onFinish={action('onFinish')}
    >
      <FormTool {...props} />
      <Form.Item style={{ marginTop: 16 }}>
        <Space>
          <Button onClick={() => form.resetFields()}>重置</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export const 编辑模式: Story = {
  render: (args) => <DemoForm {...args} />,
  args: {
    action: 'edit',
    items: demoItems,
  },
};

export const 新增模式_演示禁用年龄: Story = {
  render: (args) => <DemoForm {...args} />,
  args: {
    action: 'add',
    items: demoItems,
  },
};

export const 只读模式_演示renderText: Story = {
  render: (args) => <DemoForm {...args} />,
  args: {
    action: 'readonly',
    items: demoItems,
  },
};
