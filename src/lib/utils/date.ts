/**
 * Date formatting utilities
 * Following Single Responsibility Principle - handles date operations only
 */

/**
 * Format a date into a human-readable string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Format a date into a short string
 * @param date - The date to format
 * @returns Short formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDateShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param date - The date to compare
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
	return `${Math.floor(diffDays / 365)} years ago`;
}
