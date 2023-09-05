<script lang="ts">
    import { tick } from "svelte";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
    import { characterStore } from "./lib/store/character";
    import { findContrastingTextColor, randomColor } from "./lib/util/color";
    import CharacterSelector from "./lib/component/CharacterSelector.svelte";
    import { get } from "svelte/store";
    import LineComponent from "./lib/component/LineComponent.svelte";
    import { create, lineStore } from "./lib/store/line";

    let element: HTMLElement;
    let dialogue: HTMLDialogElement;
    let color: string = randomColor();
    let name: string;

    $: $lineStore, scrollToBottom(element);

    const scrollToBottom = async (node: HTMLElement) => {
        await tick();
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };

    let new_line: string = "";

    const { characters, selectedCharacter } = characterStore;

    function handle_submit() {
        create(new_line, get(selectedCharacter));

        characterStore.resetSelectedCharacter();

        new_line = "";
    }
</script>

<main class="shadow-xl">
    <div class="characters">
        {#each $characters as character (character.id)}
            <div
                class="character avatar placeholder tooltip"
                data-tip={character.name}
            >
                <div
                    style={`color: ${findContrastingTextColor(
                        character.color,
                    )}; background-color: ${character.color}`}
                    class="rounded-full w-12"
                >
                    <span class="text-3xl">{character.abbreviation}</span>
                </div>
            </div>
        {/each}

        <button
            class="btn btn-circle btn-outline"
            on:click={() => dialogue.showModal()}
        >
            <svg
                class="h-12 w-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" /></svg
            >
        </button>
        <dialog bind:this={dialogue} id="my_modal_1" class="modal">
            <form
                method="dialog"
                id="new-char"
                on:submit={() => {
                    console.log(color);
                    console.log(name);
                    characterStore.createCharacter(name, color);
                }}
                class="modal-box min-h-min max-h-full"
            >
                <h3 id="hd" class="font-bold text-lg">
                    Create a new character
                </h3>
                <label id="name-label" for="name">Name</label>
                <input
                    id="name"
                    class="input input-bordered"
                    type="text"
                    minlength="1"
                    maxlength="63"
                    required
                    bind:value={name}
                />
                <label id="color-label" for="color-picker"
                    >Associated color</label
                >
                <input
                    id="color-picker"
                    type="color"
                    bind:value={color}
                    required
                />
                <div id="close" class="modal-action">
                    <button type="submit" class="btn btn-primary">Add</button>
                    <button
                        on:click={() => dialogue.close()}
                        type="button"
                        class="btn">Cancel</button
                    >
                </div>
            </form>
        </dialog>
    </div>
    <section class="dialogue" bind:this={element}>
        {#each $lineStore as line (line.id)}
            <div animate:flip transition:fade>
                <LineComponent {line} />
            </div>
        {/each}
    </section>
    <div class="new-line">
        <CharacterSelector />
        <textarea bind:value={new_line} class="textarea textarea-primary" />
        <button
            disabled={new_line.length === 0 || $selectedCharacter === undefined}
            on:click={handle_submit}
            class="btn btn-outline btn-primary"
        >
            <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" /></svg
            >
        </button>
        <button class="btn btn-outline btn-neutral">Reset</button>
    </div>
</main>

<style>
    main {
        padding: 1rem;
        min-height: 100vh;
        max-height: 100vh;
        /* 100% of the viewport height */
        width: 80%;
        margin: auto;
        /* 100% of the viewport width */

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 8fr 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 9px;
        background-color: #f0f0f0;
    }

    .characters {
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        align-items: center;
    }

    .dialogue {
        grid-area: 2 / 1 / 3 / 2;
        overflow: scroll;
        scroll-behavior: smooth;
        display: flex;
        max-height: min-content;
        flex-direction: column;
    }

    .new-line {
        gap: 1rem;
        grid-area: 3 / 1 / 4 / 2;
        display: flex;
        justify-content: space-between;
    }

    .new-line textarea {
        resize: none;
        width: 95%;
    }

    .new-line button {
        align-self: center;
    }

    .character {
        cursor: pointer;
    }

    #new-char {
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: minmax(80px, auto);
        grid-template-areas:
            "hd hd"
            "name-label name"
            "color-label color-picker"
            ". close";

        justify-content: center;
        align-items: center;
    }

    #hd {
        grid-area: hd;
    }

    #name-label {
        grid-area: name-label;
    }

    #name {
        grid-area: name;
    }

    #color-label {
        grid-area: color-label;
    }

    #color-picker {
        grid-area: color-picker;
    }

    #close {
        grid-area: close;
    }
</style>
