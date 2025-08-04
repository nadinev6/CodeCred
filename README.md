# CodeCred Mobile App

A professional mobile application built with React Native and Expo, designed to showcase and verify developer credentials through blockchain technology. The app features a clean, GitHub-inspired interface for discovering, submitting, and verifying code repositories.

## 🎯 Project Goals

CodeCred & DevPeer aims to create a comprehensive platform where developers can:
- **Showcase verified projects** with blockchain-backed credentials
- **Discover quality repositories** through a curated feed
- **Submit projects for verification** with an intuitive multi-step flow
- **Build trusted developer profiles** with verifiable achievements

## 🚀 Features

### Core Functionality
- **Profile Management**: Clean user profiles with stats, verified projects, and professional presentation
- **Discovery Feed**: Search and filter through verified projects with advanced discovery tools
- **Project Submission**: Multi-step verification flow for repository submissions
- **Project Details**: Comprehensive project views with metrics, language distribution, and README display
- **Verification System**: Blockchain-based project verification and credentialing

### Design & UX
- **GitHub-Inspired UI**: Professional, clean interface mimicking GitHub's mobile design
- **Dark Theme**: Elegant dark mode optimized for developer preferences
- **Responsive Design**: Optimized for various mobile screen sizes
- **Smooth Animations**: Polished micro-interactions and transitions
- **Modern Navigation**: Bottom tab navigation with intuitive user flows

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router with bottom tabs
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: React Native Paper + Custom Components
- **Icons**: Lucide React Native
- **State Management**: React hooks and local state
- **Type Safety**: TypeScript throughout

## 📱 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd codecred-mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Running on Devices

#### iOS (requires macOS)
```bash
# Run on iOS simulator
npx expo run:ios

# Or open in Xcode
npx expo run:ios --device
```

#### Android
```bash
# Run on Android emulator
npx expo run:android

# Or run on connected device
npx expo run:android --device
```

### Web Development
```bash
# Run on web browser
npx expo start --web
```

## 📁 Project Structure

```
├── app/                    # App screens and routing
│   ├── (tabs)/
│   │   ├── _layout.tsx    # Tab navigation layout
│   │   ├── index.tsx      # Profile screen
│   │   ├── feed.tsx       # Discovery feed
│   │   └── submit.tsx     # Project submission
│   ├── project/
│   │   └── [id].tsx       # Project detail screen
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── components/             # Reusable components
│   ├── ProjectCard.tsx    # Project display component
│   └── UserStats.tsx      # User statistics component
├── hooks/                 # Custom React hooks
│   └── useFrameworkReady.ts
├── assets/                # Images and static assets
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Background**: `#0d1117` (GitHub dark)
- **Surface**: `#161b22` (Card backgrounds)
- **Border**: `#30363d` (Subtle borders)
- **Text**: `#f0f6fc` (Primary text)
- **Text Muted**: `#7d8590` (Secondary text)
- **Accent**: `#238636` (Success/verified)
- **Blue**: `#1f6feb` (Links and actions)

### Typography
- Clean, readable fonts with proper hierarchy
- Monospace fonts for code display
- Consistent spacing and line heights

## 📋 Development Roadmap

### Phase 1: Core UI & Navigation ✅
- [x] Project setup with Expo and NativeWind
- [x] Bottom tab navigation implementation
- [x] Profile screen with user stats
- [x] Discovery feed with search and filtering
- [x] Multi-step project submission flow

### Phase 2: Feature-Specific UI ✅
- [x] Project detail views with metrics
- [x] Interactive star and flag buttons
- [x] Custom labeling system
- [x] Language distribution visualization
- [x] README and code display

### Phase 3: Smart Contract Integration (Planned)
- [ ] XION blockchain integration
- [ ] Reclaim Protocol implementation
- [ ] Automated verification system
- [ ] Community upvoting features

## 🔧 Configuration Files

### Essential Files
- **app.json**: Expo configuration
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **tailwind.config.js**: Tailwind CSS setup
- **metro.config.js**: Metro bundler configuration
- **babel.config.js**: Babel transpilation setup

## 🚀 Deployment

### Building for Production

#### iOS
```bash
# Create iOS build
npx expo build:ios

# Or use EAS Build (recommended)
npx eas build --platform ios
```

#### Android
```bash
# Create Android build
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform android
```

### Publishing Updates
```bash
# Publish updates via Expo
npx expo publish

# Or use EAS Update
npx eas update
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Review React Native [troubleshooting guide](https://reactnative.dev/docs/troubleshooting)
3. Open an issue in this repository

## 🙏 Acknowledgments

- Design inspiration from GitHub's mobile app
- Expo team for the excellent development framework
- React Native community for continuous improvements
- Tailwind CSS team for the utility-first CSS approach

---

**Happy coding!** 🚀