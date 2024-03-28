<script lang="ts">
	import FileListItem from './FileListItem.svelte';
	import { selectFilesInList } from '$lib/utils/selectFilesInList';
	import { maybeMoveSelection } from '$lib/utils/selection';
	import type { Ownership } from '$lib/vbranches/ownership';
	import type { AnyFile } from '$lib/vbranches/types';
	import type { Writable } from 'svelte/store';

	export let branchId: string;
	export let sortedFiles: AnyFile[];
	export let selectedOwnership: Writable<Ownership>;
	export let isUnapplied = false;
	export let showCheckboxes = false;
	export let selectedFiles: Writable<AnyFile[]>;
	export let allowMultiple = false;
	export let readonly = false;
</script>

{#each sortedFiles as file (file.id)}
	<FileListItem
		{file}
		{readonly}
		{branchId}
		{isUnapplied}
		{selectedFiles}
		{selectedOwnership}
		showCheckbox={showCheckboxes}
		selected={$selectedFiles.includes(file)}
		on:click={(e) => {
			$selectedFiles = selectFilesInList(e, file, $selectedFiles, sortedFiles, allowMultiple);
		}}
		on:keydown={(e) => {
			e.preventDefault();
			maybeMoveSelection(e.key, sortedFiles, selectedFiles);
		}}
	/>
{/each}
