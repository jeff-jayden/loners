import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import QA from './index';

const meta: Meta<typeof QA> = {
  title: 'Form/QA',
  component: QA,
  parameters: {
    docs: {
      description: {
        component:
          '表单项旁的问号图标，悬停通过 antd Tooltip 展示说明文案。通常由 InputGo / SelectGo / TextareaGo 等通过 `showQA` 间接渲染，也可单独使用。',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Tooltip 内容（支持 ReactNode）。',
      control: 'text',
    },
    className: {
      description: '外层容器 className，用于与表单项布局对齐。',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof QA>;

export const 默认: Story = {
  args: {
    title: '这是一段帮助说明，可解释字段含义或填写规则。',
    className: undefined,
  },
};

export const 无标题: Story = {
  args: {
    title: '',
  },
};
