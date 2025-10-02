import { z } from "zod";
import { trpcProcedure } from "./trpc.config";
import { 
  createDrawingUseCase,
  listDrawingsUseCase,
  saveStoreDataUseCase,
  findDrawingByIdUseCase,
} from "@/infrastructure/dependency-injection";

export const createDrawingProcedure = trpcProcedure
  .input(z.object({ name: z.string().min(1) }))
  .mutation(({ input }) => createDrawingUseCase.execute(input));

export const listDrawingsProcedure = trpcProcedure
  .query(() => listDrawingsUseCase.execute());

export const findDrawingByIdProcedure = trpcProcedure
  .input(z.object({ id: z.uuid() }))
  .query(({ input }) => findDrawingByIdUseCase.execute(input));

export const saveStoreDataProcedure = trpcProcedure
  .input(z.object({ 
    id: z.uuid(),
    storeData: z.record(z.string(), z.any()),
  }))
  .mutation(({ input }) => saveStoreDataUseCase.execute(input));