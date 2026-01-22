# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Electron + Angular** desktop application for building professional resumes. The app allows users to create, edit, and export comprehensive CVs with rich formatting support via Meta's Lexical editor.

**Key Architecture**: Dual-layer application with Electron as the desktop wrapper and Angular 20 (standalone components) as the frontend framework.

## Development Commands

### Starting Development Environment
```bash
npm run start
```
Runs Angular dev server (port 4200) and Electron concurrently with hot reload enabled.

### Individual Services
```bash
# Angular only (serves on localhost:4200)
npm run angular-serve
# or from angular-app directory:
cd angular-app && ng serve

# Electron only (requires Angular server running)
npm run electron-dev

# Electron in production mode (loads from dist)
npm run electron
```

### Building
```bash
# Build Angular app for production
npm run angular-build

# Build complete Electron app (includes Angular build + packaging)
npm run build
```

### Testing
```bash
# Run Angular unit tests
cd angular-app && npm test

# Run with code coverage
cd angular-app && ng test --code-coverage
```

## Architecture

### Dual Package Structure
- **Root `package.json`**: Electron dependencies and orchestration scripts
- **`angular-app/package.json`**: Angular app dependencies and Angular CLI commands

### Electron Main Process (`main.js`)
- Creates BrowserWindow (1200x800)
- Development mode: loads `http://localhost:4200`
- Production mode: loads from `angular-app/dist/angular-app/browser/index.html`
- Security: `nodeIntegration: false`, `contextIsolation: true`

### Angular Application Structure

**Entry Point**: `angular-app/src/main.ts` → bootstraps standalone `AppComponent`

**Core Components**:
- `app/project-form/`: Main resume builder form (primary UI component)
- `app/html-editor/`: Lexical rich text editor component (vanilla JS integration)
- `app/entity/`: TypeScript interfaces for data model (see Data Model below)

**Routing**: Uses Angular Router with standalone components (`app.routes.ts`)

**Configuration**: Angular 20 with strict TypeScript settings, standalone components architecture

### Data Model

All interfaces are in `angular-app/src/app/entity/`:

```typescript
Resume {
  name, telephone, location, email, possition, presentation (HTML),
  socialmedias: SocialMedia[],
  skills: Skill[],           // with proficiency percentage (0-100)
  languages: Language[],     // with proficiency percentage (0-100)
  historicals: Historical[], // work experience with nested projects
  educations: Education[],
  certificates: Certificate[]
}

Historical {
  company, start, end, tecnical, manager, tecnical_short, manager_short,
  projects: Project[]        // nested project management
}
```

**Important**: The app organizes work experience by company, with each company containing multiple projects. This nested structure is central to the resume builder's functionality.

### Lexical Editor Integration

**Framework**: Meta's Lexical editor (vanilla JS integration with Angular)

**Location**: `angular-app/src/app/html-editor/`

**Dependencies**:
- `lexical` - Core editor engine
- `@lexical/html` - HTML serialization/deserialization
- `@lexical/rich-text` - Text formatting (bold, italic, underline)
- `@lexical/list` - List support (bullet, numbered)
- `@lexical/link` - Hyperlink support
- `@lexical/utils` - Utility functions

**Features**:
- Basic text formatting (bold, italic, underline)
- Lists (bulleted and numbered)
- HTML content persistence (backward compatible with previous data)
- Click-to-edit interface with display/edit modes
- Angular forms integration via ControlValueAccessor
- No external API key required (open source)

**Usage**:
- `personal-info-section.ts` - Professional presentation field
- `experience-section.ts` - Company and project description fields (8 editors)

**Total**: 9 rich text editor instances across the application

## Build & Distribution

**Electron Builder Configuration** (in root `package.json`):
- Output directory: `dist/`
- Includes: `main.js`, `img/**/*`, `angular-app/dist/**/*`
- Windows: NSIS installer with icon from `img/favicon.ico`
- macOS: DMG with app bundle
- Linux: AppImage

**Angular Build**: Uses `--base-href ./` for proper asset loading in Electron

## Development Workflow

1. **Make Angular changes**: Edit files in `angular-app/src/app/`
2. **Hot reload**: Angular dev server auto-reloads on file changes
3. **Test Electron integration**: Use `npm run start` to verify desktop app behavior
4. **Build for distribution**: Run `npm run build` to package app

## Important Notes

- **Port Configuration**: Angular dev server uses port 4200 (configurable via `--port`)
- **Environment Detection**: `process.env.NODE_ENV === 'development'` determines load source
- **Data Persistence**: Resume data exported/imported as JSON files via user interaction
- **Styling**: Uses custom CSS with gradient backgrounds, card-based layouts, responsive design
- **TypeScript Strictness**: Angular app uses strict mode with comprehensive compiler checks
- **Recent Work**: Latest commits show work on company-based sections and form editing features
