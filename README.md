# Presentations

A Nord-themed presentation gallery powered by **Marp** (Markdown Presentation Ecosystem) and **SvelteKit**.

## Features

- 🎨 **Custom Nord Theme** - Beautiful dark theme with Nord color palette
- 📝 **Markdown-based** - Write presentations in simple Markdown
- 🎬 **Film Grain Effect** - Subtle texture for visual interest
- 💻 **Code Highlighting** - Syntax highlighting with Nord colors
- 📱 **Responsive** - Works on all devices
- 📄 **PDF Export** - Built-in PDF generation
- 🎯 **Gallery View** - Browse all your presentations

## Getting Started

### Development

```bash
# Install dependencies
yarn install

# Start development server (builds presentations first)
yarn dev
```

Visit `http://localhost:5173` to see the gallery.

### Building

```bash
# Build presentations and app
yarn build

# Preview production build
yarn preview
```

## Creating Presentations

### 1. Create a Markdown File

Create a new `.md` file in the `presentations/` directory:

```markdown
---
marp: true
theme: nord
paginate: true
footer: 'Your Name'
---

<!-- _class: title -->

# Your Presentation Title

## Subtitle

Your Name
Date

---

## Slide 2

Your content here...

---

## Code Example

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
```

### 2. Add Build Script

Update `package.json` to include your new presentation:

```json
"build:presentations": "marp --theme themes/nord.css --html --output static/presentations/your-talk/index.html presentations/your-talk.md"
```

### 3. Add to Gallery

Add your presentation metadata in `src/lib/data/presentations.ts`:

```typescript
{
  id: '2',
  slug: 'your-talk',
  title: 'Your Talk Title',
  description: 'Description of your talk',
  createdAt: new Date('2025-01-15'),
  thumbnail: '/presentations/your-talk/thumbnail.svg',
  youtubeLinks: [],
  slidesPath: '/presentations/your-talk/index.html',
  tags: ['tag1', 'tag2']
}
```

## Marp Syntax

### Slide Separator

Use `---` to separate slides:

```markdown
## Slide 1

Content

---

## Slide 2

More content
```

### Directives

- `<!-- _class: title -->` - Apply the title class to current slide
- `<!-- _paginate: false -->` - Hide pagination on current slide
- `<!-- _footer: "" -->` - Hide footer on current slide

### Two-Column Layout

```markdown
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2em;">
<div>

### Column 1
Content

</div>
<div>

### Column 2
More content

</div>
</div>
```

### Custom Styling

Use CSS classes defined in `themes/nord.css`:

- `.accent-frost` - Frost blue color
- `.accent-aurora` - Aurora yellow color
- `.highlight` - Highlighted background

## Nord Theme

The custom Nord theme (`themes/nord.css`) includes:

- **Colors**: Full Nord color palette
- **Typography**: Clean, readable fonts
- **Code Highlighting**: Nord-themed syntax colors
- **Film Grain**: Subtle texture overlay
- **Responsive**: Works on all screen sizes

### Available Colors

```css
--nord0 to --nord15  /* Full Nord palette */
```

## PDF Export

To export a presentation as PDF:

1. Click a presentation in the gallery
2. Click "Export to PDF"
3. In the print dialog:
   - Set to **Landscape**
   - Margins to **None**
   - Enable **Background graphics**
4. Save as PDF

## Tech Stack

- **Marp CLI** - Markdown to presentation conversion
- **SvelteKit** - Web framework
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Vercel** - Deployment

## Project Structure

```
├── presentations/          # Markdown presentation files
├── themes/                # Custom Marp themes
│   └── nord.css          # Nord theme
├── static/
│   └── presentations/    # Built HTML presentations
├── src/
│   ├── lib/
│   │   ├── components/   # Svelte components
│   │   ├── data/         # Presentation metadata
│   │   ├── stores/       # State management
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # Utility functions
│   └── routes/           # SvelteKit routes
└── package.json          # Dependencies and scripts
```

## License

MIT
