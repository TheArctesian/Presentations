/**
 * Presentation store using Svelte 5 runes
 * Following Single Responsibility Principle - manages presentation state only
 */

import type { Presentation } from '$lib/types/presentation';
import { presentationRepository } from '$lib/data/presentations';

/**
 * Reactive store for presentations using Svelte 5 $state
 */
class PresentationStore {
	presentations = $state<Presentation[]>([]);
	selectedPresentation = $state<Presentation | null>(null);

	constructor() {
		this.presentations = presentationRepository.getAll();
	}

	selectPresentation(id: string) {
		this.selectedPresentation = presentationRepository.getById(id) || null;
	}

	clearSelection() {
		this.selectedPresentation = null;
	}

	getPresentationBySlug(slug: string): Presentation | undefined {
		return presentationRepository.getBySlug(slug);
	}
}

export const presentationStore = new PresentationStore();
