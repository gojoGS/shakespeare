import { get, writable } from "svelte/store";
import { uuid, type UUID } from "../util/uuid";

export class Character {
    readonly id: UUID;

    constructor(public readonly name: string, public readonly color: string) {
        this.id = uuid();
    }

    public get abbreviation(): string {
        return this.name.at(0).toUpperCase();
    }
}

export class CharacterStore {
    public characters = writable([
        new Character("Father", "#00f"),
        new Character("Daughter", "#f00"),
    ]);

    public selectedCharacter = writable<Character | undefined>(undefined);

    createCharacter(name: string, color: string) {
        this.characters.update((values) => {
            const new_item = new Character(name, color);
            values.push(new_item);

            return values;
        });
    }

    selectCharacter(characterId: UUID) {
        const character = get(this.characters);
        const selectedCharacter = character.find(
            (char) => char.id === characterId,
        );

        if (selectedCharacter === undefined) {
            console.error("Couldn't find character with ID ", characterId);
            return;
        }

        this.selectedCharacter.set(selectedCharacter);
    }

    resetSelectedCharacter() {
        this.selectedCharacter.set(undefined);
    }
}

export const characterStore = new CharacterStore();
