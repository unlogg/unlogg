"use client";

import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import { useRouter, useSearchParams } from "next/navigation";

export const Boards = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBoard = searchParams.get("board") || "B";

  const setBoard = (board: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("board", board);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden md:block col-span-1 sticky top-[66px] px-4 self-start">
      <h3 className="mb-3 uppercase text-sm tracking-wider ml-3">Boards</h3>
      <div className="flex flex-col gap-1">
        <ActiveButton
          size="sm"
          variant="ghost"
          className="justify-start"
          isActive={currentBoard === "A"}
          onClick={() => setBoard("A")}
        >
          Board A
        </ActiveButton>
        <ActiveButton
          size="sm"
          variant="ghost"
          className="justify-start"
          isActive={currentBoard === "B"}
          onClick={() => setBoard("B")}
        >
          Board B
        </ActiveButton>
        <ActiveButton
          size="sm"
          variant="ghost"
          className="justify-start"
          isActive={currentBoard === "C"}
          onClick={() => setBoard("C")}
        >
          Board C
        </ActiveButton>
      </div>
    </div>
  );
};
