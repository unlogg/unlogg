import { TextLoop } from "@unlogg/ui/components/text-loop";

export function ValueSection() {
  return (
    <section className="mt-8 w-full border-t border-gray-200 pt-8 dark:border-gray-800">
      <p className="inline-flex items-center justify-center text-center text-3xl font-semibold whitespace-pre-wrap">
        unlogg yourself from{" "}
        <TextLoop
          className="align-left overflow-y-clip"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span>Jira</span>
          <span>Github Issues</span>
          <span>Gitlab Issues</span>
          <span>Trello</span>
        </TextLoop>
      </p>
    </section>
  );
}
