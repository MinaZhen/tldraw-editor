"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { client } from "@/client/api/trpc-provider";
import { Button, Input, Typography } from "@/client/components/atoms";

export default function NewDrawingInput() {
  const [drawingName, setDrawingName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!drawingName.trim()) {
      toast.error("Name shouldn't be empty");
    } else {
      try {
        const drawingId = await client.create.mutate({ name: drawingName });
        if (drawingId) router.push(`/${drawingId}`);
      } catch (_error) {
        toast.error("Error creating drawing");
      }
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        type="text"
        placeholder="Drawing name"
        value={drawingName}
        onChange={(e) => setDrawingName(e.target.value)}
      />
      <Button type="button" onClick={handleSubmit}>
        <Typography large>Create</Typography>
      </Button>
    </div>
  );
}
