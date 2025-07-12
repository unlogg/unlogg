'use client';

import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@unlogg/ui/components/link-node';
import { LinkFloatingToolbar } from '@unlogg/ui/components/link-toolbar';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
