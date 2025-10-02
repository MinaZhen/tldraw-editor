"use client";

import { useCallback, useState } from "react";
import { TLEditorSnapshot, Tldraw, Editor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { JsonValue } from "@/shared/types/json.types";
import { useTldrawAutosave } from "@/client/hooks/use-tldraw-autosave";

interface DrawingProps {
  drawingId: string;
  storeData: JsonValue;
}

export default function TldrawEditor({ drawingId, storeData }: DrawingProps ) {
  const [editor, setEditor] = useState<Editor>();

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  useTldrawAutosave({ editor, drawingId });

  return (
    <Tldraw
      snapshot={storeData as unknown as TLEditorSnapshot}
      onMount={setAppToState}
    />
  );
}
