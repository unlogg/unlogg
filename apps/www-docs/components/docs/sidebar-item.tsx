import { Badge } from "@unlogg/ui/components/badge";

export const SidebarItem = ({
  name,
  isNew,
}: {
  name: string;
  isNew: boolean;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span>{name}</span>
      {isNew && (
        <Badge
          variant="outline"
          className="grow-0 border-teal-500/50 text-teal-500"
        >
          New
        </Badge>
      )}
    </div>
  );
};
