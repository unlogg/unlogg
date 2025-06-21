import { Button } from "@unlogg/ui/components/button";
import Test from "@unlogg/ui/components/unlogg-ui/test";

import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@unlogg/ui/components/tabs";
import { Separator } from "@unlogg/ui/components/separator";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="text-3xl logo-font text-white">unloggss</h1>
      <Button variant="secondary">Get started</Button>
    </main>
  );
}
