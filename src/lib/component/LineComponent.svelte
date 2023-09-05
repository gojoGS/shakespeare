<script lang="ts">
    import { deleteLine, type Line } from "../store/line";
    import { findContrastingTextColor } from "../util/color";

    export let line: Line;
</script>

<div role="listitem" class="cnt group">
    <div class="avatar placeholder">
        <div
            style={`color: ${findContrastingTextColor(
                line.character.color,
            )}; background-color: ${line.character.color}`}
            class="w-8 rounded-full select-none"
        >
            <span class="text-2xl">{line.character.abbreviation}</span>
        </div>
    </div>
    <div>
        <em>{line.character.name}</em>
        {line.line}
    </div>
    <span
        class={`buttons scale-0 group-hover:scale-100 transition-all duration-100`}
    >
        <button class="action-button btn-neutral btn-xs">e</button>
        <button
            on:click={() => {
                deleteLine(line.id);
            }}
            class="action-button btn-error btn-xs">x</button
        >
    </span>
</div>

<style>
    .cnt {
        padding: 8px;
        gap: 1rem;
        align-items: center;
        display: inline-flex;
        flex-direction: row;
        max-width: fit-content;
    }

    .action-button {
        @apply btn btn-outline btn-circle btn-xs;
    }
</style>
