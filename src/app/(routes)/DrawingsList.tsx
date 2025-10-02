import Link from "next/link";
import { client } from "@/client/api/trpc-provider";
import { ScrollArea, Separator, Typography } from "@/client/components/atoms";

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleString();
}

export default async function DrawingList() {
  const drawings = await client.list.query();

  return (
    <div className="h-80 w-full max-w-full rounded-md border bg-card">
      {drawings.length ? (
        <ScrollArea className="h-full">
          {drawings.map(({ id: drawingId, name, updatedAt, createdAt }) => (
            <div key={drawingId}>
              <Link href={`/${drawingId}`} className="block p-0 hover:bg-muted transition" >
                <div className="centered-col w-full px-4 py-2">
                  <Typography large ellipsis>{name}</Typography>
                  <Typography muted small ellipsis className="text-right">
                    Updated: {formatDate(updatedAt)} - Created: {formatDate(createdAt)}
                  </Typography>
                </div>
              </Link>
              <Separator />
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="centered-col justify-center h-full"> 
          <Typography large>No drawings found</Typography>
        </div>
      )}
    </div>

  );
}
