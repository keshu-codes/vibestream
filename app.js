/* ==========================================================================
   VibeStream JavaScript — 3D Parallax, Scroll Sync, and Firebase Backlog
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive 3D Mockup Tilt Parallax (Desktop Only)
    const phoneFrame = document.querySelector('.phone-frame');
    const consolePane = document.querySelector('.console-pane');

    if (phoneFrame && consolePane) {
        consolePane.addEventListener('mousemove', (e) => {
            // Only execute tilt on desktop layouts
            if (window.innerWidth <= 1024) return;

            const rect = consolePane.getBoundingClientRect();
            
            // Get cursor coordinates relative to center of the panel
            const width = rect.width;
            const height = rect.height;
            const x = e.clientX - rect.left - (width / 2);
            const y = e.clientY - rect.top - (height / 2);

            // Translate into degree tilts (max 15 degrees)
            const maxTilt = 15;
            const rotateY = (x / (width / 2)) * maxTilt;
            const rotateX = -(y / (height / 2)) * maxTilt;

            // Apply hardware-accelerated 3D transforms
            phoneFrame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 20px)`;
        }, { passive: true });

        // Reset phone mockup coordinates when mouse leaves the console area
        consolePane.addEventListener('mouseleave', () => {
            phoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
        });
    }

    // 2. Scroll-Synchronized App Mockup Screens
    const featureSlides = document.querySelectorAll('.feature-slide');
    const activeModeLabel = document.querySelector('.active-mode-label');
    const visualModes = document.querySelectorAll('.visual-mode');

    if (featureSlides.length > 0 && activeModeLabel) {
        const syncObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Trigger sync when card is at least 30% visible in the viewport
                if (entry.isIntersecting) {
                    const visualType = entry.target.getAttribute('data-visualizer');
                    
                    // 1. Remove active state from all mockup screens
                    visualModes.forEach(mode => mode.classList.remove('active'));

                    // 2. Activate target mockup screen
                    const targetModeDiv = document.querySelector(`.mode-${visualType}`);
                    if (targetModeDiv) {
                        targetModeDiv.classList.add('active');
                    }

                    // 3. Update status indicator label
                    activeModeLabel.textContent = visualType.charAt(0).toUpperCase() + visualType.slice(1);
                }
            });
        }, {
            threshold: 0.35, // Trigger state shifts when card crosses center thresholds
            rootMargin: '-10% 0px -10% 0px'
        });

        featureSlides.forEach(slide => {
            syncObserver.observe(slide);
        });
    }

    // 3. Scroll Progress Indicator
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }, { passive: true });

    // 4. Smooth Scrolling for Anchor Links
    const smoothLinks = document.querySelectorAll('a[href^="#"], .scroll-to');
    smoothLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = window.innerWidth <= 1024 ? 40 : 0; // Offset on mobile
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Scroll Reveal Observer for Page Slide-ins
    const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-fade-in');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Firebase Serverless Feedback Forms
    const feedbackForm = document.getElementById('feedback-form');
    const submitBtn = feedbackForm ? feedbackForm.querySelector('button[type="submit"]') : null;

    if (feedbackForm && submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const successMsg = document.querySelector('.success-msg');
        const errorMsg = document.querySelector('.error-msg');

        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('fb-name').value.trim();
            const email = document.getElementById('fb-email').value.trim();
            const type = document.getElementById('fb-type').value;
            const message = document.getElementById('fb-message').value.trim();

            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';

            submitBtn.disabled = true;
            btnText.textContent = 'Submitting Request...';
            btnIcon.className = 'fa-solid fa-spinner fa-spin';

            const payload = {
                name: name,
                email: email,
                type: type,
                message: message,
                timestamp: Date.now()
            };

            try {
                const response = await fetch('https://vibestream-18e9a-default-rtdb.firebaseio.com/feedback.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    successMsg.style.display = 'flex';
                    feedbackForm.reset();
                } else {
                    throw new Error('Database rejection: ' + response.statusText);
                }
            } catch (error) {
                console.error('Firebase Submission Error:', error);
                errorMsg.style.display = 'flex';
            } finally {
                submitBtn.disabled = false;
                btnText.textContent = 'Submit Backlog Request';
                btnIcon.className = 'fa-solid fa-paper-plane';
            }
        });
    }
});
