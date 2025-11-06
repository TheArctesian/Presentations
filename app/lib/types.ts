export type PresentationType = 'pdf' | 'revealjs';

export interface BasePresentation {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  thumbnail: string;
  type: PresentationType;
}

export interface PDFPresentation extends BasePresentation {
  type: 'pdf';
  pdfPath: string;
}

export interface RevealJsPresentation extends BasePresentation {
  type: 'revealjs';
  htmlPath: string;
}

export type Presentation = PDFPresentation | RevealJsPresentation;
