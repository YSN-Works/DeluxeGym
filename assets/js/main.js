/* ============================================================
   FITNESS FIRST BY DELUXE GYM — OPTIMIZED JAVASCRIPT
   Version : 4.0  (Single Page | Light-weight | Bug Free)
   ============================================================ */

(function () {
    'use strict';

    /* ========= GLOBAL CONFIG ========= */
    var WA_NUMBER = '923004840437';   // WhatsApp number (no + sign)
    var GYM_NAME = 'Fitness First by Deluxe Gym';

    document.addEventListener('DOMContentLoaded', function () {

        /* ======================================================
           1. PRELOADER
           ====================================================== */
        var preloader = document.querySelector('.preloader');

        function hidePreloader() {
            if (preloader && !preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
            }
        }
        window.addEventListener('load', function () {
            setTimeout(hidePreloader, 400);
        });
        setTimeout(hidePreloader, 2500); // Failsafe


        /* ======================================================
           2. NAVBAR SCROLL EFFECT
           ====================================================== */
        var navbar = document.querySelector('.navbar');

        function handleNavScroll() {
            if (!navbar) return;
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();


        /* ======================================================
           3. MOBILE MENU (Hamburger + Overlay)
           ====================================================== */
        var hamburger = document.querySelector('.hamburger');
        var navMenu = document.querySelector('.nav-menu');
        var navOverlay = document.querySelector('.nav-overlay');

        function openMenu() {
            if (hamburger) hamburger.classList.add('active');
            if (navMenu) navMenu.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeMenu() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        if (hamburger) {
            hamburger.addEventListener('click', function (e) {
                e.stopPropagation();
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (navOverlay) navOverlay.addEventListener('click', closeMenu);

        // Close menu on nav link click
        document.querySelectorAll('.nav-menu a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        // Close menu if resized to desktop window
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 992) closeMenu();
            }, 150);
        });


        /* ======================================================
           4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
           ====================================================== */
        var animatedEls = document.querySelectorAll('.animate-on-scroll');

        if (animatedEls.length) {
            if ('IntersectionObserver' in window) {
                var revealObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });

                animatedEls.forEach(function (el) { revealObserver.observe(el); });
            } else {
                animatedEls.forEach(function (el) { el.classList.add('animated'); });
            }
        }


        /* ======================================================
           5. ANIMATED STAT COUNTERS
           ====================================================== */
        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-count'), 10);
            if (isNaN(target)) return;

            var duration = 1500;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress); // easeOutExpo
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(step);
        }

        var counters = document.querySelectorAll('[data-count]');
        if (counters.length) {
            if ('IntersectionObserver' in window) {
                var countObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                counters.forEach(function (c) { countObserver.observe(c); });
            } else {
                counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
            }
        }


        /* ======================================================
           6. SCROLL TO TOP BUTTON
           ====================================================== */
        var scrollBtn = document.querySelector('.scroll-top');
        if (scrollBtn) {
            window.addEventListener('scroll', function () {
                scrollBtn.classList.toggle('visible', window.scrollY > 400);
            }, { passive: true });

            scrollBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }


        /* ======================================================
           7. SMOOTH ANCHOR SCROLL
           ====================================================== */
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href === '#' || href.length < 2) return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                closeMenu();

                var navHeight = navbar ? navbar.offsetHeight : 65;
                var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });


        /* ======================================================
           8. BUTTON RIPPLE EFFECT
           ====================================================== */
        function createRipple(e) {
            var btn = this;
            var existing = btn.querySelector('.ripple');
            if (existing) existing.remove();

            var circle = document.createElement('span');
            var diameter = Math.max(btn.clientWidth, btn.clientHeight);
            var radius = diameter / 2;
            var rect = btn.getBoundingClientRect();

            var clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
            var clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;

            circle.style.width = circle.style.height = diameter + 'px';
            circle.style.left = (clientX - rect.left - radius) + 'px';
            circle.style.top = (clientY - rect.top - radius) + 'px';
            circle.classList.add('ripple');

            btn.appendChild(circle);
            setTimeout(function () { if (circle) circle.remove(); }, 600);
        }

        document.querySelectorAll('.btn').forEach(function (btn) {
            btn.addEventListener('click', createRipple);
        });


        /* ======================================================
           9. WHATSAPP & PHONE CALL HANDLING
           ====================================================== */
        function openWhatsApp(message) {
            var url = 'https://wa.me/' + WA_NUMBER;
            if (message) url += '?text=' + encodeURIComponent(message);
            window.open(url, '_blank');
        }

        // Pricing Cards / Book Free Demo click handler
        document.querySelectorAll('.plan-whatsapp').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var plan = this.getAttribute('data-plan') || 'a membership plan';
                var msg = 'Assalam o Alaikum!\n\nI am interested in: ' + plan +
                    '\nAt: ' + GYM_NAME + '\n\nPlease share more details.';
                showNotif('Opening WhatsApp...', 'success');
                setTimeout(function () { openWhatsApp(msg); }, 300);
            });
        });

        // General WhatsApp button handler
        document.querySelectorAll('.btn-wa-general').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var msg = 'Assalam o Alaikum! I would like to know more about ' + GYM_NAME + '.';
                openWhatsApp(msg);
            });
        });

        // Dial button notification
        document.querySelectorAll('.btn-call').forEach(function (btn) {
            btn.addEventListener('click', function () {
                showNotif('Dialing 0300 4840437...', 'success');
            });
        });


        /* ======================================================
           10. NEWSLETTER FORM SUBMIT
           ====================================================== */
        document.querySelectorAll('.newsletter-form').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var input = form.querySelector('input');
                var val = input ? input.value.trim() : '';
                var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

                if (!valid) {
                    showNotif('Please enter a valid email address', 'error');
                    return;
                }
                showNotif('Subscribed successfully! 🎉', 'success');
                form.reset();
            });
        });


        /* ======================================================
           11. NOTIFICATION SYSTEM
           ====================================================== */
        function showNotif(message, type) {
            var old = document.querySelector('.notif');
            if (old) old.remove();

            var n = document.createElement('div');
            n.className = 'notif';
            n.textContent = message;

            if (type === 'error') {
                n.style.background = '#190808';
                n.style.color = '#ff6b6b';
                n.style.borderColor = 'rgba(255,68,68,0.3)';
            } else {
                n.style.background = '#08190a';
                n.style.color = '#39ff14';
                n.style.borderColor = 'rgba(57,255,20,0.3)';
            }

            document.body.appendChild(n);

            setTimeout(function () {
                n.style.transition = 'opacity .4s ease, transform .4s ease';
                n.style.opacity = '0';
                n.style.transform = 'translateX(50px)';
                setTimeout(function () { if (n.parentNode) n.remove(); }, 400);
            }, 3000);
        }
        window.showNotif = showNotif;


        /* ======================================================
           12. INFINITE LOOPING GALLERY STRIP
           ====================================================== */
        var gallery = document.querySelector('.gallery-scroll');
        if (gallery && !gallery.hasAttribute('data-cloned')) {
            gallery.innerHTML += gallery.innerHTML;
            gallery.setAttribute('data-cloned', 'true');
        }


        /* ======================================================
           13. BROKEN IMAGE FALLBACK
           ====================================================== */
        document.querySelectorAll('img').forEach(function (img) {
            img.addEventListener('error', function () {
                if (this.getAttribute('data-fallback-applied')) return;
                this.setAttribute('data-fallback-applied', 'true');
                this.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
                    '<rect width="100%" height="100%" fill="#101010"/>' +
                    '<text x="50%" y="50%" fill="#39ff14" font-family="Arial" font-size="20" ' +
                    'text-anchor="middle" dominant-baseline="middle">Image Not Found</text></svg>'
                );
            });
        });


        /* ======================================================
           14. DYNAMIC SCROLL SPY (Auto Active Nav Menu Links)
           ====================================================== */
        var navLinks = document.querySelectorAll('.nav-menu a:not(.btn)');
        var sections = document.querySelectorAll('#home, #about, #plans, #contact');

        if (sections.length && 'IntersectionObserver' in window) {
            var spyObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute('id');
                        navLinks.forEach(function (link) {
                            if (link.getAttribute('href') === '#' + id) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

            sections.forEach(function (sec) {
                spyObserver.observe(sec);
            });
        }

    }); // DOMContentLoaded end
})();
