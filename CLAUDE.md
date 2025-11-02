# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Electron + Angular** desktop application for building professional resumes. The app allows users to create, edit, and export comprehensive CVs with rich formatting support via TinyMCE.

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
- `app/html-editor/`: TinyMCE rich text editor wrapper component
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

### TinyMCE Integration

**API Key Setup Required**: The app uses TinyMCE Cloud requiring an API key.

**Environment Files**:
- `angular-app/src/environments/environment.ts` (development)
- `angular-app/src/environments/environment.prod.ts` (production - currently missing from repo structure)

**Setup Process**:
1. Get free API key from https://www.tiny.cloud/get-tiny/
2. Run `node setup-api-key.js YOUR_API_KEY` OR
3. Manually replace `#$API_KEY_$#` placeholder in environment files

**Security**: Real API keys should be in `.env.local` and git-ignored. The placeholder `#$API_KEY_$#` is safe to commit.

See [TINYMCE-SETUP.md](TINYMCE-SETUP.md) for detailed instructions.

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
