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
  render: () => (
    <Grid>
      <Grid span={6} />
      <Grid sm={{ span: 1 }} />
      <Grid md={{ span: 2 }} />
      <Grid lg={{ span: 3 }} />
      <Grid xl={{ span: 4 }} />
      <Grid xxl={{ span: 5 }} />
      <Grid span={12} />
      <Grid shrink={1} />
      <Grid grow={2} />
      <Grid offset={3} />
      <Grid direction={'column'} />
      <Grid wrap={'wrap'} />
      <Grid justify={'center'} />
      <Grid align={'center'} />
    </Grid>
  ),
};
