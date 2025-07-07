import { FeedbackItemContent } from "./feedback-item-content";
import {
  FeedbackItemHeader,
  FeedbackItemHeaderInModal,
} from "./feedback-item-header";

export type FeedbackItem = {
  id: string;
  title: string;
  description: string;
  username: string;
  userAvatar: string;
  upvotes: number;
  comments: number;
  productTags: string[];
  createdAt: string;
  status?: "open" | "closed" | "in-progress";
  handleClose?: () => void;
  isModal?: boolean;
};

export const FeedbackItem = ({
  id,
  title,
  description,
  username,
  userAvatar,
  upvotes = 0,
  comments = 0,
  productTags = [],
  createdAt = "1 week ago",
  status = "open",
  handleClose,
  isModal = false,
}: FeedbackItem) => {
  return (
    <div>
      {isModal ? (
        <FeedbackItemHeaderInModal
          id={id}
          title={title}
          handleClose={handleClose}
        />
      ) : (
        <FeedbackItemHeader id={id} title={title} />
      )}

      <FeedbackItemContent
        id={id}
        title={title}
        description={description}
        username={username}
        userAvatar={userAvatar}
        upvotes={upvotes}
        comments={comments}
        productTags={productTags}
        createdAt={createdAt}
        status={status}
      />
    </div>
  );
};
