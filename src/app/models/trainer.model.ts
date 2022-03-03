import { Result } from "./pokemon.model";

export interface Trainer {
    id: number;
    username: string;
    pokemon: Result[];
}