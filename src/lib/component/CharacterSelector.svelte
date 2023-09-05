<script lang="ts">
    import { Character, characterStore } from "../store/character";
    import { findContrastingTextColor } from "../util/color";

    let isOpen = false;

    const { characters, selectedCharacter } = characterStore;

    function onItemClick(character: Character) {
        isOpen = false;
        characterStore.selectCharacter(character.id);
    }
</script>

<details
    bind:open={isOpen}
    class="self-center dropdown dropdown-top transition-all duration-100"
>
    {#if $selectedCharacter === undefined}
        <summary class="btn m-1 btn-circle btn-outline">
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
        </summary>
    {:else}
        <summary class="btn m-1 btn-circle character avatar placeholder">
            <div
                style={`color: ${findContrastingTextColor(
                    $selectedCharacter.color,
                )}; background-color: ${$selectedCharacter.color}`}
                class="rounded-full w-12"
            >
                <span class="text-2xl">{$selectedCharacter.abbreviation}</span>
            </div>
        </summary>
    {/if}
    <ul
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each $characters as character (character.id)}
            <li on:click={() => onItemClick(character)}>
                <div class="character avatar placeholder">
                    <div
                        style={`color: ${findContrastingTextColor(
                            character.color,
                        )}; background-color: ${character.color}`}
                        class="rounded-full w-8"
                    >
                        <span class="text-2xl">{character.abbreviation}</span>
                    </div>
                    {character.name}
                </div>
            </li>
        {/each}
    </ul>
</details>

<style>
    .character {
        cursor: pointer;
    }
</style>
