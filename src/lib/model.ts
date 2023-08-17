export class Character {
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
