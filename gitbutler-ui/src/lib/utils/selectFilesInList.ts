import type { AnyFile } from '$lib/vbranches/types';

export function selectFilesInList(
	e: MouseEvent,
	file: AnyFile,
	selectedFiles: AnyFile[],
	sortedFiles: AnyFile[],
	allowMultiple: boolean
): AnyFile[] {
	e.stopPropagation();
	const isAlreadySelected = selectedFiles.includes(file);

	// Ctrl + Click or Cmd + Click to select multiple files
	if (e.ctrlKey || e.metaKey) {
		// if file is already selected, unselect it
		if (isAlreadySelected) {
			selectedFiles = selectedFiles.filter((f) => f.id != file.id);
		} else {
			selectedFiles = [...selectedFiles, file];
		}
	}
	// Shift + Click to select range
	else if (e.shiftKey && allowMultiple) {
		const initiallySelectedIndex = sortedFiles.findIndex((f) => f.id == selectedFiles[0].id);

		// detect the direction of the selection
		const selectionDirection =
			initiallySelectedIndex < sortedFiles.findIndex((f) => f.id == file.id) ? 'down' : 'up';

		const updatedSelection = sortedFiles.slice(
			Math.min(
				initiallySelectedIndex,
				sortedFiles.findIndex((f) => f.id == file.id)
			),
			Math.max(
				initiallySelectedIndex,
				sortedFiles.findIndex((f) => f.id == file.id)
			) + 1
		);

		selectedFiles = updatedSelection;

		if (selectionDirection === 'down') {
			selectedFiles = updatedSelection;
		} else {
			selectedFiles = updatedSelection.reverse();
		}
	}
	// select only one file
	else {
		// if only one file is selected and it is already selected, unselect it
		if (selectedFiles.length == 1 && isAlreadySelected) {
			selectedFiles = [];
		} else {
			selectedFiles = [file];
		}
	}

	return selectedFiles;
}
