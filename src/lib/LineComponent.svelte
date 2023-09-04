<script lang="ts">
    import { Line, deleteLine } from "./line";

    export let line: Line;
</script>

<div role="listitem" class="cnt group">
    <div class="avatar placeholder">
        <div
            class="w-8 rounded-full bg-neutral-focus select-none text-neutral-content"
        >
            <span class="text-2xl">D</span>
        </div>
    </div>
    <div>
        <em>Dad:</em>
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
