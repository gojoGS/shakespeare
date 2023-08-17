<script lang="ts">
    import { Line, deleteLine } from "./line";

    export let line: Line;

    let hovered: boolean = false;
</script>

<div
    on:mouseover={() => (hovered = true)}
    on:focus={() => (hovered = true)}
    on:mouseout={() => (hovered = false)}
    on:blur={() => (hovered = false)}
    role="listitem"
    class="cnt"
>
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
    <span class={`buttons ${hovered ? "" : "hidden"}`}>
        <button class="btn btn-neutral btn-outline btn-circle btn-xs">e</button>
        <button
            on:click={() => {
                deleteLine(line.id);
            }}
            class="btn btn-error btn-outline btn-circle btn-xs">x</button
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
</style>
