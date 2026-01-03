// KJ & Associates - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CMS DATA LOADER ====================
    function loadCMSData() {
        const savedData = localStorage.getItem('kj_cms_data');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error('Error parsing CMS data:', e);
            }
        }
        return null;
    }

    const cmsData = loadCMSData();

    // ==================== THEME SYSTEM ====================
    function loadTheme() {
        // Check for preview theme in sessionStorage first (for admin preview)
        let theme = sessionStorage.getItem('kj_theme_preview');
        
        // If no preview theme, get from CMS data or default to classic-green
        if (!theme) {
            theme = 'classic-green';
            if (cmsData && cmsData.theme) {
                theme = cmsData.theme;
            }
        }
        
        // Clear preview theme after use (one-time preview)
        sessionStorage.removeItem('kj_theme_preview');
        
        applyTheme(theme);
    }

    function applyTheme(themeName) {
        // Valid themes
        const validThemes = ['classic-green', 'professional-dark', 'earth-warm'];
        
        if (!validThemes.includes(themeName)) {
            themeName = 'classic-green';
        }
        
        // Apply theme to HTML element
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Store in a global for reference
        window.currentTheme = themeName;
    }

    // Load theme immediately
    loadTheme();

    // ==================== BRANDING / LOGO ====================
    /**
     * Get the base path for assets based on current page location
     * Works for file:// protocol and web servers
     */
    function getBasePath() {
        const currentPath = window.location.pathname;
        
        // Check known subdirectories
        if (currentPath.includes('/projects/') || 
            currentPath.includes('/services/') || 
            currentPath.includes('/blog/') ||
            currentPath.includes('/admin/')) {
            return '../';
        }
        return '';
    }
    
    /**
     * Resolve path to uploads folder
     */
    function resolveRelativePath(rootRelativePath) {
        if (!rootRelativePath || rootRelativePath.trim() === '') return '';
        
        // If it's already a full URL, return as-is
        if (rootRelativePath.startsWith('http://') || rootRelativePath.startsWith('https://') || rootRelativePath.startsWith('data:')) {
            return rootRelativePath;
        }
        
        // For file:// protocol, convert root-relative paths
        if (window.location.protocol === 'file:') {
            // Remove leading slash and add base path
            const cleanPath = rootRelativePath.startsWith('/') ? rootRelativePath.substring(1) : rootRelativePath;
            return getBasePath() + cleanPath;
        }
        
        // For web server, keep root-relative paths
        return rootRelativePath;
    }
    
    // Backward compatibility wrapper
    function normalizeImagePath(path) {
        return resolveRelativePath(path);
    }

    function loadBrandingData() {
        if (cmsData && cmsData.branding) {
            return cmsData.branding;
        }
        return {
            logoType: 'text',
            logoText: 'KJ & Associates',
            logoSubtitle: 'Consultancy Ltd',
            logoImageUrl: '',
            logoImageUrlDark: '',
            faviconUrl: ''
        };
    }

    function applyBranding() {
        const branding = loadBrandingData();
        const logos = document.querySelectorAll('.logo');
        
        if (logos.length === 0) {
            return;
        }

        logos.forEach(logo => {
            // Calculate the correct logo path based on current page location
            const currentPath = window.location.pathname;
            const isInSubdir = currentPath.includes('/projects/') || 
                              currentPath.includes('/services/') || 
                              currentPath.includes('/blog/') ||
                              currentPath.includes('/admin/');
            
            const logoPath = isInSubdir ? '../uploads/logo_kj&.png' : 'uploads/logo_kj&.png';
            
            // Create image element
            const img = document.createElement('img');
            img.className = 'logo-image';
            img.src = logoPath;
            img.alt = 'KJ & Associates';
            
            // Handle load errors - try alternative path
            let hasRetried = false;
            img.onerror = function() {
                if (!hasRetried) {
                    hasRetried = true;
                    // Try the opposite path
                    this.src = isInSubdir ? 'uploads/logo_kj&.png' : '../uploads/logo_kj&.png';
                } else {
                    // Fallback to text logo
                    this.style.display = 'none';
                    const textEl = document.createElement('span');
                    textEl.className = 'logo-text';
                    textEl.textContent = 'KJ & Associates';
                    const subEl = document.createElement('span');
                    subEl.className = 'logo-subtitle';
                    subEl.textContent = 'Consultancy Ltd';
                    logo.appendChild(textEl);
                    logo.appendChild(subEl);
                }
            };
            
            // Clear logo and add image
            logo.innerHTML = '';
            logo.appendChild(img);
        });

        // Apply favicon
        if (branding.faviconUrl) {
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = branding.faviconUrl;
        }
    }

    // Apply branding on load
    applyBranding();

    // ==================== WHATSAPP BUTTON ====================
    function setupWhatsApp() {
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (!whatsappBtn) return;

        let whatsappNumber = '+255768757779'; // Default
        if (cmsData && cmsData.contact && cmsData.contact.whatsapp) {
            whatsappNumber = cmsData.contact.whatsapp;
        }

        // Format number for WhatsApp link
        const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
        whatsappBtn.href = `https://wa.me/${cleanNumber}?text=Hello, I would like to inquire about your quantity surveying services.`;
    }

    setupWhatsApp();

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== TESTIMONIALS SLIDER ====================
    function initTestimonials() {
        const slider = document.getElementById('testimonialsSlider');
        const dotsContainer = document.getElementById('testimonialDots');
        if (!slider || !dotsContainer) return;

        // Get testimonials from CMS or use defaults
        let testimonials = [];
        if (cmsData && cmsData.testimonials && cmsData.testimonials.length > 0) {
            testimonials = cmsData.testimonials;
        } else {
            // Default testimonials
            testimonials = [
                { id: 1, name: "James Mwangi", position: "Project Director", company: "TANROADS", text: "KJ & Associates delivered exceptional cost management services for our highway project. Their attention to detail and professional approach exceeded our expectations.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", rating: 5 },
                { id: 2, name: "Grace Massawe", position: "Procurement Manager", company: "Bank of Tanzania", text: "We have worked with KJ & Associates on multiple projects. Their expertise in quantity surveying and commitment to accuracy is unmatched.", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80", rating: 5 },
                { id: 3, name: "Michael Ochieng", position: "Regional Manager", company: "World Bank Tanzania", text: "Professional, reliable, and thorough. KJ & Associates has been instrumental in ensuring our funded projects are delivered within budget.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", rating: 5 }
            ];
        }

        if (testimonials.length === 0) {
            slider.parentElement.style.display = 'none';
            return;
        }

        // Generate testimonial cards
        slider.innerHTML = testimonials.map((t, index) => `
            <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="testimonial-content">
                    ${t.photo ? 
                        `<img src="${t.photo}" alt="${t.name}" class="testimonial-avatar" onerror="this.outerHTML='<div class=\\'testimonial-avatar-placeholder\\'>${t.name.charAt(0)}</div>'">` : 
                        `<div class="testimonial-avatar-placeholder">${t.name.charAt(0)}</div>`
                    }
                    <div class="testimonial-body">
                        <div class="testimonial-rating">${'★'.repeat(t.rating || 5)}</div>
                        <p class="testimonial-text">${t.text}</p>
                        <div class="testimonial-author">
                            <span class="testimonial-name">${t.name}</span>
                            <span class="testimonial-position">${t.position}</span>
                            <span class="testimonial-company">${t.company}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Generate dots
        dotsContainer.innerHTML = testimonials.map((_, index) => `
            <button class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to testimonial ${index + 1}"></button>
        `).join('');

        const cards = slider.querySelectorAll('.testimonial-card');
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-arrow.prev');
        const nextBtn = document.querySelector('.testimonial-arrow.next');
        let currentIndex = 0;
        let autoplayInterval;

        function showTestimonial(index) {
            if (index >= cards.length) index = 0;
            if (index < 0) index = cards.length - 1;
            
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            cards[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        function nextTestimonial() {
            showTestimonial(currentIndex + 1);
        }

        function prevTestimonial() {
            showTestimonial(currentIndex - 1);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextTestimonial, 6000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoplay();
                nextTestimonial();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoplay();
                prevTestimonial();
                startAutoplay();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                showTestimonial(parseInt(dot.dataset.index));
                startAutoplay();
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Start autoplay
        startAutoplay();
    }

    initTestimonials();

    // ==================== HERO SLIDESHOW ====================
    let slides = [];
    let indicators = [];
    let currentSlide = 0;
    let slideInterval;
    let intervalTime = 6000;
    let autoPlay = true;
    let pauseOnHover = true;

    // Load slides from CMS data or use defaults
    function loadSlidesData() {
        // Try to load from CMS data
        if (cmsData && cmsData.slides && cmsData.slides.length > 0) {
            return {
                slides: cmsData.slides,
                settings: {
                    autoPlay: true,
                    interval: 6000,
                    pauseOnHover: true
                }
            };
        }
        
        // Default data if no CMS data exists
        return {
            slides: [
                {
                    id: 1,
                    tagline: "BUILD ANYTHING WITH US",
                    title: "Precision Through",
                    titleHighlight: "Digital Tools.",
                    buttonText: "Contact Us",
                    buttonLink: "contact.html",
                    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
                    active: true
                },
                {
                    id: 2,
                    tagline: "TRUSTED BY WORLD BANK & AfDB",
                    title: "Expert",
                    titleHighlight: "Quantity Surveyors.",
                    buttonText: "Our Services",
                    buttonLink: "services/index.html",
                    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
                    active: true
                },
                {
                    id: 3,
                    tagline: "17+ YEARS OF EXCELLENCE",
                    title: "Cost Control",
                    titleHighlight: "Expertise.",
                    buttonText: "About Us",
                    buttonLink: "about.html",
                    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
                    active: true
                },
                {
                    id: 4,
                    tagline: "FROM INCEPTION TO COMPLETION",
                    title: "Project",
                    titleHighlight: "Management.",
                    buttonText: "View Projects",
                    buttonLink: "projects/index.html",
                    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
                    active: true
                },
                {
                    id: 5,
                    tagline: "SERVING TANZANIA",
                    title: "Building",
                    titleHighlight: "The Future.",
                    buttonText: "Get Started",
                    buttonLink: "contact.html",
                    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
                    active: true
                }
            ],
            settings: {
                autoPlay: true,
                interval: 6000,
                pauseOnHover: true
            }
        };
    }

    // Generate slides HTML dynamically
    function generateSlidesHTML(data) {
        const slidesContainer = document.querySelector('.slides-container');
        const indicatorsContainer = document.querySelector('.slide-indicators');
        
        if (!slidesContainer || !indicatorsContainer) return;

        // Filter only active slides
        const activeSlides = data.slides.filter(slide => slide.active);
        
        // Generate slides HTML
        slidesContainer.innerHTML = activeSlides.map((slide, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}" data-slide="${index + 1}">
                <div class="slide-left">
                    <div class="slide-circle">
                        <div class="slide-content">
                            <span class="slide-tagline">${slide.tagline}</span>
                            <h1 class="slide-title">${slide.title} <span>${slide.titleHighlight}</span></h1>
                            <a href="${slide.buttonLink}" class="slide-btn">${slide.buttonText}</a>
                        </div>
                    </div>
                </div>
                <div class="slide-right">
                    <div class="slide-image" style="background-image: url('${slide.image}');"></div>
                </div>
            </div>
        `).join('');

        // Generate indicators HTML
        indicatorsContainer.innerHTML = activeSlides.map((slide, index) => `
            <button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index + 1}" aria-label="Go to slide ${index + 1}"></button>
        `).join('');

        // Update references
        slides = document.querySelectorAll('.slide');
        indicators = document.querySelectorAll('.indicator');
        
        // Apply settings
        intervalTime = data.settings.interval || 6000;
        autoPlay = data.settings.autoPlay !== false;
        pauseOnHover = data.settings.pauseOnHover !== false;
    }

    function showSlide(index) {
        if (slides.length === 0) return;
        
        // Handle wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
        
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideshow() {
        if (autoPlay) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slideshow
    const heroSlideshow = document.querySelector('.hero-slideshow');
    if (heroSlideshow) {
        // Load and generate slides
        const slidesData = loadSlidesData();
        generateSlidesHTML(slidesData);

        const prevBtn = document.querySelector('.slide-arrow.prev');
        const nextBtn = document.querySelector('.slide-arrow.next');

        // Arrow navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }
        
        // Indicator navigation
        document.querySelector('.slide-indicators').addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide')) - 1;
                stopSlideshow();
                showSlide(slideIndex);
                startSlideshow();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            } else if (e.key === 'ArrowRight') {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            }
        });
        
        // Pause on hover
        if (pauseOnHover) {
            heroSlideshow.addEventListener('mouseenter', stopSlideshow);
            heroSlideshow.addEventListener('mouseleave', startSlideshow);
        }
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slidesContainer = document.querySelector('.slides-container');
        if (slidesContainer) {
            slidesContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            slidesContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                stopSlideshow();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startSlideshow();
            }
        }
        
        // Start automatic slideshow
        startSlideshow();
    }

    // ==================== STATS COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Observe stats bar for animation trigger
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsBar);
    }

    // ==================== MOBILE MENU ====================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create backdrop overlay for mobile menu
    let backdrop = null;
    let mobileCloseBtn = null;
    
    if (mobileMenuToggle && navMenu) {
        // Create backdrop - must be LOWER z-index than nav-menu (1001)
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;';
        document.body.appendChild(backdrop);
        
        // Ensure nav-menu has higher z-index
        navMenu.style.zIndex = '1001';
        
        // Create close button inside nav menu
        mobileCloseBtn = document.createElement('button');
        mobileCloseBtn.className = 'mobile-menu-close';
        mobileCloseBtn.setAttribute('aria-label', 'Close menu');
        mobileCloseBtn.innerHTML = '×';
        mobileCloseBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; width: 44px; height: 44px; background: var(--gray-100, #f3f4f6); border: none; border-radius: 50%; font-size: 28px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-primary, #333); z-index: 1002; transition: all 0.2s ease;';
        navMenu.insertBefore(mobileCloseBtn, navMenu.firstChild);
    }

    function closeMobileMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        body.style.overflow = '';
        if (backdrop) {
            backdrop.style.opacity = '0';
            backdrop.style.visibility = 'hidden';
            backdrop.style.pointerEvents = 'none';
        }
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }

    function openMobileMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        body.style.overflow = 'hidden';
        if (backdrop) {
            backdrop.style.opacity = '1';
            backdrop.style.visibility = 'visible';
            backdrop.style.pointerEvents = 'all';
        }
    }
    
    // Navigate to URL programmatically
    function navigateTo(url) {
        closeMobileMenu();
        setTimeout(function() {
            window.location.href = url;
        }, 100);
    }

    if (mobileMenuToggle && navMenu) {
        // Toggle button click
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close button inside menu
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', function(e) {
                e.preventDefault();
                closeMobileMenu();
            });
        }

        // Handle ALL clicks on nav menu links
        navMenu.addEventListener('click', function(e) {
            // Only handle on mobile
            if (window.innerWidth > 768) return;
            
            const target = e.target;
            const link = target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            const parentLi = link.parentElement;
            const isDropdownParent = parentLi && parentLi.classList.contains('dropdown');
            const isInDropdownMenu = link.closest('.dropdown-menu');
            
            // If clicking a link inside dropdown menu - navigate
            if (isInDropdownMenu && href) {
                e.preventDefault();
                e.stopPropagation();
                navigateTo(href);
                return;
            }
            
            // If clicking a dropdown toggle (About Us, Services)
            if (isDropdownParent && !isInDropdownMenu) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = parentLi;
                const isOpen = dropdown.classList.contains('active');
                
                if (!isOpen) {
                    // Close other dropdowns and open this one
                    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
                    dropdown.classList.add('active');
                } else {
                    // Already open - navigate to the main page
                    if (href) {
                        navigateTo(href);
                    }
                }
                return;
            }
            
            // Regular link (Home, Projects, Clients, Blog, Contact)
            if (href && !isDropdownParent) {
                e.preventDefault();
                e.stopPropagation();
                navigateTo(href);
            }
        });

        // Close mobile menu on window resize if it becomes desktop view
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within its parent
                const siblings = entry.target.parentElement.children;
                const elementIndex = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${elementIndex * 0.1}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .project-card, .feature-item, .team-member, .client-item, .certificate-item, .org-box, .philosophy-item, .tech-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ==================== PROJECT FILTER ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==================== CONTACT FORM ====================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#22c55e';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorEl = formGroup.querySelector('.error-message');
        
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
            formGroup.appendChild(errorEl);
        }
        
        errorEl.textContent = message;
        input.style.borderColor = '#ef4444';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorEl = formGroup.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==================== CERTIFICATE LIGHTBOX ====================
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    certificateItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            
            // Close on escape key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });

            // Animate in
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });
        });
    });

    // ==================== DROPDOWN HOVER FIX FOR TOUCH ====================
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('touchstart', function(e) {
            const menu = this.querySelector('.dropdown-menu');
            const isVisible = menu.style.opacity === '1';
            
            // Close all other dropdowns
            dropdowns.forEach(d => {
                if (d !== this) {
                    const m = d.querySelector('.dropdown-menu');
                    if (m) {
                        m.style.opacity = '0';
                        m.style.visibility = 'hidden';
                    }
                }
            });
            
            if (!isVisible) {
                e.preventDefault();
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    });
});
