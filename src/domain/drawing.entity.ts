import { JsonValue } from "@/shared/types/json.types";

interface DrawingProps {
  id?: string;
  name: string;
  storeData: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Drawing {
  public readonly id: string | undefined;
  public readonly name: string;
  public readonly storeData: JsonValue | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: DrawingProps) {
    this.id = props.id;
    this.name = props.name;
    this.storeData = props.storeData;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(name: string): Drawing {
    return new Drawing({
      name,
      storeData: null, 
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}