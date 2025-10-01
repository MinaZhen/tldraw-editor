import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/app/api/trpc/[trpc]/route";

export const client = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
});