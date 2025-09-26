import  TldrawEditor from "@/client/components/TldrawEditor";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full h-[100vh] p-20">
        <TldrawEditor />
      </div>
    </main>
  );
}
