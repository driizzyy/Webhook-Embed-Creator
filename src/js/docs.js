// Documentation JavaScript
class DocsInteraction {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSearch();
        this.setupSmoothScrolling();
        this.setupCodeCopying();
        this.setupTableOfContents();
        this.setupAnatomyInteraction();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.initAnimations();
    }

    setupNavigation() {
        // Active nav item highlighting
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.docs-section');

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
    }

    setupSearch() {
        const searchInput = document.querySelector('.docs-search');
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.docs-section');

        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            searchTimeout = setTimeout(() => {
                this.performSearch(query, navItems, sections);
            }, 150);
        });

        // Clear search on escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.clearSearch(navItems, sections);
            }
        });
    }

    performSearch(query, navItems, sections) {
        if (!query) {
            this.clearSearch(navItems, sections);
            return;
        }

        // Search in navigation items
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const isMatch = text.includes(query);
            
            item.style.display = isMatch ? 'block' : 'none';
            
            if (isMatch) {
                this.highlightText(item, query);
            } else {
                this.removeHighlight(item);
            }
        });

        // Search in content sections
        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const isMatch = content.includes(query);
            
            if (isMatch) {
                this.highlightSectionContent(section, query);
            } else {
                this.removeHighlight(section);
            }
        });

        // Show search results count
        this.updateSearchResults(navItems, query);
    }

    clearSearch(navItems, sections) {
        navItems.forEach(item => {
            item.style.display = 'block';
            this.removeHighlight(item);
        });

        sections.forEach(section => {
            this.removeHighlight(section);
        });

        this.hideSearchResults();
    }

    highlightText(element, query) {
        this.removeHighlight(element);
        
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = new RegExp(`(${query})`, 'gi');
            
            if (regex.test(text)) {
                const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    }

    highlightSectionContent(section, query) {
        // Add search result indicator
        section.classList.add('search-result');
        
        const indicator = section.querySelector('.search-indicator');
        if (!indicator) {
            const searchIndicator = document.createElement('div');
            searchIndicator.className = 'search-indicator';
            searchIndicator.innerHTML = '<i class="fas fa-search"></i> Search result';
            section.insertBefore(searchIndicator, section.firstChild);
        }
    }

    removeHighlight(element) {
        element.classList.remove('search-result');
        
        const highlights = element.querySelectorAll('mark.search-highlight');
        highlights.forEach(mark => {
            mark.outerHTML = mark.innerHTML;
        });

        const indicators = element.querySelectorAll('.search-indicator');
        indicators.forEach(indicator => indicator.remove());
    }

    updateSearchResults(navItems, query) {
        const visibleItems = Array.from(navItems).filter(item => 
            item.style.display !== 'none'
        ).length;

        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.textContent = `${visibleItems} results for "${query}"`;
            resultsContainer.style.display = 'block';
        }
    }

    hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for all anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.scrollToSection(target);
            }
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
        const navItems = document.querySelectorAll('.nav-item');
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
            
        } catch (err) {
            console.error('Failed to copy code:', err);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    setupTableOfContents() {
        const tocContainer = document.querySelector('.toc-nav');
        if (!tocContainer) return;

        const headings = document.querySelectorAll('.docs-content h2, .docs-content h3');
        
        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = this.generateId(heading.textContent);
            }

            const tocItem = document.createElement('a');
            tocItem.href = `#${heading.id}`;
            tocItem.textContent = heading.textContent;
            tocItem.className = heading.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
            
            tocItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection(heading.id);
            });

            tocContainer.appendChild(tocItem);
        });
    }

    generateId(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    }

    setupAnatomyInteraction() {
        const anatomyParts = document.querySelectorAll('.anatomy-part');
        
        anatomyParts.forEach(part => {
            part.addEventListener('mouseenter', () => {
                this.highlightAnatomyPart(part);
            });

            part.addEventListener('mouseleave', () => {
                this.unhighlightAnatomyPart(part);
            });

            part.addEventListener('click', () => {
                this.showAnatomyDetails(part);
            });
        });
    }

    highlightAnatomyPart(part) {
        // Add pulse animation
        part.style.animation = 'pulse 0.5s ease-in-out';
        
        // Show corresponding info
        const partType = part.dataset.part;
        this.showPartInfo(partType);
    }

    unhighlightAnatomyPart(part) {
        part.style.animation = '';
        this.hidePartInfo();
    }

    showPartInfo(partType) {
        const infoPanel = document.querySelector('.anatomy-info-panel');
        if (!infoPanel) return;

        const partInfo = this.getPartInfo(partType);
        infoPanel.innerHTML = `
            <h4>${partInfo.name}</h4>
            <p>${partInfo.description}</p>
            <ul>
                ${partInfo.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
        infoPanel.classList.add('visible');
    }

    hidePartInfo() {
        const infoPanel = document.querySelector('.anatomy-info-panel');
        if (infoPanel) {
            infoPanel.classList.remove('visible');
        }
    }

    getPartInfo(partType) {
        const info = {
            author: {
                name: 'Author',
                description: 'The author section displays who sent the embed.',
                tips: ['Use a clear, descriptive name', 'Add an icon for branding', 'Keep it concise']
            },
            title: {
                name: 'Title',
                description: 'The main headline of your embed.',
                tips: ['Make it descriptive but brief', 'Use title case formatting', 'Maximum 256 characters']
            },
            description: {
                name: 'Description',
                description: 'The main body text of your embed.',
                tips: ['Use clear, concise language', 'Support markdown formatting', 'Maximum 4096 characters']
            },
            fields: {
                name: 'Fields',
                description: 'Additional structured information.',
                tips: ['Use for organized data', 'Can be inline or stacked', 'Maximum 25 fields']
            },
            footer: {
                name: 'Footer',
                description: 'Small text at the bottom of the embed.',
                tips: ['Perfect for timestamps', 'Include source information', 'Keep it brief']
            },
            thumbnail: {
                name: 'Thumbnail',
                description: 'Small image displayed on the right side.',
                tips: ['Use square images', 'PNG or JPG format', 'Clear, recognizable icons work best']
            }
        };

        return info[partType] || { name: 'Unknown', description: '', tips: [] };
    }

    showAnatomyDetails(part) {
        const partType = part.dataset.part;
        const modal = this.createAnatomyModal(partType);
        document.body.appendChild(modal);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('visible');
        });
    }

    createAnatomyModal(partType) {
        const partInfo = this.getPartInfo(partType);
        
        const modal = document.createElement('div');
        modal.className = 'anatomy-modal';
        modal.innerHTML = `
            <div class="anatomy-modal-content">
                <div class="anatomy-modal-header">
                    <h3>${partInfo.name}</h3>
                    <button class="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="anatomy-modal-body">
                    <p>${partInfo.description}</p>
                    <h4>Best Practices:</h4>
                    <ul>
                        ${partInfo.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                    <div class="anatomy-example">
                        <h4>Example:</h4>
                        <div class="example-code">
                            <code>${this.getExampleCode(partType)}</code>
                        </div>
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

    getExampleCode(partType) {
        const examples = {
            author: '"author": {\n  "name": "Your Bot Name",\n  "icon_url": "https://example.com/icon.png"\n}',
            title: '"title": "This is the embed title"',
            description: '"description": "This is the main content of your embed. You can use **markdown** formatting here!"',
            fields: '"fields": [\n  {\n    "name": "Field Name",\n    "value": "Field content",\n    "inline": true\n  }\n]',
            footer: '"footer": {\n  "text": "Footer text here",\n  "icon_url": "https://example.com/footer-icon.png"\n}',
            thumbnail: '"thumbnail": {\n  "url": "https://example.com/thumbnail.png"\n}'
        };

        return examples[partType] || '// No example available';
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Set initial theme based on preference
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
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
        
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('.docs-sidebar');
        
        if (!mobileMenuToggle || !sidebar) return;

        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            document.body.classList.toggle('sidebar-open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && 
                !sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('sidebar-open');
            }
        });
    }

    initAnimations() {
        // Scroll-triggered animations
        const animatedElements = document.querySelectorAll('.feature-highlight, .step-card, .practice-card, .support-card');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });

        // Typing animation for code examples
        this.initTypingAnimations();
    }

    initTypingAnimations() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing when element comes into view
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        typingObserver.unobserve(entry.target);
                    }
                });
            });
            
            typingObserver.observe(element);
        });
    }
}

// Additional utility functions
class DocsUtils {
    static formatTimestamp(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    static copyText(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }

    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Progress indicator for long pages
class ReadingProgress {
    constructor() {
        this.init();
    }

    init() {
        this.createProgressBar();
        this.updateProgress();
        
        window.addEventListener('scroll', this.updateProgress.bind(this));
        window.addEventListener('resize', this.updateProgress.bind(this));
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        
        document.body.appendChild(progressBar);
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressFill = document.querySelector('.reading-progress-fill');
        if (progressFill) {
            progressFill.style.width = scrolled + '%';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocsInteraction();
    new ReadingProgress();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Search shortcut: Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.docs-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});

// Add additional CSS for interactive elements
const additionalStyles = `
    <style>
        .copy-code-btn {
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
        }

        .code-block:hover .copy-code-btn {
            opacity: 1;
        }

        .copy-code-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .copy-code-btn.copied {
            background: var(--secondary-color);
            border-color: var(--secondary-color);
        }

        .search-highlight {
            background: var(--primary-color);
            color: white;
            padding: 0.1rem 0.2rem;
            border-radius: 2px;
            font-weight: 500;
        }

        .search-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--primary-color);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-bottom: 1rem;
        }

        .search-result {
            border-left: 3px solid var(--primary-color);
            padding-left: 1rem;
            margin-left: -1rem;
        }

        .anatomy-modal {
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

        .anatomy-modal.visible {
            opacity: 1;
        }

        .anatomy-modal-content {
            background: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }

        .anatomy-modal.visible .anatomy-modal-content {
            transform: translateY(0);
        }

        .anatomy-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--border-color);
        }

        .anatomy-modal-body {
            padding: 2rem;
        }

        .close-modal {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .close-modal:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }

        .example-code {
            background: #1e1e1e;
            border-radius: var(--border-radius-sm);
            padding: 1rem;
            margin-top: 1rem;
        }

        .example-code code {
            color: #f8f8f2;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
        }

        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(88, 101, 242, 0.2);
            z-index: 9999;
        }

        .reading-progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            transition: width 0.3s ease;
        }

        .toast {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 10000;
        }

        .toast.visible {
            transform: translateY(0);
            opacity: 1;
        }

        .toast-success {
            border-left-color: var(--secondary-color);
        }

        .toast-error {
            border-left-color: var(--danger-color);
        }

        .toast-info {
            border-left-color: var(--primary-color);
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(88, 101, 242, 0.4); }
            100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
            .anatomy-modal-content {
                margin: 1rem;
                max-width: calc(100% - 2rem);
            }

            .anatomy-modal-header,
            .anatomy-modal-body {
                padding: 1.5rem;
            }

            .toast {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
