<script lang="ts">
	/**
	 * Film Grain overlay component
	 * Following Single Responsibility Principle - renders film grain effect only
	 */
</script>

<svg class="film-grain-svg" aria-hidden="true">
	<defs>
		<filter id="noise">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.95"
				numOctaves="4"
				stitchTiles="stitch"
			/>
			<feColorMatrix type="saturate" values="0" />
		</filter>
	</defs>
</svg>

<div class="film-grain"></div>

<style>
	.film-grain-svg {
		position: fixed;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		pointer-events: none;
		z-index: -1;
	}

	.film-grain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0.08;
		z-index: 9999;
		filter: url(#noise);
		mix-blend-mode: overlay;
	}
</style>
