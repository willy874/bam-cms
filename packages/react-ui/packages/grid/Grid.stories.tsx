import { Grid } from './src/index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Grid',
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Grid />,
};
