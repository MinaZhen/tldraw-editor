import { z } from "zod";
import { trpcProcedure } from "./trpc.config";
import { 
  createDrawingUseCase,
} from "@/infrastructure/dependency-injection";

export const createDrawingProcedure = trpcProcedure
  .input(z.object({ name: z.string().min(1) }))
  .mutation(({ input }) => createDrawingUseCase.execute(input));






