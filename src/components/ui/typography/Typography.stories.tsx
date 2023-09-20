import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  render: () => (
    <Typography color={'dark'} variant={'h1'}>
      Hello world!
    </Typography>
  ),
}

export const H2: Story = {
  render: () => (
    <Typography color={'dark'} variant={'h2'}>
      Hello world!
    </Typography>
  ),
}

export const H3: Story = {
  render: () => (
    <Typography color={'dark'} variant={'h3'}>
      Hello world!
    </Typography>
  ),
}

export const Body1: Story = {
  render: () => (
    <Typography color={'dark'} variant={'body1'}>
      Hello world!
    </Typography>
  ),
}

export const Body2: Story = {
  render: () => (
    <Typography color={'dark'} variant={'body2'}>
      Hello world!
    </Typography>
  ),
}

export const Subtitle1: Story = {
  render: () => (
    <Typography color={'dark'} variant={'subtitle1'}>
      Hello world!
    </Typography>
  ),
}

export const Subtitle2: Story = {
  render: () => (
    <Typography color={'dark'} variant={'subtitle2'}>
      Hello world!
    </Typography>
  ),
}

export const Link1: Story = {
  render: () => (
    <Typography htmlTag={'a'} variant={'link1'}>
      Hello world!
    </Typography>
  ),
}

export const Link2: Story = {
  render: () => (
    <Typography htmlTag={'a'} variant={'link2'}>
      Hello world!
    </Typography>
  ),
}

export const Overline: Story = {
  render: () => (
    <Typography color={'dark'} variant={'overline'}>
      Hello world!
    </Typography>
  ),
}

export const Large: Story = {
  render: () => (
    <Typography color={'dark'} variant={'large'}>
      Hello world!
    </Typography>
  ),
}

export const Caption: Story = {
  render: () => (
    <Typography color={'dark'} variant={'caption'}>
      Hello world!
    </Typography>
  ),
}
