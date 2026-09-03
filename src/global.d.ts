import * as React from 'react';

type ModelViewerElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    poster?: string;
    'auto-rotate'?: boolean | string;
    'camera-controls'?: boolean | string;
    'power-preference'?: string;
    'render-scale'?: string;
    'shadow-intensity'?: string;
    'shadow-softness'?: string;
    exposure?: string;
    'interaction-prompt'?: string;
    loading?: string;
    autoplay?: boolean | string;
    [key: string]: any;
  },
  HTMLElement
>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerElement;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerElement;
    }
  }
}

export {};