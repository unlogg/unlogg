import { BaseCommentPlugin } from '@platejs/comment';

import { CommentLeafStatic } from '@unlogg/ui/components/comment-node-static';

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
];
