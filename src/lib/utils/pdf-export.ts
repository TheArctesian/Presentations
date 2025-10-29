/**
 * PDF export utility for Marp presentations
 * Following Single Responsibility Principle - handles PDF generation only
 */

/**
 * Open presentation in print-ready format for PDF export
 *
 * Instructions for the user:
 * 1. Wait for the presentation to load
 * 2. Press CTRL/CMD+P to open print dialog
 * 3. Set destination to "Save as PDF"
 * 4. Change layout to "Landscape"
 * 5. Set margins to "None"
 * 6. Enable "Background graphics"
 * 7. Click "Save"
 *
 * Note: This method works best in Google Chrome and Chromium-based browsers
 *
 * @param presentationPath - Path to the presentation HTML
 * @param title - Title for the PDF file (for display purposes)
 */
export function openPresentationForPDFExport(presentationPath: string, title: string): void {
	window.open(presentationPath, '_blank', 'noopener,noreferrer');
}
