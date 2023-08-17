<script lang="ts">
    import { tick } from "svelte";
    import LineComponent from "./lib/LineComponent.svelte";
    import { create, lineStore } from "./lib/line";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";

    let element: HTMLElement;

    $: $lineStore, scrollToBottom(element);

    const scrollToBottom = async (node: HTMLElement) => {
        await tick();
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };

    let new_line: string = "";

    function handle_submit() {
        create(new_line);

        new_line = "";
    }
</script>

<main class="shadow-xl">
    <div class="characters">
        <div class="character avatar placeholder tooltip" data-tip="Dad">
            <div
                class="bg-neutral-focus text-neutral-content rounded-full w-12"
            >
                <span class="text-3xl">D</span>
            </div>
        </div>

        <div
            class="avatar placeholder tooltip tooltip-primary"
            data-tip="Daughter"
        >
            <div
                class="bg-primary-focus text-neutral-content rounded-full w-12"
            >
                <span class="text-3xl">F</span>
            </div>
        </div>

        <button class="btn btn-circle btn-outline">
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
    </div>
    <section class="dialogue" bind:this={element}>
        {#each $lineStore as line (line.id)}
            <div animate:flip transition:fade>
                <LineComponent {line} />
            </div>
        {/each}
    </section>
    <div class="new-line">
        <div class="self-center dropdown dropdown-top">
            <label tabindex="-1" class="btn m-1 btn-circle btn-outline">
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
            </label>
            <ul
                tabindex="-2"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <div class="character avatar placeholder">
                        <div
                            class="bg-neutral-focus text-neutral-content rounded-full w-8"
                        >
                            <span class="text-2xl">D</span>
                        </div>
                        Dad
                    </div>
                </li>
                <li>
                    <div class="avatar placeholder">
                        <div
                            class="bg-primary-focus text-neutral-content rounded-full w-8"
                        >
                            <span class="text-2xl">F</span>
                        </div>
                        Flora
                    </div>
                </li>
            </ul>
        </div>
        <textarea bind:value={new_line} class="textarea textarea-primary" />
        <button
            disabled={new_line.length === 0}
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
</style>
