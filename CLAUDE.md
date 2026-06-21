# CLAUDE.md

Interface code repository for [SAPedia](https://saoaw.com). Source in `src/` is compiled to `dist/` and deployed to wiki pages across `MediaWiki:` and `Widget:` namespaces.

## Commands

```bash
pnpm run build              # Compile all sources to dist/
pnpm run deploy -- --dry-run  # Preview deployment without committing
pnpm run lint               # oxlint code analysis
pnpm run fmt                # oxfmt formatting
pnpm tsc --noEmit           # TypeScript type checking
```

## Project Structure

```
src/
  gadgets/              # One subdirectory per gadget
    Gadget-<Name>.ts    # Gadget source (compiled to IIFE + minified by esbuild)
    Gadget-<Name>.css   # Styles-only gadgets output directly
    definition.yaml     # ResourceLoader config
  global/               # Global skin overrides (e.g. Citizen.css)
  types/                # mediawiki.d.ts (imports types-mediawiki)

scripts/
  build/
    core.ts             # Entry: clean dist/ → glob scan → compile → generate definition
    compile.ts          # JS → esbuild IIFE; SCSS → sass-embedded → lightningcss
    definition.ts       # Gadgets-definition + Chinese variant descriptions (opencc-js)
  deploy/
    deploy.ts           # Connect to wiki API via mwn, incremental deploy (SHA-256 diff)
    mapping.ts          # dist path → wiki page title mapping
    summary.ts          # Git log → edit summary formatting
    utils.ts            # Hash computation and diff comparison
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

## Coding Patterns

- Entry points use IIFE: `(() => { ... })()` or `$(() => { ... })`
- Chinese language variants via `wgULS(hans, hant, cn, tw, hk, sg, zh, mo, my)` and `wgUVS(…)`, defined in `site-lib`
- Wiki config accessed through `mw.config.get()` (`wgAction`, `wgPageName`, etc.)
- Always use curly braces for control flow statements (`if`, `else`, `for`, `while`), even for single-line bodies

## Deployment

- **Auto**: GitHub Actions triggers on push to `main` touching `src/gadgets/**`, `src/global/**`, or `src/widgets/**`
- **Incremental**: compares file SHA-256 against `MediaWiki:Deployment.json`, only pushes changes
- **`dist/` is tracked in git** — built artifacts must be committed alongside source changes.
