import { Badge } from "@unlogg/ui/components/badge";

export const SidebarItem = ({
  name,
  isNew,
  isAlpha = false,
}: {
  name: string;
  isNew: boolean;
  isAlpha: boolean;
}) => {
  return (
    <span className="flex w-full items-center justify-between">
      <span>{name}</span>
      {isNew && (
        <Badge
          variant="outline"
          className="grow-0 border-teal-500/50 text-teal-500"
        >
          New
        </Badge>
      )}
      {isAlpha && (
        <Badge
          variant="secondary"
          className="grow-0 border-yellow-500/50 text-yellow-500"
        >
          Alpha
        </Badge>
      )}
    </span>
  );
};
