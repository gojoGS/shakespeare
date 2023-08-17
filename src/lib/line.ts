import { writable } from "svelte/store";
import { uuid, type UUID } from "./uuid";

export class Line {
    // character: Character;
    readonly id: UUID;
    readonly line: string;

    constructor(line: string) {
        this.id = uuid();
        this.line = line;
    }
}

export const lineStore = writable([
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
    new Line("What a day"),
]);

export function create(line: string) {
    lineStore.update((values) => {
        const new_line_object = new Line(line);

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

export function assignCharacterToLine(characterId: UUID, lineId: UUID) {}
