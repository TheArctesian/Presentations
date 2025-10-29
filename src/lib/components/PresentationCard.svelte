<script lang="ts">
	/**
	 * Presentation Card component
	 * Following Single Responsibility Principle - displays presentation preview only
	 */
	import type { Presentation } from '$lib/types/presentation';
	import { formatDateShort } from '$lib/utils/date';

	interface Props {
		presentation: Presentation;
		onclick?: () => void;
	}

	let { presentation, onclick }: Props = $props();
</script>

<button
	class="presentation-card"
	onclick={onclick}
	aria-label={`View ${presentation.title} presentation`}
>
	<div class="thumbnail">
		<img src={presentation.thumbnail} alt={`${presentation.title} thumbnail`} />
	</div>
	<div class="content">
		<h2 class="title">{presentation.title}</h2>
		<p class="description">{presentation.description}</p>
		<div class="metadata">
			<span class="date">{formatDateShort(presentation.createdAt)}</span>
			{#if presentation.tags && presentation.tags.length > 0}
				<div class="tags">
					{#each presentation.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</button>

<style>
	.presentation-card {
		display: flex;
		flex-direction: column;
		background-color: var(--nord1);
		border: 1px solid var(--nord3);
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.3s ease;
		cursor: pointer;
		text-align: left;
		width: 100%;
	}

	.presentation-card:hover {
		transform: translateY(-4px);
		border-color: var(--nord8);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	}

	.presentation-card:active {
		transform: translateY(-2px);
	}

	.thumbnail {
		width: 100%;
		aspect-ratio: 16 / 9;
		background-color: var(--nord0);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--nord6);
		margin: 0;
	}

	.description {
		font-size: 0.9rem;
		color: var(--nord4);
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.metadata {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: auto;
	}

	.date {
		font-size: 0.8rem;
		color: var(--nord9);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.75rem;
		color: var(--nord4);
		background-color: var(--nord3);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}
</style>
