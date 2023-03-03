import { v4 as uuidv4 } from "uuid";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const generateUUID = (): string => uuidv4();
