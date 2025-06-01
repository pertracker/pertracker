# PerTracker - Period Tracking PWA

A privacy-focused period tracking Progressive Web App built with Vue.js.

## 🌟 Features

- 📊 **Cycle Statistics** - Track average cycle length, period duration, and predictions
- 📅 **Period Records** - Log start/end dates, flow intensity, symptoms, and notes
- 📱 **PWA Support** - Install as a native app on mobile and desktop
- 🔒 **Privacy First** - All data stored locally on your device
- 💾 **Import/Export** - Backup and restore your data with .pertrack files
- 🎨 **Dark Theme** - Beautiful dark UI design
- 📴 **Offline Support** - Works without internet connection

## 🚀 Installation

### As a PWA (Recommended)
1. Visit the app in your browser
2. Click "Install" when prompted, or use your browser's install option
3. The app will be added to your home screen/app drawer

### Local Development
1. Clone this repository
2. Open `index.html` in a web browser
3. Or serve with any static file server

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 (CDN), Vanilla CSS
- **PWA**: Service Worker, Web App Manifest
- **Storage**: LocalStorage
- **Icons**: Material Icons

## 📁 Project Structure

```
pertracker/
├── index.html          # Main app file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── icons/             # App icons
│   ├── icon-192.png
│   └── icon-512.png
├── screenshots/       # PWA screenshots
│   └── mobile.jpg
└── .well-known/       # Asset links for Android
    └── assetlinks.json
```

## 🔧 Development

### Making Changes
1. Edit the files
2. Test in browser
3. Commit changes:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

### PWA Testing
- Test on mobile devices
- Verify offline functionality
- Check service worker updates

## 📱 PWA Features

- ✅ Installable on mobile and desktop
- ✅ Offline functionality
- ✅ Background sync
- ✅ Push notifications support
- ✅ Responsive design
- ✅ App shortcuts
- ✅ File handling (.pertrack files)

## 🔒 Privacy

- All data is stored locally on your device
- No data is sent to external servers
- Export your data anytime with the backup feature

## 📄 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for period tracking privacy and convenience.
