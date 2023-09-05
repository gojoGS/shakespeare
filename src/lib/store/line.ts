import { writable } from "svelte/store";
import type { Character } from "./character";
import { uuid, type UUID } from "../util/uuid";

export class Line {
    readonly id: UUID;

    constructor(
        public readonly line: string,
        public readonly character: Character,
    ) {
        this.id = uuid();
    }
}

export const lineStore = writable([]);

export function create(line: string, character: Character) {
    lineStore.update((values) => {
        const new_line_object = new Line(line, character);

        values.push(new_line_object);
        return values;
    });
}

export function deleteLine(lineId: UUID) {
    lineStore.update((values) => {
        const indexOfDeletableLine = values.findIndex(
            (line) => line.id === lineId,
        );

        if (indexOfDeletableLine !== -1) {
            values.splice(indexOfDeletableLine, 1);
        }

        return values;
    });
}
