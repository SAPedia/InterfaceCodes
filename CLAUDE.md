# CLAUDE.md

Interface code repository for [SAPedia](https://saoaw.com). Source in `src/` is compiled to `dist/` and deployed to wiki pages across `MediaWiki:` and `Widget:` namespaces.

## Commands

```bash
pnpm run build                # Compile all sources to dist/
pnpm run dev                  # Start Vite dev server for template preview
pnpm run deploy               # Deploy to wiki (requires .env with PASSWORD + USERAGENT)
pnpm run deploy -- --dry-run  # Preview deployment without pushing
pnpm run lint                 # oxlint + TypeScript type checking
pnpm run fmt                  # oxfmt formatting
```

## Project Structure

```
src/
  gadgets/              # MediaWiki gadgets — one subdirectory per gadget
    Gadget-<Name>.ts    # JS/TS source (compiled to IIFE + minified by esbuild)
    Gadget-<Name>.css   # Styles-only gadgets output directly
    Gadget-<Name>.scss  # SCSS compiled via sass-embedded → lightningcss
    definition.yaml     # ResourceLoader config
  global/               # Global skin overrides (e.g. Citizen.css)
  templates/            # React SSR templates → wikitext output
    <Name>/index.tsx    # Template entry (React component, SSR via react-dom/server)
  components/           # Shared React components for templates
    wikitext/           # Wikitext-specific renderers (link, image, template, transclude)
  lib/                  # Shared utilities (wiki path helpers, TokenList, config)
  types/                # TypeScript declarations (mediawiki.d.ts, site-lib.d.ts, etc.)

scripts/
  build/
    core.ts             # Entry: clean dist/ → glob scan → compile → generate
    compile.ts          # JS → esbuild IIFE; SCSS → sass-embedded → lightningcss
    definition.ts       # Gadgets-definition + Chinese variant descriptions (opencc-js)
    templates.ts        # React SSR build for template gadgets
    utils.ts            # Build constants and path helpers
  deploy/
    deploy.ts           # Connect to wiki API via mwn, incremental deploy (SHA-256 diff)
    mapping.ts          # dist path → wiki page title mapping
    summary.ts          # Git log → edit summary formatting
    utils.ts            # Hash computation and diff comparison
  dev/
    index.ts            # Pre-fetch wiki CSS for dev server
    vite.config.ts      # Vite config with React + Tailwind v4, path alias ~/ → src/
```

## Gadget Definition

Each gadget declares its ResourceLoader config via `definition.yaml`:

```yaml
# Gadget-CtrlS/definition.yaml
hidden: false # false → user can enable in Preferences
type: general # general (JS+CSS) or styles (CSS-only)
default: true # enabled by default
rights: [edit] # requires edit permission
files: [Gadget-CtrlS.js] # built output filename
dependencies: [] # ResourceLoader module deps (e.g. mediawiki.api)
```

Grouping and ordering is defined in `src/gadgets/Gadgets-definition-list.yaml` under four sections: User / Edit / Admin / Site.

## Build Pipeline

- **JS/TS**: esbuild → IIFE (format: 'iife'), minified, target ES2017
- **SCSS/CSS**: sass-embedded (SCSS only) → lightningcss (target-based transpile + minify via browserslist)
- **Tailwind CSS**: PostCSS + `@tailwindcss/postcss` → lightningcss minify (only for `Gadget-Tailwind.css`)
- **Templates**: React components → `renderToStaticMarkup` → wikitext wrapped in `<noinclude>` + `{{doc}}`
- **Widgets**: `src/widgets/<Name>/` → compiled JS/CSS wrapped in `<includeonly>` with conditional `$wg<Name>` guard
- All built files get a DO-NOT-EDIT header banner and `<nowiki>` wrappers
- **`dist/` is tracked in git** — built artifacts must be committed alongside source changes.

## Template System

Templates in `src/templates/<Name>/index.tsx` export a default function returning `ReactNode`. Built via `react-dom/server` SSR, output goes to `dist/templates/<Name>`. A dev server (`pnpm run dev`) with Vite + React + Tailwind v4 provides live preview. Path alias `~/*` → `src/*`.

## Path Aliases (tsconfig.json)

- `@/*` → `scripts/*` (build/deploy scripts)
- `~/*` → `src/*` (gadget source components/lib)

The tsconfig enables strict checks including `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals/Parameters`, `noImplicitReturns`, and `noPropertyAccessFromIndexSignature`.

## Chinese Language Variants

Handle via `wgULS(hans, hant, cn, tw, hk, sg, zh, mo, my)` and `wgUVS(...)`, defined in `site-lib`. The build script auto-generates variant descriptions for each gadget using opencc-js.

## Deployment

- **Auto**: GitHub Actions triggers on push to `main` touching `src/gadgets/**`, `src/global/**`, or `src/widgets/**`
- **Incremental**: compares file SHA-256 against `MediaWiki:Deployment.json`, only pushes changed files

## Coding Patterns

- Entry points use IIFE: `(() => { ... })()` or `$(() => { ... })`
- Wiki config accessed through `mw.config.get()` (`wgAction`, `wgPageName`, etc.)
- Always use curly braces for control flow statements (`if`, `else`, `for`, `while`), even for single-line bodies
