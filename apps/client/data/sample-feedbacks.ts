import { FeedbackCardProps } from "@/components/feedbacks/feedback-card";

export const sampleFeedbacks: FeedbackCardProps[] = [
  {
    id: "1",
    title: "A Great Product",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    username: "mnove",
    userAvatar: "https://github.com/mnove.png",
    upvotes: 150,
    comments: 9,
    productTags: ["Product A", "Product B"],
    createdAt: "1 week ago",
  },
  {
    id: "2",
    title: "Feature Request: Dark Mode",
    description:
      "It would be great to have a dark mode option for the application. Many users prefer dark themes, especially when working in low-light environments.",
    username: "darkmode_lover",
    userAvatar: "https://github.com/darkmode_lover.png",
    upvotes: 89,
    comments: 15,
    productTags: ["UI/UX", "Accessibility"],
    createdAt: "3 days ago",
  },
  {
    id: "3",
    title: "Bug: Login Form Validation",
    description:
      "The login form doesn't properly validate email addresses. It accepts invalid formats and doesn't show appropriate error messages.",
    username: "bug_hunter",
    userAvatar: "https://github.com/bug_hunter.png",
    upvotes: 45,
    comments: 7,
    productTags: ["Bug", "Authentication"],
    createdAt: "2 days ago",
  },
  {
    id: "4",
    title: "Performance Improvement Needed",
    description:
      "The application loads slowly on mobile devices. Page transitions take too long and the initial load time is over 3 seconds.",
    username: "speed_demon",
    userAvatar: "https://github.com/speed_demon.png",
    upvotes: 67,
    comments: 12,
    productTags: ["Performance", "Mobile"],
    createdAt: "5 days ago",
  },
  {
    id: "5",
    title: "Export Data Feature",
    description:
      "Users should be able to export their data in multiple formats (CSV, JSON, PDF). This is important for data portability and compliance.",
    username: "data_analyst",
    userAvatar: "https://github.com/data_analyst.png",
    upvotes: 134,
    comments: 23,
    productTags: ["Feature", "Data Export"],
    createdAt: "1 week ago",
  },
];
