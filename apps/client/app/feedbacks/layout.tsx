import { ReactNode } from "react";

export default function FeedbackLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl relative">
      {children}
      {modal}
    </div>
  );
}
