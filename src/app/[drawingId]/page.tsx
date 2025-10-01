import { client } from "@/client/api/trpc-provider";
import TldrawEditor from "@/client/components/TldrawEditor";

interface DrawingPageProps {
  params: { drawingId: string; };
}

export default async function DrawingPage({ params }: DrawingPageProps) {
  const id = (await params).drawingId;
  const drawing = await client.find.query({ id });

  return (drawing && drawing.id ? 
    (
      <div className="w-full h-[100vh] p-20">
        <TldrawEditor 
          drawingId={drawing.id as string} 
          storeData={drawing.storeData} 
        /> 
      </div>
    ) : (
      "Drawing not found" 
    )
   
   
  );
}