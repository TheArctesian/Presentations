<script lang="ts">
	/**
	 * Main gallery page
	 * Displays all presentations in a responsive grid
	 */
	import PresentationCard from '$lib/components/PresentationCard.svelte';
	import PresentationModal from '$lib/components/PresentationModal.svelte';
	import FilmGrain from '$lib/components/FilmGrain.svelte';
	import { presentationStore } from '$lib/stores/presentations.svelte';
	import { openPresentationForPDFExport } from '$lib/utils/pdf-export';

	let showModal = $state(false);

	function handleCardClick(id: string) {
		presentationStore.selectPresentation(id);
		showModal = true;
	}

	function handleCloseModal() {
		showModal = false;
		presentationStore.clearSelection();
	}

	function handleDownloadPDF() {
		if (presentationStore.selectedPresentation) {
			openPresentationForPDFExport(
				presentationStore.selectedPresentation.slidesPath,
				presentationStore.selectedPresentation.title
			);
		}
	}
</script>

<svelte:head>
	<title>Stephen Okita's Presentations</title>
	<meta name="description" content="Collection of my presentations" />
</svelte:head>

<FilmGrain />

<main class="container">
	<header class="header">
		<h1 class="main-title">Stephen Okita's Presentations</h1>
		<p class="subtitle">
			A collection of my talks and presentations, from <u>Oct 28, 2025</u> onwards.
		</p>
	</header>

	<div class="gallery">
		{#each presentationStore.presentations as presentation (presentation.id)}
			<PresentationCard {presentation} onclick={() => handleCardClick(presentation.id)} />
		{/each}
	</div>

	{#if presentationStore.presentations.length === 0}
		<div class="empty-state">
			<p>No presentations yet. Create your first one!</p>
		</div>
	{/if}
</main>

{#if showModal && presentationStore.selectedPresentation}
	<PresentationModal
		presentation={presentationStore.selectedPresentation}
		onclose={handleCloseModal}
		onDownloadPDF={handleDownloadPDF}
	/>
{/if}

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 4rem 2rem;
		min-height: 100vh;
	}

	.header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.main-title {
		font-size: 3.5rem;
		font-weight: 700;
		color: var(--nord6);
		margin: 0 0 1rem 0;
		letter-spacing: -0.02em;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--nord4);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--nord9);
	}

	.empty-state p {
		font-size: 1.1rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem;
		}

		.main-title {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.gallery {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.header {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 480px) {
		.main-title {
			font-size: 2rem;
		}
	}
</style>
