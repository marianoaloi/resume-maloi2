# 📄 Resume Builder

A modern, comprehensive resume builder application built with **Electron** and **Angular**. Create, edit, and manage professional resumes with an intuitive interface that supports complex data structures and rich formatting.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Section Resume Builder**: Personal info, skills, experience, education, certificates, and social media
- **Rich Text Support**: HTML formatting for professional presentations and descriptions
- **Interactive UI**: Click-to-edit fields with smart display/edit mode switching
- **Visual Skills Display**: Progress bars and percentage indicators for skills and languages
- **Nested Project Management**: Detailed project tracking within work experience
- **Import/Export**: Save and load resume data as JSON files

### 💼 Professional Sections
- **Personal Information**: Name, position, contact details, professional summary
- **Social Media & Links**: Professional profiles and portfolio links
- **Skills & Technologies**: Technical skills with proficiency levels (0-100%)
- **Languages**: Language proficiency with visual indicators
- **Work Experience**: Detailed company history with nested projects
- **Education**: Academic background with degrees and dates
- **Certificates**: Professional certifications with verification links

### 🎨 User Experience
- **Modern Interface**: Clean, responsive design with gradient backgrounds
- **Sectioned Navigation**: Tabbed interface with icons for easy navigation
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Instant visual feedback for all changes
- **Professional Styling**: Card-based layout with hover effects and animations

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-maloi2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular dependencies**
   ```bash
   cd angular-app
   npm install
   cd ..
   ```

### Development

**Start the development environment:**
```bash
npm run start
```

This command will:
- Start the Angular development server on port 4202
- Launch the Electron application
- Enable hot reload for development

**Individual commands:**
```bash
# Start only Angular dev server
npm run angular-serve

# Start only Electron (requires Angular to be running)
npm run electron-dev

# Run Electron in production mode
npm run electron
```

### Building for Production

**Build the application:**
```bash
npm run build
```

This will:
1. Build the Angular application with proper base href
2. Package the Electron application using electron-builder
3. Create platform-specific installers in the `dist/` folder

## 🏗️ Project Structure

```
resume-maloi2/
├── main.js                 # Electron main process
├── package.json            # Main package configuration
├── img/                    # Application assets
│   └── favicon.ico         # App icon
├── angular-app/            # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── entity/     # TypeScript interfaces
│   │   │   │   ├── resume.interface.ts
│   │   │   │   ├── historical.interface.ts
│   │   │   │   ├── project.interface.ts
│   │   │   │   ├── skill.interface.ts
│   │   │   │   └── ...
│   │   │   └── project-form/  # Main resume form component
│   │   │       ├── project-form.ts
│   │   │       ├── project-form.html
│   │   │       └── project-form.css
│   │   └── index.html
│   └── package.json        # Angular dependencies
└── dist/                   # Build output (ignored by git)
```

## 💾 Data Structure

The application uses a comprehensive JSON structure to store resume data:

```typescript
interface Resume {
  name: string;
  telephone: string;
  location: string;
  email: string;
  possition: string;
  presentation: string;        // HTML formatted
  socialmedias: SocialMedia[];
  skills: Skill[];            // with proficiency levels
  languages: Language[];      // with proficiency levels
  historicals: Historical[];  // work experience with projects
  educations: Education[];
  certificates: Certificate[];
}
```

### Example Data Flow
1. **Input**: User enters data through intuitive forms
2. **Storage**: Data is stored in structured TypeScript interfaces
3. **Display**: Rich HTML content is rendered for presentation sections
4. **Export**: Complete resume exported as JSON file
5. **Import**: JSON files can be loaded to continue editing

## 🛠️ Technology Stack

### Frontend
- **Angular 18+**: Modern web framework with standalone components
- **TypeScript**: Type-safe development
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **HTML5**: Semantic markup with rich text support

### Desktop
- **Electron**: Cross-platform desktop application framework
- **Node.js**: JavaScript runtime for the main process

### Development Tools
- **Angular CLI**: Development server and build tools
- **Electron Builder**: Application packaging and distribution
- **Concurrently**: Run multiple npm scripts simultaneously
- **Cross-env**: Cross-platform environment variables

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start development environment (Angular + Electron) |
| `npm run angular-serve` | Start Angular development server only |
| `npm run angular-build` | Build Angular application for production |
| `npm run electron` | Run Electron in production mode |
| `npm run electron-dev` | Run Electron in development mode |
| `npm run build` | Build complete application for distribution |

## 🎨 Customization

### Styling
- **CSS Variables**: Easy theme customization
- **Component Styles**: Modular CSS for each component
- **Responsive Design**: Mobile-first approach

### Adding New Sections
1. Create interface in `angular-app/src/app/entity/`
2. Add to main `Resume` interface
3. Update form component with new section
4. Add navigation tab and styling

### Modifying Data Structure
1. Update TypeScript interfaces in `entity/` folder
2. Modify form components to match new structure
3. Update import/export functionality if needed

## 🔧 Configuration

### Electron Builder
The application is configured for cross-platform builds:
- **Windows**: NSIS installer
- **macOS**: DMG with app bundle
- **Linux**: AppImage

### App Icon
- Location: `img/favicon.ico`
- Used for window icon and packaged application
- Configured for all platforms

## 🚀 Deployment

The application can be built for multiple platforms:

```bash
# Build for current platform
npm run build

# Build for specific platforms (requires platform-specific setup)
npx electron-builder --win
npx electron-builder --mac
npx electron-builder --linux
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🙏 Acknowledgments

- **Angular Team**: For the robust web framework
- **Electron Team**: For enabling desktop application development
- **Community**: For the amazing open-source tools and libraries

---

**Built with ❤️ using Angular and Electron**