/**
 * Presentation metadata interface
 * Following Single Responsibility Principle - represents presentation data only
 */
export interface Presentation {
	id: string;
	slug: string;
	title: string;
	description: string;
	createdAt: Date;
	thumbnail: string;
	youtubeLinks: string[];
	slidesPath: string;
	tags?: string[];
}

/**
 * Presentation storage interface
 * Following Interface Segregation Principle - minimal interface for data operations
 */
export interface PresentationRepository {
	getAll(): Presentation[];
	getBySlug(slug: string): Presentation | undefined;
	getById(id: string): Presentation | undefined;
}
