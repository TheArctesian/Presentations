<script lang="ts">
	/**
	 * Presentation Modal component
	 * Following Single Responsibility Principle - displays presentation details and actions only
	 */
	import type { Presentation } from '$lib/types/presentation';
	import { formatDate } from '$lib/utils/date';

	interface Props {
		presentation: Presentation;
		onclose: () => void;
		onDownloadPDF: () => void;
	}

	let { presentation, onclose, onDownloadPDF }: Props = $props();

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onclose();
		}
	}

	function getYoutubeEmbedUrl(url: string): string {
		const videoId = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		)?.[1];
		return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="modal-backdrop" onclick={handleBackdropClick} role="dialog" aria-modal="true">
	<div class="modal">
		<button class="close-button" onclick={onclose} aria-label="Close modal">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>

		<div class="modal-content">
			<div class="thumbnail">
				<img src={presentation.thumbnail} alt={`${presentation.title} thumbnail`} />
			</div>

			<div class="details">
				<h1 class="title">{presentation.title}</h1>

				<div class="metadata">
					<span class="date">Created: {formatDate(presentation.createdAt)}</span>
					{#if presentation.tags && presentation.tags.length > 0}
						<div class="tags">
							{#each presentation.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					{/if}
				</div>

				<p class="description">{presentation.description}</p>

				<div class="actions">
					<a
						href={presentation.slidesPath}
						class="button primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Presentation
					</a>
					<button class="button secondary" onclick={onDownloadPDF}>Export to PDF</button>
				</div>
				<p class="pdf-hint">
					<strong>PDF Export:</strong> Opens print-ready version. Press <kbd>Ctrl/Cmd+P</kbd>, set to Landscape, margins to None, enable Background graphics, and save as PDF.
				</p>

				{#if presentation.youtubeLinks && presentation.youtubeLinks.length > 0}
					<div class="youtube-section">
						<h2 class="section-title">Video Recordings</h2>
						<div class="youtube-links">
							{#each presentation.youtubeLinks as link}
								<div class="youtube-embed">
									<iframe
										src={getYoutubeEmbedUrl(link)}
										title="YouTube video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(46, 52, 64, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
		backdrop-filter: blur(4px);
	}

	.modal {
		position: relative;
		background-color: var(--nord1);
		border: 1px solid var(--nord3);
		border-radius: 12px;
		max-width: 900px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background-color: var(--nord3);
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--nord4);
		transition: all 0.2s ease;
		z-index: 10;
	}

	.close-button:hover {
		background-color: var(--nord11);
		color: var(--nord6);
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.thumbnail {
		width: 100%;
		aspect-ratio: 16 / 9;
		background-color: var(--nord0);
		overflow: hidden;
		border-radius: 12px 12px 0 0;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.details {
		padding: 0 2rem 2rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--nord6);
		margin: 0;
	}

	.metadata {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.date {
		font-size: 0.9rem;
		color: var(--nord9);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.8rem;
		color: var(--nord4);
		background-color: var(--nord3);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
	}

	.description {
		font-size: 1rem;
		color: var(--nord4);
		line-height: 1.6;
		margin: 0;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.button {
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		text-decoration: none;
		display: inline-block;
	}

	.button.primary {
		background-color: var(--nord8);
		color: var(--nord0);
	}

	.button.primary:hover {
		background-color: var(--nord7);
	}

	.button.secondary {
		background-color: var(--nord3);
		color: var(--nord4);
	}

	.button.secondary:hover {
		background-color: var(--nord10);
		color: var(--nord6);
	}

	.pdf-hint {
		font-size: 0.85rem;
		color: var(--nord9);
		line-height: 1.5;
		margin: -0.5rem 0 0 0;
		padding: 0.75rem;
		background-color: rgba(129, 161, 193, 0.1);
		border-left: 3px solid var(--nord9);
		border-radius: 4px;
	}

	.pdf-hint strong {
		color: var(--nord8);
	}

	kbd {
		background-color: var(--nord3);
		color: var(--nord4);
		padding: 0.15em 0.4em;
		border-radius: 3px;
		font-family: monospace;
		font-size: 0.9em;
		border: 1px solid var(--nord2);
	}

	.youtube-section {
		margin-top: 1rem;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--nord6);
		margin-bottom: 1rem;
	}

	.youtube-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.youtube-embed {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--nord0);
	}

	.youtube-embed iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 1rem;
		}

		.details {
			padding: 0 1rem 1rem 1rem;
		}

		.title {
			font-size: 1.5rem;
		}

		.actions {
			flex-direction: column;
		}

		.button {
			width: 100%;
			text-align: center;
		}
	}
</style>
