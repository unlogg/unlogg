import { Button } from "@unlogg/ui/components/button";
import { Input } from "@unlogg/ui/components/input";
import { ScrollArea } from "@unlogg/ui/components/scroll-area";
import { Separator } from "@unlogg/ui/components/separator";
import { Textarea } from "@unlogg/ui/components/textarea";
import { MarkdownEditor } from "@unlogg/ui/components/unlogg-ui/markdown-editor/markdown-editor";
export const CreateFeedback = ({
  onOpenChange = () => {},
}: {
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-0 relative">
        <div className="col-span-3 p-2">
          <Input
            placeholder="Title of your feedback"
            className="border-none bg-background  dark:bg-background focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-lg md:text-xl file:text-xl font-semibold p-2"
          />

          {/* <Textarea
            placeholder="Short description"
            className="border-none bg-background  dark:bg-background focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-sm md:text-sm file:text-lg p-0"
          /> */}
          {/* <Separator className="my-0" /> */}

          <ScrollArea className="h-[250px] w-full">
            <MarkdownEditor variant="comment" />
          </ScrollArea>
        </div>

        <div className="col-span-1 p-2 border-l">
          <div>Hello</div>
        </div>
      </div>

      <div className="border-t sticky bottom-0 w-full p-2 flex items-center justify-end gap-4">
        <div></div>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button>Create feedback</Button>
      </div>
    </div>
  );
};
