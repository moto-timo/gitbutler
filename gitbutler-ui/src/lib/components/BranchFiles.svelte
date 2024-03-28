<script lang="ts">
	import BranchFilesHeader from './BranchFilesHeader.svelte';
	import BranchFilesList from './BranchFilesList.svelte';
	import FileTree from './FileTree.svelte';
	import { filesToFileTree } from '$lib/vbranches/filetree';
	import { sortLikeFileTree } from '$lib/vbranches/filetree';
	import type { Ownership } from '$lib/vbranches/ownership';
	import type { LocalFile, RemoteFile } from '$lib/vbranches/types';
	import type { Writable } from 'svelte/store';

	export let branchId: string;
	export let files: LocalFile[] | RemoteFile[];
	export let isUnapplied: boolean;
	export let selectedOwnership: Writable<Ownership>;
	export let selectedFiles: Writable<(LocalFile | RemoteFile)[]>;
	export let showCheckboxes = false;

	export let allowMultiple: boolean;
	export let readonly: boolean;

	let selectedListMode: string;

	function unselectAllFiles() {
		selectedFiles.set([]);
	}

	$: sortedFiles = sortLikeFileTree(files);
</script>

<div class="branch-files" class:isUnapplied>
	<div class="branch-files__header">
		<BranchFilesHeader {files} {selectedOwnership} {showCheckboxes} bind:selectedListMode />
	</div>
	{#if files.length > 0}
		<div
			role="listbox"
			tabindex="-1"
			class="files-container"
			on:keydown={(e) => {
				if (e.key === 'Escape') {
					unselectAllFiles();
				}
			}}
			on:click={unselectAllFiles}
		>
			{#if selectedListMode == 'list'}
				<BranchFilesList
					{allowMultiple}
					{readonly}
					{branchId}
					{sortedFiles}
					{selectedOwnership}
					{selectedFiles}
					{showCheckboxes}
					{isUnapplied}
				/>
			{:else}
				<FileTree
					{allowMultiple}
					{readonly}
					node={filesToFileTree(files)}
					{showCheckboxes}
					{branchId}
					isRoot={true}
					{selectedOwnership}
					{selectedFiles}
					{isUnapplied}
					{sortedFiles}
				/>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.branch-files {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--clr-theme-container-light);
		border-radius: var(--radius-m) var(--radius-m) 0 0;

		&.isUnapplied {
			border-radius: var(--radius-m);
		}
	}
	.branch-files__header {
		padding-top: var(--size-14);
		padding-bottom: var(--size-12);
		padding-left: var(--size-14);
		padding-right: var(--size-14);
	}
	.files-container {
		flex: 1;
		padding-top: 0;
		padding-bottom: var(--size-12);
		padding-left: var(--size-14);
		padding-right: var(--size-14);
	}
</style>
