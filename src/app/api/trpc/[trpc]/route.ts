import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcRouter } from "@/infrastructure/trpc/trpc.config";
import { 
  createDrawingProcedure, 
  listDrawingsProcedure,
  saveStoreDataProcedure,
  findDrawingByIdProcedure,
} from "@/infrastructure/trpc/trpc.procedures";

const ENDPOINT = "/api/trpc" as const;

const router = trpcRouter({
  list: listDrawingsProcedure,
  create: createDrawingProcedure,
  find: findDrawingByIdProcedure,
  save: saveStoreDataProcedure,
});

const handler = (req: Request) => fetchRequestHandler({ endpoint: ENDPOINT, req, router });

export { 
  handler as GET, 
  handler as POST, 
};