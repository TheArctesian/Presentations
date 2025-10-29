/**
 * Presentation data storage
 * Following Dependency Inversion Principle - implements PresentationRepository interface
 * Following Open/Closed Principle - can be extended to use different storage backends
 */

import type { Presentation, PresentationRepository } from '$lib/types/presentation';

const presentations: Presentation[] = [
	{
		id: '1',
		slug: 'template-presentation',
		title: 'Template Presentation',
		description: 'A beautiful Nord-themed Marp presentation to get you started',
		createdAt: new Date('2024-01-15'),
		thumbnail: '/presentations/template/thumbnail.svg',
		youtubeLinks: [],
		slidesPath: '/presentations/template/index.html',
		tags: ['template', 'getting-started', 'marp']
	}
];

/**
 * In-memory presentation repository implementation
 * Can be easily swapped with API-based, file-based, or database implementations
 */
export const presentationRepository: PresentationRepository = {
	getAll(): Presentation[] {
		return [...presentations].sort(
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
		);
	},

	getBySlug(slug: string): Presentation | undefined {
		return presentations.find((p) => p.slug === slug);
	},

	getById(id: string): Presentation | undefined {
		return presentations.find((p) => p.id === id);
	}
};
