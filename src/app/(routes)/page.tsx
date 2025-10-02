import NewDrawingInput from "@/app/(routes)/NewDrawingInput";
import DrawingList from "@/app/(routes)/DrawingsList";
import { Card, CardTitle } from "@/client/components/atoms";

export default function Home() {
  return (
    <main className={"centered-col justify-center min-h-screen"}>
      <Card className="w-full max-w-lg px-3">
        <CardTitle>Find your drawing</CardTitle>
        <DrawingList />
        <CardTitle>Create a new drawing</CardTitle>
        <div className="centered-col w-full">
          <NewDrawingInput />
        </div>
      </Card>
      {/* </div> */}
    </main>
  );
}
