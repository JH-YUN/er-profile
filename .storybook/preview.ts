import type { Preview } from '@storybook/react'
import '../styles/globals.css'
import * as NextImage from "next/image";

NextImage.defaultProps = {
  unoptimized: true,
};

const customViewports = {
  sm: { name: 'sm', styles: { width: '640px', height: '100%' } },
  md: { name: 'md', styles: { width: '768px', height: '100%' } },
  lg: { name: 'lg', styles: { width: '1024px', height: '100%' } },
  xl: { name: 'xl', styles: { width: '1280px', height: '100%' } },
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewport: { viewports: customViewports },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
