# Discord Webhook Embed Creator

A professional Discord embed creator with real-time preview and webhook integration.

## Project Structure

```
webhook-creator/
├── index.html              # Main landing page
├── README.md               # Project documentation
├── LICENSE                 # MIT License
└── src/                    # Source files directory
    ├── creator.html        # Embed creator interface
    ├── css/                # Stylesheets
    │   ├── main.css        # Main styles
    │   ├── creator.css     # Creator-specific styles
    │   └── animations.css  # Animation definitions
    ├── js/                 # JavaScript files
    │   ├── main.js         # Main functionality
    │   ├── creator.js      # Embed creator logic
    │   ├── animations.js   # Animation controllers
    │   └── discord-preview.js # Preview system
    └── assets/             # Static assets
        ├── favicon.svg     # Site favicon
        └── preview.png     # Social media preview image
```

## Features

- ✨ Real-time Discord embed preview
- 🎨 Advanced customization options
- 📱 Mobile-responsive design
- 🚀 Direct webhook integration
- 💾 Template save/load system
- 📤 JSON export functionality
- 🌙 Light/dark theme toggle
- ⚡ Professional animations

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No external dependencies
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typeface

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Navigate to `src/creator.html` for the embed creator

For best results, serve files through a local web server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
