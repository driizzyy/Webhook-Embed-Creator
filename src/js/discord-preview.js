// Discord Preview System
class DiscordPreview {
    constructor() {
        this.themes = {
            dark: {
                background: '#36393f',
                channelBg: '#2f3136',
                textPrimary: '#ffffff',
                textSecondary: '#dcddde',
                textMuted: '#8e9297',
                borderColor: '#40444b'
            },
            light: {
                background: '#ffffff',
                channelBg: '#f2f3f5',
                textPrimary: '#2e3338',
                textSecondary: '#2e3338',
                textMuted: '#4f5660',
                borderColor: '#e3e5e8'
            }
        };
        
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.updateTimestamp();
        
        // Update timestamp every minute
        setInterval(() => {
            this.updateTimestamp();
        }, 60000);
    }

    setupThemeToggle() {
        const lightBtn = document.getElementById('preview-light');
        const darkBtn = document.getElementById('preview-dark');
        const preview = document.getElementById('discord-preview');

        if (lightBtn && darkBtn) {
            lightBtn.addEventListener('click', () => {
                this.setTheme('light');
                lightBtn.classList.add('active');
                darkBtn.classList.remove('active');
            });

            darkBtn.addEventListener('click', () => {
                this.setTheme('dark');
                darkBtn.classList.add('active');
                lightBtn.classList.remove('active');
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        const preview = document.getElementById('discord-preview');
        
        if (theme === 'light') {
            preview.classList.add('light');
        } else {
            preview.classList.remove('light');
        }
    }

    updateTimestamp() {
        const timestamp = document.querySelector('.message-timestamp');
        if (timestamp) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            timestamp.textContent = `Today at ${timeString}`;
        }
    }

    // Generate realistic Discord message structure
    generateMessagePreview(data) {
        const messageHtml = `
            <div class="discord-message">
                <div class="message-avatar">
                    <img src="${data.webhook.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'}" 
                         alt="Bot Avatar" 
                         onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-username">${this.escapeHtml(data.webhook.username || 'Webhook Bot')}</span>
                        <span class="bot-tag">BOT</span>
                        <span class="message-timestamp">${this.getCurrentTimestamp()}</span>
                    </div>
                    ${data.content ? `<div class="message-text">${this.formatText(data.content)}</div>` : ''}
                    ${this.generateEmbedHtml(data.embed)}
                </div>
            </div>
        `;
        
        return messageHtml;
    }

    generateEmbedHtml(embed) {
        if (!this.hasEmbedContent(embed)) {
            return '';
        }

        let embedHtml = `<div class="message-embed" style="border-left-color: ${this.getColorHex(embed.color)};">`;
        embedHtml += '<div class="embed-content">';

        // Author
        if (embed.author && embed.author.name) {
            embedHtml += '<div class="embed-author">';
            if (embed.author.iconUrl) {
                embedHtml += `<img src="${this.escapeHtml(embed.author.iconUrl)}" 
                                  class="embed-author-icon" 
                                  alt="Author Icon"
                                  onerror="this.style.display='none'">`;
            }
            if (embed.author.url) {
                embedHtml += `<a href="${this.escapeHtml(embed.author.url)}" 
                                target="_blank" 
                                class="embed-author-name">${this.escapeHtml(embed.author.name)}</a>`;
            } else {
                embedHtml += `<span class="embed-author-name">${this.escapeHtml(embed.author.name)}</span>`;
            }
            embedHtml += '</div>';
        }

        // Thumbnail
        if (embed.thumbnail && embed.thumbnail.url) {
            embedHtml += `<img src="${this.escapeHtml(embed.thumbnail.url)}" 
                              class="embed-thumbnail" 
                              alt="Thumbnail"
                              onerror="this.style.display='none'">`;
        }

        // Title
        if (embed.title) {
            if (embed.url) {
                embedHtml += `<a href="${this.escapeHtml(embed.url)}" 
                                target="_blank" 
                                class="embed-title clickable">${this.escapeHtml(embed.title)}</a>`;
            } else {
                embedHtml += `<div class="embed-title">${this.escapeHtml(embed.title)}</div>`;
            }
        }

        // Description
        if (embed.description) {
            embedHtml += `<div class="embed-description">${this.formatText(embed.description)}</div>`;
        }

        // Fields
        if (embed.fields && embed.fields.length > 0) {
            embedHtml += this.generateFieldsHtml(embed.fields);
        }

        // Image
        if (embed.image && embed.image.url) {
            embedHtml += `<img src="${this.escapeHtml(embed.image.url)}" 
                              class="embed-image" 
                              alt="Embed Image"
                              onerror="this.style.display='none'">`;
        }

        // Footer
        if (embed.footer || embed.timestamp) {
            embedHtml += this.generateFooterHtml(embed);
        }

        embedHtml += '</div></div>';
        return embedHtml;
    }

    generateFieldsHtml(fields) {
        let fieldsHtml = '<div class="embed-fields">';
        
        fields.forEach(field => {
            if (field.name && field.value) {
                const fieldClass = field.inline ? 'embed-field inline' : 'embed-field';
                fieldsHtml += `
                    <div class="${fieldClass}">
                        <div class="embed-field-name">${this.escapeHtml(field.name)}</div>
                        <div class="embed-field-value">${this.formatText(field.value)}</div>
                    </div>
                `;
            }
        });
        
        fieldsHtml += '</div>';
        return fieldsHtml;
    }

    generateFooterHtml(embed) {
        let footerHtml = '<div class="embed-footer">';
        
        if (embed.footer && embed.footer.iconUrl) {
            footerHtml += `<img src="${this.escapeHtml(embed.footer.iconUrl)}" 
                               class="embed-footer-icon" 
                               alt="Footer Icon"
                               onerror="this.style.display='none'">`;
        }
        
        let footerText = '';
        if (embed.footer && embed.footer.text) {
            footerText += this.escapeHtml(embed.footer.text);
        }
        
        if (embed.timestamp) {
            if (footerText) footerText += ' • ';
            footerText += this.formatTimestamp(embed.timestamp);
        }
        
        footerHtml += `<span>${footerText}</span>`;
        footerHtml += '</div>';
        
        return footerHtml;
    }

    hasEmbedContent(embed) {
        return embed.title || 
               embed.description || 
               (embed.author && embed.author.name) ||
               (embed.thumbnail && embed.thumbnail.url) ||
               (embed.image && embed.image.url) ||
               (embed.fields && embed.fields.length > 0) ||
               (embed.footer && embed.footer.text) ||
               embed.timestamp;
    }

    getColorHex(color) {
        if (typeof color === 'string') {
            return color.startsWith('#') ? color : `#${color}`;
        }
        return `#${color.toString(16).padStart(6, '0')}`;
    }

    getCurrentTimestamp() {
        const now = new Date();
        return now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    formatText(text) {
        return this.escapeHtml(text)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
            .replace(/__(.*?)__/g, '<u>$1</u>')               // Underline
            .replace(/~~(.*?)~~/g, '<del>$1</del>')           // Strikethrough
            .replace(/`(.*?)`/g, '<code>$1</code>')           // Inline code
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code block
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // Links
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Animate message appearance
    animateMessage() {
        const message = document.querySelector('.discord-message');
        if (message) {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
                message.style.transition = 'all 0.3s ease';
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            });
        }
    }

    // Validate image URLs
    validateImageUrl(url) {
        return new Promise((resolve) => {
            if (!url) {
                resolve(false);
                return;
            }
            
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            
            // Timeout after 5 seconds
            setTimeout(() => resolve(false), 5000);
        });
    }

    // Add typing indicator
    showTypingIndicator() {
        const messagesContainer = document.querySelector('.discord-messages');
        if (!messagesContainer) return;

        const typingHtml = `
            <div class="typing-indicator">
                <div class="typing-avatar">
                    <img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="Bot Avatar">
                </div>
                <div class="typing-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        const existingTyping = messagesContainer.querySelector('.typing-indicator');
        if (existingTyping) {
            existingTyping.remove();
        }

        messagesContainer.insertAdjacentHTML('beforeend', typingHtml);

        // Remove after 2 seconds
        setTimeout(() => {
            const typing = messagesContainer.querySelector('.typing-indicator');
            if (typing) {
                typing.remove();
            }
        }, 2000);
    }

    // Add realistic Discord channel activity
    addChannelActivity() {
        const activities = [
            '🟢 Someone is typing...',
            '📝 Message edited',
            '👍 Reaction added',
            '🎵 Now playing: Discord Embed Creator',
            '🎮 Playing a game',
            '📱 Mobile user joined'
        ];

        const channelDescription = document.querySelector('.channel-description');
        if (channelDescription) {
            const originalText = channelDescription.textContent;
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            
            channelDescription.textContent = randomActivity;
            channelDescription.style.color = '#43b581';

            setTimeout(() => {
                channelDescription.textContent = originalText;
                channelDescription.style.color = '';
            }, 3000);
        }
    }

    // Enhanced error handling for images
    handleImageError(img) {
        img.style.display = 'none';
        
        // Add broken image placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'broken-image-placeholder';
        placeholder.innerHTML = '<i class="fas fa-image"></i><span>Image failed to load</span>';
        placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem;
            background: var(--bg-quaternary);
            border: 1px dashed var(--border-color);
            border-radius: 4px;
            color: var(--text-muted);
            font-size: 0.8rem;
        `;
        
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    }

    // Real-time character count for preview
    updateCharacterCount() {
        const elements = {
            title: document.getElementById('embed-title'),
            description: document.getElementById('embed-description'),
            content: document.getElementById('message-content')
        };

        Object.entries(elements).forEach(([key, element]) => {
            if (element) {
                const length = element.value.length;
                const maxLengths = {
                    title: 256,
                    description: 4096,
                    content: 2000
                };
                
                const percentage = (length / maxLengths[key]) * 100;
                
                // Update visual indicator
                if (percentage > 90) {
                    element.style.borderColor = '#ed4245';
                } else if (percentage > 75) {
                    element.style.borderColor = '#faa61a';
                } else {
                    element.style.borderColor = '';
                }
            }
        });
    }
}

// CSS for additional Discord preview features
const additionalStyles = `
    .typing-indicator {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        opacity: 0.7;
    }

    .typing-avatar img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .typing-content {
        display: flex;
        align-items: center;
    }

    .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
        background: var(--bg-tertiary);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
    }

    .typing-dots span {
        width: 6px;
        height: 6px;
        background: var(--text-muted);
        border-radius: 50%;
        animation: typing-bounce 1.4s infinite ease-in-out both;
    }

    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typing-bounce {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .broken-image-placeholder {
        margin: 0.5rem 0;
    }

    .embed-field.inline {
        min-width: 0;
        flex: 1 1 33.333%;
        margin-right: 0.5rem;
    }

    .embed-fields {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .embed-content code {
        background: rgba(79, 84, 92, 0.4);
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 0.85em;
    }

    .embed-content pre {
        background: rgba(79, 84, 92, 0.4);
        border: 1px solid rgba(79, 84, 92, 0.6);
        border-radius: 4px;
        padding: 0.5rem;
        margin: 0.5rem 0;
        overflow-x: auto;
    }

    .embed-content pre code {
        background: none;
        padding: 0;
        border-radius: 0;
    }

    .embed-content a {
        color: #00aff4;
        text-decoration: none;
    }

    .embed-content a:hover {
        text-decoration: underline;
    }

    .discord-preview.light .embed-content code,
    .discord-preview.light .embed-content pre {
        background: rgba(116, 127, 141, 0.1);
        border-color: rgba(116, 127, 141, 0.2);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize Discord preview system
let discordPreview;
document.addEventListener('DOMContentLoaded', () => {
    discordPreview = new DiscordPreview();
    console.log('🎨 Discord Preview System initialized!');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiscordPreview;
}
