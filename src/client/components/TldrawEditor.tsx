"use client";

import { useCallback, useState, useEffect } from "react";
import { 
  TLEditorSnapshot, 
  Tldraw, 
  getSnapshot,
  Editor,
  HistoryEntry,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { JsonValue } from "@/shared/types/json.types";
import { client } from "@/client/api/trpc-provider";

interface DrawingProps {
  drawingId: string;
  storeData: JsonValue;
}

const getShouldBeSaved = ({ changes }: HistoryEntry) => {
  const { added, updated, removed } = changes;
  let shouldSave = false;
      
  for (const record of Object.values(added)) {
    if(!shouldSave) shouldSave = !!(record.typeName === "shape");
  }

  for (const record of Object.values(removed)) {
    if(!shouldSave) shouldSave = !!(record.typeName === "shape");
  }

  if (!shouldSave) {
    for (const [from, to] of Object.values(updated)) {
      if (from.typeName === "instance" && to.typeName === "instance") { 
        const fromPage = (from as { currentPageId?: string }).currentPageId;
        const toPage = (to as { currentPageId?: string }).currentPageId;
        if(!shouldSave) shouldSave = !!(fromPage !== toPage);
      } else if (from.id?.startsWith("shape") && to.id?.startsWith("shape")) {
        if(!shouldSave) shouldSave = true;
      }
    }
  }

  return shouldSave;
};


export default function TldrawEditor({ drawingId, storeData }: DrawingProps ) {
  const [editor, setEditor] = useState<Editor>();
  const [shouldPersist, setShouldPersist] = useState(false);

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);


  useEffect(() => {
    if (!editor) return;

    const handleChangeEvent = (history: HistoryEntry) => {
      if (getShouldBeSaved(history)) setShouldPersist(true);
    };

    return editor.store.listen(handleChangeEvent, { source: "user" });
  }, [editor]);

  useEffect(() => {
    if (!editor || !shouldPersist) return;

    const saveTimeout = setTimeout(async () => {
      const storeData = editor?.store && getSnapshot(editor.store) || {};
      await client.save.mutate({ id: drawingId , storeData });
      setShouldPersist(false);
    }, 500);

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [editor, shouldPersist, drawingId]);

  return (
    <Tldraw
      snapshot={storeData as unknown as TLEditorSnapshot}
      onMount={setAppToState}
    />

  );
}
