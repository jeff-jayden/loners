import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'antd';

import InputLoadingGo from './index';

const meta: Meta<typeof InputLoadingGo> = {
  title: 'Form/InputLoadingGo',
  component: InputLoadingGo,
  parameters: {
    docs: {
      description: {
        component:
          '在 InputNumberGo 基础上增加「聚焦拉取」能力：`request.fetchFunc` 由 ahooks `useRequest` 执行（manual），聚焦时根据 `fm.getFieldsValue()` 经 `formatParams` 传参；成功后 `formatResult` 结果会展开到内部 InputNumberGo，`formatTips` 展示提示文案；加载中显示 Spin 与 `loadingText`。也可传 `showQA` 在无提示时显示问号。',
      },
    },
  },
  argTypes: {
    fm: {
      description: 'antd FormInstance，用于 focus 时组装请求参数（与 Form.Item 一起使用）。',
      control: false,
    },
    request: {
      description:
        'fetchFunc：异步请求函数；formatResult：映射为 InputNumber 的 props；formatParams：从表单取值转请求参数；formatTips：提示文案；loadingText：加载中文案。',
      control: false,
    },
    showQA: { description: '无 tips 且非 loading 时可显示问号。', control: false },
    placeholder: { description: '透传 InputNumberGo。', control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof InputLoadingGo>;

const mockRequest = {
  fetchFunc: async () => {
    await new Promise<void>((r) => {
      setTimeout(r, 700);
    });
    return { payload: { value: 42 } };
  },
  formatResult: (res: { payload?: { value: number } }) => ({ value: res?.payload?.value ?? 0 }),
  formatParams: (data: Record<string, unknown>) => data,
  formatTips: () => '已根据服务端返回填充数值',
  loadingText: '正在查询中…',
};

export const 聚焦拉取数值: Story = {
  render: (args) => {
    const [form] = Form.useForm();
    return (
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 420 }}
        initialValues={{ refId: 'demo-001' }}
      >
        <Form.Item label="关联 ID" name="refId">
          <span className="ant-form-text">聚焦下方输入框将触发请求</span>
        </Form.Item>
        <Form.Item label="数量（InputLoadingGo）" name="amount">
          <InputLoadingGo {...args} fm={form} request={mockRequest} onChange={action('onChange')} />
        </Form.Item>
      </Form>
    );
  },
  args: {
    min: 0,
    precision: 0,
    placeholder: '聚焦以加载建议值',
  },
};

export const 仅展示QA无请求: Story = {
  render: (args) => (
    <Form layout="vertical" style={{ maxWidth: 360 }}>
      <Form.Item label="数值">
        <InputLoadingGo {...args} showQA={{ title: '未触发请求时显示问号说明。' }} />
      </Form.Item>
    </Form>
  ),
  args: {
    placeholder: '0',
  },
};
