type JsonPrimitive = string | number | boolean | null;

type JsonObject = { [key: string]: JsonValue };

type JsonArray = Array<JsonValue>;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;