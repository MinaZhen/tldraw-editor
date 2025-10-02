import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Editor, getSnapshot, HistoryEntry } from "@tldraw/tldraw";
import { client } from "@/client/api/trpc-provider";
import { JsonValue } from "@/shared/types/json.types";

const getHasChanged = ({ changes }: HistoryEntry): boolean => {
  const { added, updated, removed } = changes;
      
  for (const record of Object.values(added)) {
    if (record.typeName === "shape") return true;
  }

  for (const record of Object.values(removed)) {
    if (record.typeName === "shape") return true;
  }

  for (const [from, to] of Object.values(updated)) {
    if (from.typeName === "instance" && to.typeName === "instance") { 
      const fromPage = (from as { currentPageId?: string }).currentPageId;
      const toPage = (to as { currentPageId?: string }).currentPageId;
      if (fromPage !== toPage) return true;
    } 
    else if (from.id?.startsWith("shape") && to.id?.startsWith("shape")) {
      return true;
    }
  }

  return false;
};

interface TldrawAutosaveParams {
  editor: Editor | undefined;
  drawingId: string;
}

export const useTldrawAutosave = ({ editor, drawingId } : TldrawAutosaveParams) => {
  const [shouldPersist, setShouldPersist] = useState(false); 

  useEffect(() => {
    if (!editor) return;
    const handleChangeEvent = (history: HistoryEntry) => {
      const hasChanged = getHasChanged(history);
      if (hasChanged) setShouldPersist(true); 
    };

    return editor.store.listen(handleChangeEvent, { source: "user" });
  }, [editor]);

  useEffect(() => {
    if (!editor || !shouldPersist) return;

    const saveTimeout = setTimeout(async () => {
      const storeData = editor?.store && getSnapshot(editor.store) || {} as JsonValue;
      
      await client.save.mutate({ id: drawingId , storeData }).catch(() => {
        toast.error("Save operation failed. Please try again later.");
      });

      setShouldPersist(false);
    }, 500);

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [editor, shouldPersist, drawingId]);
};