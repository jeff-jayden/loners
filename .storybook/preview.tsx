import type { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default preview;
