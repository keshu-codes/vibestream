/* ==========================================================================
   VibeStream JavaScript — 3D Parallax, Scroll Sync, and Firebase Backlog
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive 3D Mockup Tilt Parallax (Desktop Mouse, Mobile Touch & Gyroscope)
    const phoneFrame = document.querySelector('.phone-frame');
    const consolePane = document.querySelector('.console-pane');

    if (phoneFrame && consolePane) {
        // Desktop Mouse Move handler
        consolePane.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 1024) return;

            const rect = consolePane.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const x = e.clientX - rect.left - (width / 2);
            const y = e.clientY - rect.top - (height / 2);

            const maxTilt = 15;
            const rotateY = (x / (width / 2)) * maxTilt;
            const rotateX = -(y / (height / 2)) * maxTilt;

            phoneFrame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 20px)`;
        }, { passive: true });

        consolePane.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
                phoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
            }
        });

        // Mobile Touch Move handler (alternative touch tilt control)
        consolePane.addEventListener('touchmove', (e) => {
            if (window.innerWidth > 1024) return;
            const touch = e.touches[0];
            const rect = consolePane.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const x = touch.clientX - rect.left - (width / 2);
            const y = touch.clientY - rect.top - (height / 2);

            const maxTilt = 12;
            const rotateY = (x / (width / 2)) * maxTilt;
            const rotateX = -(y / (height / 2)) * maxTilt;

            phoneFrame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 20px)`;
        }, { passive: true });

        // Reset on touch end
        consolePane.addEventListener('touchend', () => {
            if (window.innerWidth <= 1024) {
                setTimeout(() => {
                    phoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
                }, 300);
            }
        });

        // Gyroscope / Device Accelerometer Tilt handler
        window.addEventListener('deviceorientation', (e) => {
            if (window.innerWidth > 1024) return;

            const beta = e.beta;  // Front-back tilt (-180 to 180 deg)
            const gamma = e.gamma; // Left-right tilt (-90 to 90 deg)

            if (beta !== null && gamma !== null) {
                const targetPitch = 45; 
                const pitchDiff = beta - targetPitch;

                const maxTilt = 15;
                const rotateX = Math.max(Math.min(pitchDiff / 2.5, maxTilt), -maxTilt);
                const rotateY = Math.max(Math.min(gamma / 2.5, maxTilt), -maxTilt);

                phoneFrame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 20px)`;
            }
        }, true);
    }

    // 2. Scroll-Synchronized App Screenshot Transitions
    const syncSlides = document.querySelectorAll('.scroll-sync-slide');
    const phoneScreens = document.querySelectorAll('.phone-screen');
    const consoleTag = document.querySelector('.console-tag');

    if (syncSlides.length > 0 && phoneScreens.length > 0) {
        const syncObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const screenName = entry.target.getAttribute('data-screen');
                    
                    // 1. Fade out all screens, fade in target screen
                    phoneScreens.forEach(screen => {
                        if (screen.getAttribute('data-screen') === screenName) {
                            screen.classList.add('active');
                        } else {
                            screen.classList.remove('active');
                        }
                    });

                    // 2. Update status indicator label
                    if (consoleTag) {
                        switch (screenName) {
                            case 'home':
                                consoleTag.textContent = 'Active Screen — App Dashboard Home';
                                break;
                            case 'search':
                                consoleTag.textContent = 'Active Screen — Streaming Explore Feed';
                                break;
                            case 'library':
                                consoleTag.textContent = 'Active Screen — Lossless Offline Downloads';
                                break;
                            case 'player':
                                consoleTag.textContent = 'Active Screen — High-Fi Waveform Player';
                                break;
                            case 'settings':
                                consoleTag.textContent = 'Active Screen — Account & Cloud Sync';
                                break;
                            default:
                                consoleTag.textContent = 'Interactive Console — Move cursor to tilt';
                        }
                    }
                }
            });
        }, {
            threshold: 0.25, // Trigger state shifts when card enters the viewport
            rootMargin: '-5% 0px -5% 0px'
        });

        syncSlides.forEach(slide => {
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
