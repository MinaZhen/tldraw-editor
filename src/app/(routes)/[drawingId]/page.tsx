import { client } from "@/client/api/trpc-provider";
import { Typography } from "@/client/components/atoms";
import TldrawEditor from "@/app/(routes)/[drawingId]/TldrawEditor";
import Link from "next/link";

interface DrawingPageProps {
  params: { drawingId: string; };
}

export default async function DrawingPage({ params }: DrawingPageProps) {
  const id = (await params).drawingId;
  const drawing = await client.find.query({ id });

  return ( 
    <div className="w-full h-[100vh]">
      {drawing && drawing.id ?(
        <>
        <Link
          href="/"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md bg-muted text-foreground shadow hover:bg-ring transition"
        >
          Return to home page
        </Link>
        <TldrawEditor 
          drawingId={drawing.id as string} 
          storeData={drawing.storeData} 
          /> 
          </>
      ) : (
        <div className="centered-col justify-center h-full"> 
          <Typography large>Drawing not found</Typography> 
        </div>
      )}
    </div>
  );
}