// Advanced animation system
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observe all animatable elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateAnimations = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const opacity = 1 - scrolled / window.innerHeight;

            // Parallax effects
            document.querySelectorAll('.parallax').forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });

            // Fade effects
            document.querySelectorAll('.scroll-fade').forEach(el => {
                el.style.opacity = Math.max(0, opacity);
            });

            ticking = false;
        };

        const requestUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestUpdate);
    }

    setupHoverEffects() {
        // 3D tilt effect for cards
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        // Magnetic effect for buttons
        document.querySelectorAll('.magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    setupParallaxEffects() {
        // Multi-layer parallax
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = -(scrolled * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    triggerAnimation(element) {
        const animationType = element.dataset.animate;
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            switch (animationType) {
                case 'fadeInUp':
                    element.classList.add('fade-in-up');
                    break;
                case 'fadeInLeft':
                    element.classList.add('fade-in-left');
                    break;
                case 'fadeInRight':
                    element.classList.add('fade-in-right');
                    break;
                case 'zoomIn':
                    element.classList.add('zoom-in');
                    break;
                case 'bounceIn':
                    element.classList.add('bounce-in');
                    break;
                case 'slideDown':
                    element.classList.add('slide-down');
                    break;
                default:
                    element.classList.add('fade-in');
            }
        }, delay);
    }

    // Create custom animation
    createCustomAnimation(element, keyframes, options = {}) {
        const animation = element.animate(keyframes, {
            duration: options.duration || 1000,
            easing: options.easing || 'ease',
            iterations: options.iterations || 1,
            fill: options.fill || 'forwards'
        });

        this.animations.set(element, animation);
        return animation;
    }

    // Stop animation
    stopAnimation(element) {
        const animation = this.animations.get(element);
        if (animation) {
            animation.cancel();
            this.animations.delete(element);
        }
    }
}

// Particle system class
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            size: options.size || [1, 3],
            speed: options.speed || [0.5, 2],
            colors: options.colors || ['#5865f2', '#57f287', '#fee75c'],
            opacity: options.opacity || [0.3, 0.8],
            ...options
        };
        
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.container.appendChild(particle.element);
        }
    }

    createParticle() {
        const element = document.createElement('div');
        const size = this.random(this.options.size[0], this.options.size[1]);
        const speed = this.random(this.options.speed[0], this.options.speed[1]);
        const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        const opacity = this.random(this.options.opacity[0], this.options.opacity[1]);
        
        element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
        `;

        return {
            element,
            x: Math.random() * this.container.offsetWidth,
            y: Math.random() * this.container.offsetHeight,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size
        };
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.container.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.container.offsetHeight) {
                particle.vy *= -1;
            }

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.container.offsetWidth, particle.x));
            particle.y = Math.max(0, Math.min(this.container.offsetHeight, particle.y));

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animate());
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// Text animation class
class TextAnimator {
    static typewriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    static scramble(element, finalText, duration = 2000) {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        const length = finalText.length;
        let frame = 0;
        const maxFrames = duration / 16; // 60fps

        const animate = () => {
            let output = '';
            
            for (let i = 0; i < length; i++) {
                if (frame > i * (maxFrames / length)) {
                    output += finalText[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.textContent = output;
            
            if (frame < maxFrames) {
                frame++;
                requestAnimationFrame(animate);
            } else {
                element.textContent = finalText;
            }
        };
        
        animate();
    }

    static countUp(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const count = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(count);
            } else {
                element.textContent = target;
            }
        };
        
        count();
    }
}

// Advanced loading system
class LoadingManager {
    constructor() {
        this.loadedAssets = 0;
        this.totalAssets = 0;
        this.callbacks = [];
    }

    preloadImages(imageUrls) {
        this.totalAssets += imageUrls.length;
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.onload = () => this.assetLoaded();
            img.onerror = () => this.assetLoaded();
            img.src = url;
        });
    }

    preloadFonts(fontFamilies) {
        this.totalAssets += fontFamilies.length;
        
        fontFamilies.forEach(family => {
            document.fonts.load(`16px ${family}`).then(() => {
                this.assetLoaded();
            });
        });
    }

    assetLoaded() {
        this.loadedAssets++;
        const progress = (this.loadedAssets / this.totalAssets) * 100;
        
        this.callbacks.forEach(callback => callback(progress));
        
        if (this.loadedAssets === this.totalAssets) {
            this.onComplete();
        }
    }

    onProgress(callback) {
        this.callbacks.push(callback);
    }

    onComplete() {
        document.dispatchEvent(new CustomEvent('assetsLoaded'));
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    window.animationController = new AnimationController();
    
    // Initialize particle systems
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        new ParticleSystem(heroParticles, {
            count: 30,
            size: [2, 4],
            speed: [0.3, 1],
            colors: ['#5865f2', '#57f287']
        });
    }
    
    // Initialize loading manager
    const loadingManager = new LoadingManager();
    loadingManager.preloadFonts(['Inter']);
    
    loadingManager.onProgress((progress) => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
    
    // Add some interactive text animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            TextAnimator.scramble(heroTitle, heroTitle.textContent, 1500);
        }
    }, 1000);
    
    console.log('🎨 Advanced animations initialized!');
});
