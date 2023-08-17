import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export type UUID = string;

export class Line {
    // readonly character: Character;
    readonly id: UUID;
    readonly line: string;

    constructor(id: UUID, line: string) {
        this.id = id;
        this.line = line;
    }
}

export const lineStore = writable([
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
    new Line(uuid(), "What a day"),
]);

export function addLine(line: string) {
    lineStore.update((values) => {
        const new_line_object = new Line(uuid(), line);

        values.push(new_line_object);
        return values;
    });
}

export function deleteLine(id: UUID) {
    lineStore.update((values) => {
        const indexOfDeletableLine = values.findIndex((line) => line.id === id);

        if (indexOfDeletableLine !== -1) {
            values.splice(indexOfDeletableLine, 1);
        }

        return values;
    });
}
