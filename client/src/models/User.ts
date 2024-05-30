import { Guest } from "./Guest";

export type User = {
    id: number;
    name: string;
    guests: Guest[]
};
