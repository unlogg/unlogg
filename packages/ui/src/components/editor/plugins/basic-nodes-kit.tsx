"use client";

import { BasicBlocksKit } from "@unlogg/ui/components/editor/plugins/basic-blocks-kit";
import { BasicMarksKit } from "@unlogg/ui/components/editor/plugins/basic-marks-kit";

export const BasicNodesKit = [...BasicBlocksKit, ...BasicMarksKit];
