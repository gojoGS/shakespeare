import { writable } from "svelte/store";
import type { UUID } from "./uuid";

export class Character {
    readonly id: UUID;
    readonly name: string;
    readonly color: string;

    constructor(name: string, color: string) {
        this.color = color;
        this.name = name;
    }

    public get abbreviation(): string {
        return this.name.at(0).toUpperCase();
    }
}

export const characterStore = writable([
    new Character("Father", "#00f"),
    new Character("Daughter", "#f00"),
]);

export function createCharacter(name: string, color: string) {
    characterStore.update((values) => {
        const new_item = new Character(name, color);
        values.push(new_item);

        return values;
    });
}
