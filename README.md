# Discord Webhook Embed Creator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen.svg)](https://driizzyy.github.io/Webhook-Embed-Creator/)
[![Discord](https://img.shields.io/badge/Discord-Embeds-7289da.svg)](https://discord.com)

A professional, feature-rich Discord embed creator with real-time preview and direct webhook integration. Create stunning Discord embeds with zero coding knowledge required.

![Discord Embed Creator Preview](src/assets/preview.png)

## ✨ Features

### 🎨 **Advanced Embed Customization**
- **Real-time Preview** - See your embed as you type with authentic Discord styling
- **Full Color Control** - Custom color picker with popular Discord color presets
- **Rich Text Support** - Bold, italic, underline, strikethrough, and code formatting
- **Unlimited Fields** - Add up to 25 custom fields with inline support
- **Media Integration** - Thumbnails, images, author icons, and footer icons

### 🚀 **Professional Features**
- **Direct Webhook Sending** - Send embeds directly to Discord with one click
- **Template System** - Save and load embed templates for quick reuse
- **JSON Export** - Export embed data for use in bots and applications
- **Mobile Responsive** - Create embeds on any device
- **Theme Toggle** - Preview embeds in Discord's light and dark themes

### 🛠️ **Developer Friendly**
- **Webhook Validation** - Real-time validation of Discord webhook URLs
- **Character Counters** - Stay within Discord's limits with live character counts
- **Error Handling** - Comprehensive error messages and validation
- **No Dependencies** - Pure HTML, CSS, and JavaScript

## 🚀 Getting Started

### 📱 **Online Use**
Visit the live website: **[https://driizzyy.github.io/Webhook-Embed-Creator/](https://driizzyy.github.io/Webhook-Embed-Creator/)**

### 💻 **Local Development**

1. **Clone the repository**
   ```bash
   git clone https://github.com/driizzyy/Webhook-Embed-Creator.git
   cd Webhook-Embed-Creator
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Start creating embeds!**
   Navigate to `src/creator.html` to access the embed creator tool.

## 📖 How to Use

### 1. **Set Up Your Webhook**
- Go to your Discord server settings
- Navigate to **Integrations** → **Webhooks**
- Create a new webhook and copy the URL
- Paste the URL in the "Webhook URL" field

### 2. **Design Your Embed**
- **Basic Info**: Add title, description, and URL
- **Styling**: Choose colors and enable sections as needed
- **Content**: Add author info, images, fields, and footer
- **Preview**: Watch your embed update in real-time

### 3. **Send or Export**
- **Send to Discord**: Click "Send to Discord" to post immediately
- **Save Template**: Save your design for future use
- **Export JSON**: Download the embed data for bot development

## 🎯 Discord Embed Anatomy

```javascript
{
  "title": "Your Embed Title",
  "description": "Your embed description with **formatting**",
  "color": 5814015,
  "author": {
    "name": "Author Name",
    "url": "https://example.com",
    "icon_url": "https://example.com/icon.png"
  },
  "thumbnail": {
    "url": "https://example.com/thumbnail.png"
  },
  "fields": [
    {
      "name": "Field Name",
      "value": "Field Value",
      "inline": true
    }
  ],
  "image": {
    "url": "https://example.com/image.png"
  },
  "footer": {
    "text": "Footer Text",
    "icon_url": "https://example.com/footer-icon.png"
  },
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

## 🔧 Discord Limits

| Element | Character Limit |
|---------|----------------|
| **Title** | 256 characters |
| **Description** | 4,096 characters |
| **Field Name** | 256 characters |
| **Field Value** | 1,024 characters |
| **Footer Text** | 2,048 characters |
| **Author Name** | 256 characters |
| **Total Fields** | 25 fields maximum |
| **Total Characters** | 6,000 characters across all fields |

## 🎨 Supported Formatting

| Markdown | Result |
|----------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `__underline__` | <u>underline</u> |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `code` `` | `code` |
| ``` ```code block``` ``` | ```code block``` |

## 🌟 Advanced Features

### **Template Management**
- Save unlimited embed templates locally
- Quick load system for frequently used designs
- Template sharing via JSON export/import

### **Real-time Validation**
- Webhook URL format validation
- Character limit enforcement
- Image URL validation
- Required field highlighting

### **Professional Styling**
- Authentic Discord appearance
- Smooth animations and transitions
- Mobile-optimized interface
- Accessibility features

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and structure
- Test thoroughly across different browsers
- Ensure mobile responsiveness
- Add comments for complex functionality
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Discord** - For the amazing platform and webhook system
- **Font Awesome** - For the beautiful icons
- **Google Fonts** - For the Inter typeface
- **Discord Community** - For inspiration and feedback

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/driizzyy/Webhook-Embed-Creator/issues)
- **GitHub Profile**: [@driizzyy](https://github.com/driizzyy)
- **Website**: [Live Demo](https://driizzyy.github.io/Webhook-Embed-Creator/)

## 🔗 Related Projects

- [Discord.js](https://discord.js.org/) - Powerful Discord bot framework
- [Discord Webhook Guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) - Official Discord documentation
- [Discord API Documentation](https://discord.com/developers/docs/intro) - Complete Discord API reference

---

<div align="center">

**Made with ❤️ by [driizzyy](https://github.com/driizzyy)**

**⭐ Star this repository if you found it helpful!**

[🌐 Live Demo](https://driizzyy.github.io/Webhook-Embed-Creator/) • 
[📝 Report Bug](https://github.com/driizzyy/Webhook-Embed-Creator/issues) • 
[💡 Request Feature](https://github.com/driizzyy/Webhook-Embed-Creator/issues)

</div>
