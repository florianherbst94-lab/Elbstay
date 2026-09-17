import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hospitable-direct-mps': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { identifier?: string; type?: string; 'results-url'?: string };
      'hospitable-direct-property': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { identifier?: string; property?: string };
    }
  }
}
