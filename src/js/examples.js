// Examples Page JavaScript
class ExamplesManager {
    constructor() {
        this.examples = {};
        this.currentFilter = 'all';
        this.currentModal = null;
        this.init();
    }

    init() {
        this.loadExampleData();
        this.setupFiltering();
        this.setupSearch();
        this.setupModals();
        this.setupThemeToggle();
        this.setupToastSystem();
        this.initAnimations();
    }

    loadExampleData() {
        // Example template data
        this.examples = {
            announcement: {
                category: 'announcements',
                title: 'Feature Announcement',
                description: 'Professional announcement template for new features and updates',
                tags: ['Announcements', 'Updates'],
                json: {
                    embeds: [{
                        author: {
                            name: "Server Announcements",
                            icon_url: "https://cdn.discordapp.com/emojis/741243686352773171.png"
                        },
                        title: "🎉 New Features Released!",
                        description: "We're excited to announce some amazing new features that will enhance your Discord experience:\n\n**✨ What's New:**\n• Enhanced moderation tools\n• Custom role colors\n• Improved voice quality\n• New emoji packs",
                        color: 0x5865F2,
                        fields: [
                            {
                                name: "Release Date",
                                value: "Today, 3:00 PM EST",
                                inline: true
                            },
                            {
                                name: "Next Update",
                                value: "Coming Next Week",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Version 2.1.0 • Today at 3:00 PM",
                            icon_url: "https://cdn.discordapp.com/emojis/771417304013381632.png"
                        },
                        timestamp: new Date().toISOString()
                    }]
                }
            },
            welcome: {
                category: 'welcome',
                title: 'Welcome Message',
                description: 'Warm welcome template for new server members',
                tags: ['Welcome', 'Community'],
                json: {
                    embeds: [{
                        author: {
                            name: "Welcome Committee",
                            icon_url: "https://cdn.discordapp.com/emojis/753618635296882819.png"
                        },
                        title: "🎊 Welcome to our awesome server!",
                        description: "Hey there **{user}**! We're thrilled to have you join our community of amazing people.\n\n🌟 **Get started by:**\n• Reading our <#rules> channel\n• Introducing yourself in <#introductions>\n• Checking out <#announcements> for updates\n\nNeed help? Just ping our friendly <@&moderator> team!",
                        color: 0x57F287,
                        thumbnail: {
                            url: "https://cdn.discordapp.com/emojis/797137583751725116.png"
                        },
                        footer: {
                            text: "Member #1,337 • Welcome to the community!",
                            icon_url: "https://cdn.discordapp.com/emojis/784104335031771146.png"
                        }
                    }]
                }
            },
            gaming: {
                category: 'gaming',
                title: 'Tournament Results',
                description: 'Professional gaming tournament results announcement',
                tags: ['Gaming', 'Tournament', 'Results'],
                json: {
                    embeds: [{
                        author: {
                            name: "Gaming Hub",
                            icon_url: "https://cdn.discordapp.com/emojis/799310033928159282.png"
                        },
                        title: "🎮 Tournament Results - Winter Championship",
                        description: "The Winter Championship has concluded! Congratulations to all participants for an amazing tournament.",
                        color: 0xEB459E,
                        fields: [
                            {
                                name: "🥇 1st Place",
                                value: "Team Lightning ⚡",
                                inline: true
                            },
                            {
                                name: "🥈 2nd Place",
                                value: "Storm Riders 🌪️",
                                inline: true
                            },
                            {
                                name: "🥉 3rd Place",
                                value: "Phoenix Squad 🔥",
                                inline: true
                            },
                            {
                                name: "Prize Pool",
                                value: "$2,500 USD",
                                inline: true
                            },
                            {
                                name: "Participants",
                                value: "64 Teams",
                                inline: true
                            },
                            {
                                name: "Duration",
                                value: "2 Weeks",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Tournament Series • Season 3",
                            icon_url: "https://cdn.discordapp.com/emojis/784104335031771146.png"
                        }
                    }]
                }
            },
            music: {
                category: 'music',
                title: 'Now Playing',
                description: 'Music bot now playing embed with track information',
                tags: ['Music', 'Bot', 'Player'],
                json: {
                    embeds: [{
                        author: {
                            name: "Now Playing",
                            icon_url: "https://cdn.discordapp.com/emojis/768479012075798558.png"
                        },
                        title: "🎵 Bohemian Rhapsody",
                        description: "**Artist:** Queen\n**Album:** A Night at the Opera\n**Duration:** 5:55\n**Year:** 1975\n\n▬▬▬▬▬▬🔘▬▬▬ 2:34 / 5:55\n\n🔊 **Volume:** 85%\n🔀 **Queue:** 12 songs remaining",
                        color: 0x9C84EF,
                        thumbnail: {
                            url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
                        },
                        fields: [
                            {
                                name: "Requested by",
                                value: "@MusicLover#1234",
                                inline: true
                            },
                            {
                                name: "Voice Channel",
                                value: "🎧 Music Lounge",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "MusicBot • Use /skip to change song",
                            icon_url: "https://cdn.discordapp.com/emojis/768479012075798558.png"
                        }
                    }]
                }
            },
            event: {
                category: 'events',
                title: 'Community Event',
                description: 'Engaging event announcement with all essential details',
                tags: ['Events', 'Community', 'Festival'],
                json: {
                    embeds: [{
                        author: {
                            name: "Community Events",
                            icon_url: "https://cdn.discordapp.com/emojis/785665532977537035.png"
                        },
                        title: "🎪 Annual Community Festival 2024",
                        description: "Join us for our biggest community event of the year! We have exciting activities, giveaways, and special guests lined up.\n\n**🎁 What to Expect:**\n• Live streaming sessions\n• Community games and competitions\n• Exclusive merchandise giveaways\n• Meet & greet with special guests\n• Art showcase and contests",
                        color: 0xFEE75C,
                        fields: [
                            {
                                name: "📅 Date",
                                value: "March 15-17, 2024",
                                inline: true
                            },
                            {
                                name: "⏰ Time",
                                value: "12:00 PM - 10:00 PM EST",
                                inline: true
                            },
                            {
                                name: "🎟️ Registration",
                                value: "Free - React with 🎉",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Community Festival • Don't miss out!",
                            icon_url: "https://cdn.discordapp.com/emojis/785665532977537035.png"
                        }
                    }]
                }
            },
            support: {
                category: 'support',
                title: 'Support Information',
                description: 'Comprehensive support information with contact options',
                tags: ['Support', 'Help', 'Contact'],
                json: {
                    embeds: [{
                        author: {
                            name: "Support Team",
                            icon_url: "https://cdn.discordapp.com/emojis/768128709558018059.png"
                        },
                        title: "🎧 Need Help? We're Here for You!",
                        description: "Our support team is ready to assist you with any questions or issues you might have.\n\n**💡 Quick Solutions:**\n• Check our <#faq> channel first\n• Use `/help` command for bot issues\n• Search our knowledge base\n\n**📞 Contact Options:**\n• Create a support ticket: `/ticket`\n• DM a <@&support> team member\n• Email: support@example.com",
                        color: 0xED4245,
                        fields: [
                            {
                                name: "🕐 Response Time",
                                value: "< 2 hours",
                                inline: true
                            },
                            {
                                name: "📊 Ticket Status",
                                value: "3 pending",
                                inline: true
                            },
                            {
                                name: "⭐ Satisfaction",
                                value: "98.5%",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Support Desk • Available 24/7",
                            icon_url: "https://cdn.discordapp.com/emojis/768128709558018059.png"
                        }
                    }]
                }
            }
        };
    }

    setupFiltering() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const exampleCards = document.querySelectorAll('.example-card');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.filterExamples(category);
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    filterExamples(category) {
        this.currentFilter = category;
        const exampleCards = document.querySelectorAll('.example-card');
        
        exampleCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });

        this.updateResultsCount();
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            searchTimeout = setTimeout(() => {
                this.searchExamples(query);
            }, 300);
        });
    }

    searchExamples(query) {
        const exampleCards = document.querySelectorAll('.example-card');
        
        exampleCards.forEach(card => {
            const title = card.querySelector('.example-info h3').textContent.toLowerCase();
            const description = card.querySelector('.example-info p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matchesSearch = !query || 
                title.includes(query) || 
                description.includes(query) || 
                tags.some(tag => tag.includes(query));

            const matchesFilter = this.currentFilter === 'all' || 
                card.dataset.category === this.currentFilter;

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        this.updateResultsCount();
    }

    updateResultsCount() {
        const visibleCards = document.querySelectorAll('.example-card:not(.hidden)').length;
        const totalCards = document.querySelectorAll('.example-card').length;
        
        const loadMoreText = document.querySelector('.load-more-text');
        if (loadMoreText) {
            loadMoreText.textContent = `Showing ${visibleCards} of ${totalCards}+ templates`;
        }
    }

    setupModals() {
        // Preview buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-preview')) {
                const exampleId = e.target.closest('.btn-preview').dataset.example;
                this.showPreviewModal(exampleId);
            }
            
            if (e.target.closest('.btn-copy')) {
                const exampleId = e.target.closest('.btn-copy').dataset.example;
                this.copyExampleJSON(exampleId);
            }
            
            if (e.target.closest('.btn-use')) {
                const exampleId = e.target.closest('.btn-use').dataset.example;
                this.useTemplate(exampleId);
            }
        });

        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-modal') || e.target.classList.contains('preview-modal')) {
                this.closeModal();
            }
        });

        // Modal action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-copy-modal')) {
                this.copyCurrentModalJSON();
            }
            
            if (e.target.closest('.btn-edit-modal')) {
                this.editCurrentTemplate();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    }

    showPreviewModal(exampleId) {
        const example = this.examples[exampleId];
        if (!example) return;

        const modal = document.getElementById('previewModal');
        const previewContainer = document.getElementById('previewContainer');
        
        // Create Discord embed preview
        const embedHTML = this.createEmbedHTML(example.json.embeds[0]);
        previewContainer.innerHTML = embedHTML;
        
        // Store current example for actions
        this.currentModal = exampleId;
        
        // Show modal
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    createEmbedHTML(embed) {
        let fieldsHTML = '';
        if (embed.fields) {
            fieldsHTML = `
                <div class="embed-fields">
                    ${embed.fields.map(field => `
                        <div class="embed-field">
                            <div class="field-name">${field.name}</div>
                            <div class="field-value">${field.value}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let authorHTML = '';
        if (embed.author) {
            authorHTML = `
                <div class="embed-author">
                    ${embed.author.icon_url ? `<img src="${embed.author.icon_url}" alt="Author">` : ''}
                    <span>${embed.author.name}</span>
                </div>
            `;
        }

        let thumbnailHTML = '';
        if (embed.thumbnail) {
            thumbnailHTML = `
                <div class="embed-thumbnail">
                    <img src="${embed.thumbnail.url}" alt="Thumbnail">
                </div>
            `;
        }

        let footerHTML = '';
        if (embed.footer) {
            footerHTML = `
                <div class="embed-footer">
                    ${embed.footer.icon_url ? `<img src="${embed.footer.icon_url}" alt="Footer">` : ''}
                    <span>${embed.footer.text}</span>
                </div>
            `;
        }

        const borderColor = embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#5865F2';

        return `
            <div class="discord-embed" style="border-left-color: ${borderColor};">
                <div class="embed-content">
                    ${authorHTML}
                    ${embed.title ? `<div class="embed-title">${embed.title}</div>` : ''}
                    ${embed.description ? `<div class="embed-description">${embed.description}</div>` : ''}
                    ${thumbnailHTML}
                    ${fieldsHTML}
                    ${footerHTML}
                </div>
            </div>
        `;
    }

    closeModal() {
        const modal = document.getElementById('previewModal');
        modal.classList.remove('visible');
        document.body.style.overflow = '';
        this.currentModal = null;
    }

    copyExampleJSON(exampleId) {
        const example = this.examples[exampleId];
        if (!example) return;

        const jsonString = JSON.stringify(example.json, null, 2);
        
        navigator.clipboard.writeText(jsonString).then(() => {
            this.showToast('Template JSON copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Failed to copy JSON', 'error');
        });
    }

    copyCurrentModalJSON() {
        if (this.currentModal) {
            this.copyExampleJSON(this.currentModal);
        }
    }

    useTemplate(exampleId) {
        const example = this.examples[exampleId];
        if (!example) return;

        // Store in localStorage for the creator page
        localStorage.setItem('templateData', JSON.stringify(example.json.embeds[0]));
        
        // Navigate to creator page
        window.location.href = 'creator.html?template=true';
    }

    editCurrentTemplate() {
        if (this.currentModal) {
            this.useTemplate(this.currentModal);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupToastSystem() {
        // Create toast container if it doesn't exist
        if (!document.getElementById('toastContainer')) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    initAnimations() {
        // Intersection Observer for scroll animations
        const animatedElements = document.querySelectorAll('.example-card');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });

        // Header stats animation
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (!isNaN(finalValue)) {
                this.animateNumber(stat, 0, finalValue, 2000);
            }
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            element.textContent = end === 50 ? `${current}+` : 
                                 end === 100 ? `${current}%` : current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Additional utility functions
class ExamplesUtils {
    static formatTimestamp(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    static generateId(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    }

    static validateJSON(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (e) {
            return false;
        }
    }

    static truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
}

// Add CSS animations
const additionalAnimations = `
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        .example-card:hover .discord-embed {
            animation: pulse 0.6s ease-in-out;
        }

        .filter-tab.active {
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from {
                box-shadow: 0 4px 12px rgba(88, 101, 242, 0.3);
            }
            to {
                box-shadow: 0 4px 20px rgba(88, 101, 242, 0.5);
            }
        }

        .stat-number {
            animation: countUp 2s ease-out;
        }

        @keyframes countUp {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    </style>
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExamplesManager();
    
    // Add additional animations
    document.head.insertAdjacentHTML('beforeend', additionalAnimations);
});

export { ExamplesManager, ExamplesUtils };
