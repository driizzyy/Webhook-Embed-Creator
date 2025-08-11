// API Documentation JavaScript
class APIDocumentation {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCodeCopying();
        this.setupThemeToggle();
        this.setupInteractiveElements();
        this.initAnimations();
    }

    setupNavigation() {
        // Active nav item highlighting
        const navItems = document.querySelectorAll('.api-nav-menu .nav-item');
        const sections = document.querySelectorAll('.api-section');

        // Intersection Observer for active section detection
        const observerOptions = {
            rootMargin: '-100px 0px -80% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.updateActiveNavItem(id);
                    this.updateActiveTocItem(id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Manual nav click handling
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });

        // TOC navigation
        const tocItems = document.querySelectorAll('.toc-nav a');
        tocItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });
    }

    scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const headerHeight = 100;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update URL without jumping
        history.replaceState(null, null, `#${targetId}`);
    }

    updateActiveNavItem(activeId) {
        const navItems = document.querySelectorAll('.api-nav-menu .nav-item');
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${activeId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    updateActiveTocItem(activeId) {
        const tocItems = document.querySelectorAll('.toc-nav a');
        tocItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${activeId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupCodeCopying() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy code';
            
            copyButton.addEventListener('click', () => {
                const code = block.querySelector('code').textContent;
                this.copyToClipboard(code, copyButton);
            });

            block.style.position = 'relative';
            block.appendChild(copyButton);
        });

        // Copy buttons for endpoint URLs
        const endpointHeaders = document.querySelectorAll('.endpoint-header code');
        endpointHeaders.forEach(codeElement => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-endpoint-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy endpoint';
            
            copyButton.addEventListener('click', () => {
                const endpoint = codeElement.textContent;
                this.copyToClipboard(endpoint, copyButton);
            });

            codeElement.parentNode.appendChild(copyButton);
        });
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 2000);
            
            this.showToast('Copied to clipboard!', 'success');
            
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showToast('Failed to copy', 'error');
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

    setupInteractiveElements() {
        // Interactive embed parts
        const embedParts = document.querySelectorAll('.embed-part');
        
        embedParts.forEach(part => {
            part.addEventListener('mouseenter', () => {
                this.highlightEmbedPart(part);
            });

            part.addEventListener('mouseleave', () => {
                this.unhighlightEmbedPart(part);
            });

            part.addEventListener('click', () => {
                this.showEmbedPartInfo(part);
            });
        });

        // Method badges interaction
        const methodBadges = document.querySelectorAll('.method');
        methodBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.showMethodInfo(badge.textContent);
            });
        });

        // Parameter rows hover
        const paramRows = document.querySelectorAll('.param-row');
        paramRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.transform = 'translateX(5px)';
                row.style.borderColor = 'var(--primary-color)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.transform = 'translateX(0)';
                row.style.borderColor = 'var(--border-color)';
            });
        });
    }

    highlightEmbedPart(part) {
        // Add pulse animation
        part.style.animation = 'pulse 0.5s ease-in-out';
        
        // Show info tooltip
        const partType = part.dataset.part;
        if (partType) {
            this.showPartTooltip(part, partType);
        }
    }

    unhighlightEmbedPart(part) {
        part.style.animation = '';
        this.hidePartTooltip();
    }

    showPartTooltip(element, partType) {
        const tooltipData = {
            author: 'Sets the author information with name and optional icon',
            title: 'Main heading of the embed (max 256 characters)',
            description: 'Main content with markdown support (max 4096 characters)',
            fields: 'Structured data in name/value pairs (max 25 fields)',
            footer: 'Small text at the bottom with optional icon',
            thumbnail: 'Small image displayed on the right side'
        };

        const tooltip = document.createElement('div');
        tooltip.className = 'embed-tooltip';
        tooltip.textContent = tooltipData[partType] || 'Embed component';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.background = 'var(--bg-quaternary)';
        tooltip.style.color = 'var(--text-primary)';
        tooltip.style.padding = '0.5rem 1rem';
        tooltip.style.borderRadius = 'var(--border-radius-sm)';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.border = '1px solid var(--border-color)';
    }

    hidePartTooltip() {
        const tooltip = document.querySelector('.embed-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    showEmbedPartInfo(part) {
        const partType = part.dataset.part;
        const modal = this.createInfoModal(partType);
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => {
            modal.classList.add('visible');
        });
    }

    createInfoModal(partType) {
        const partInfo = this.getDetailedPartInfo(partType);
        
        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="info-modal-content">
                <div class="info-modal-header">
                    <h3>${partInfo.name}</h3>
                    <button class="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="info-modal-body">
                    <p>${partInfo.description}</p>
                    <h4>Properties:</h4>
                    <div class="property-list">
                        ${partInfo.properties.map(prop => `
                            <div class="property-item">
                                <code>${prop.name}</code>
                                <span class="property-type">${prop.type}</span>
                                <span class="property-desc">${prop.description}</span>
                            </div>
                        `).join('')}
                    </div>
                    <h4>Example:</h4>
                    <div class="example-code">
                        <code>${partInfo.example}</code>
                    </div>
                </div>
            </div>
        `;

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
                setTimeout(() => modal.remove(), 300);
            }
        });

        return modal;
    }

    getDetailedPartInfo(partType) {
        const info = {
            author: {
                name: 'Author Object',
                description: 'Displays author information at the top of the embed.',
                properties: [
                    { name: 'name', type: 'string', description: 'Name of the author (required)' },
                    { name: 'url', type: 'string', description: 'URL to make the author name clickable' },
                    { name: 'icon_url', type: 'string', description: 'URL of author icon (20x20px recommended)' }
                ],
                example: '{\n  "name": "Author Name",\n  "url": "https://example.com",\n  "icon_url": "https://example.com/icon.png"\n}'
            },
            title: {
                name: 'Title',
                description: 'The main heading of the embed with optional URL.',
                properties: [
                    { name: 'title', type: 'string', description: 'Title text (max 256 characters)' },
                    { name: 'url', type: 'string', description: 'URL to make the title clickable' }
                ],
                example: '"title": "This is the embed title"'
            },
            description: {
                name: 'Description',
                description: 'Main body text with markdown formatting support.',
                properties: [
                    { name: 'description', type: 'string', description: 'Description text with markdown (max 4096 characters)' }
                ],
                example: '"description": "**Bold text** and *italic text*\\nNew line with markdown support"'
            },
            fields: {
                name: 'Fields Array',
                description: 'Structured data displayed in columns.',
                properties: [
                    { name: 'name', type: 'string', description: 'Field name (max 256 characters)' },
                    { name: 'value', type: 'string', description: 'Field value (max 1024 characters)' },
                    { name: 'inline', type: 'boolean', description: 'Whether field should display inline' }
                ],
                example: '"fields": [\n  {\n    "name": "Field 1",\n    "value": "Value 1",\n    "inline": true\n  }\n]'
            },
            footer: {
                name: 'Footer Object',
                description: 'Small text displayed at the bottom of the embed.',
                properties: [
                    { name: 'text', type: 'string', description: 'Footer text (max 2048 characters)' },
                    { name: 'icon_url', type: 'string', description: 'URL of footer icon (16x16px recommended)' }
                ],
                example: '{\n  "text": "Footer text here",\n  "icon_url": "https://example.com/footer.png"\n}'
            },
            thumbnail: {
                name: 'Thumbnail Object',
                description: 'Small image displayed on the right side of the embed.',
                properties: [
                    { name: 'url', type: 'string', description: 'Source URL of thumbnail image' },
                    { name: 'height', type: 'integer', description: 'Height of thumbnail (auto-calculated)' },
                    { name: 'width', type: 'integer', description: 'Width of thumbnail (auto-calculated)' }
                ],
                example: '{\n  "url": "https://example.com/thumbnail.png"\n}'
            }
        };

        return info[partType] || { name: 'Unknown', description: '', properties: [], example: '' };
    }

    showMethodInfo(method) {
        const methodInfo = {
            'POST': 'Creates or sends data to the server',
            'GET': 'Retrieves data from the server',
            'PUT': 'Updates existing data on the server',
            'DELETE': 'Removes data from the server'
        };

        this.showToast(`${method}: ${methodInfo[method] || 'HTTP method'}`, 'info');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add to container or body
        const container = document.querySelector('.toast-container') || document.body;
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
        // Scroll-triggered animations
        const animatedElements = document.querySelectorAll('.intro-card, .practice-card, .endpoint-card');
        
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

        // Code block syntax highlighting enhancement
        this.enhanceCodeBlocks();
    }

    enhanceCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.code-block code');
        
        codeBlocks.forEach(block => {
            const language = block.className.replace('language-', '');
            if (language === 'javascript' || language === 'json') {
                this.addSyntaxHighlighting(block, language);
            }
        });
    }

    addSyntaxHighlighting(element, language) {
        const text = element.textContent;
        let highlightedText = text;

        if (language === 'javascript') {
            // Basic JavaScript highlighting
            highlightedText = text
                .replace(/\b(const|let|var|function|async|await|return|if|else|for|while|class|new)\b/g, '<span class="keyword">$1</span>')
                .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
                .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
                .replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
        } else if (language === 'json') {
            // Basic JSON highlighting
            highlightedText = text
                .replace(/"([^"]*)":/g, '<span class="json-key">"$1"</span>:')
                .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
                .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
                .replace(/:\s*(true|false|null)/g, ': <span class="json-literal">$1</span>');
        }

        element.innerHTML = highlightedText;
    }
}

// Additional CSS for enhanced features
const additionalStyles = `
    <style>
        .copy-code-btn,
        .copy-endpoint-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #f8f8f2;
            padding: 0.5rem;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            font-size: 0.8rem;
            z-index: 10;
        }

        .code-block:hover .copy-code-btn,
        .endpoint-header:hover .copy-endpoint-btn {
            opacity: 1;
        }

        .copy-code-btn:hover,
        .copy-endpoint-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .copy-code-btn.copied,
        .copy-endpoint-btn.copied {
            background: var(--secondary-color);
            border-color: var(--secondary-color);
        }

        .info-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .info-modal.visible {
            opacity: 1;
        }

        .info-modal-content {
            background: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }

        .info-modal.visible .info-modal-content {
            transform: translateY(0);
        }

        .info-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--border-color);
        }

        .info-modal-body {
            padding: 2rem;
        }

        .property-list {
            margin: 1rem 0;
        }

        .property-item {
            display: grid;
            grid-template-columns: auto auto 1fr;
            gap: 1rem;
            padding: 0.75rem;
            background: var(--bg-tertiary);
            border-radius: var(--border-radius-sm);
            margin-bottom: 0.5rem;
            align-items: center;
        }

        .property-type {
            font-size: 0.8rem;
            background: var(--primary-color);
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
        }

        .toast-container {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .toast {
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(100px);
            opacity: 0;
            transition: all 0.3s ease;
            min-width: 250px;
        }

        .toast.visible {
            transform: translateX(0);
            opacity: 1;
        }

        .toast-success {
            border-left: 4px solid var(--secondary-color);
        }

        .toast-error {
            border-left: 4px solid var(--danger-color);
        }

        .toast-info {
            border-left: 4px solid var(--primary-color);
        }

        /* Syntax highlighting */
        .keyword { color: #569cd6; }
        .literal { color: #4fc1ff; }
        .string { color: #ce9178; }
        .comment { color: #6a9955; font-style: italic; }
        .json-key { color: #9cdcfe; }
        .json-string { color: #ce9178; }
        .json-number { color: #b5cea8; }
        .json-literal { color: #569cd6; }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(88, 101, 242, 0.4); }
            100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
            .info-modal-content {
                margin: 1rem;
                max-width: calc(100% - 2rem);
            }

            .info-modal-header,
            .info-modal-body {
                padding: 1.5rem;
            }

            .property-item {
                grid-template-columns: 1fr;
                gap: 0.5rem;
            }

            .toast-container {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
            }

            .toast {
                min-width: auto;
            }
        }
    </style>
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new APIDocumentation();
    
    // Add additional styles
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
    
    // Create toast container
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
});

export { APIDocumentation };
