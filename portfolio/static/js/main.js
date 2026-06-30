// Siddhi Thale Portfolio - Front-end Interactions & AJAX Controller

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Translucent Sticky Navbar on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar-custom');
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar(); // Run on startup too
    
    // ==========================================
    // 2. Custom Typing Animation Loop
    // ==========================================
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const textArray = ["Full Stack Developer", "Django Specialist", "Freelancer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between texts
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }
    
    if(typedTextSpan) {
        setTimeout(type, newTextDelay - 1000);
    }
    
    // ==========================================
    // 3. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // ==========================================
    // 4. Skill Progress Bars Animation
    // ==========================================
    const skillProgressFills = document.querySelectorAll('.skill-progress-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetPercent = entry.target.getAttribute('data-percent');
                entry.target.style.width = targetPercent;
            }
        });
    }, { threshold: 0.2 });
    
    skillProgressFills.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ==========================================
    // 5. Stat Counter Increments
    // ==========================================
    const counterNumbers = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNumber = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds animation
                const stepTime = Math.abs(Math.floor(duration / targetNumber));
                let currentNum = 0;
                
                const timer = setInterval(() => {
                    currentNum += 1;
                    entry.target.textContent = currentNum;
                    if (currentNum >= targetNumber) {
                        entry.target.textContent = targetNumber + "+";
                        clearInterval(timer);
                    }
                }, Math.max(stepTime, 20));
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ==========================================
    // 6. Back to Top Scroll Actions
    // ==========================================
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // ==========================================
    // 7. AJAX Contact Form Handler
    // ==========================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const formResponseAlert = document.getElementById('form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show dynamic sending state on button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
            
            // Gather values
            const formData = new FormData(contactForm);
            
            // Fetch configuration
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                formResponseAlert.style.display = 'block';
                
                if (data.status === 'success') {
                    // Render success alert
                    formResponseAlert.className = 'form-response-alert alert-success mt-4';
                    formResponseAlert.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${data.message}`;
                    
                    // Reset fields
                    contactForm.reset();
                    
                    // Soft fadeout of feedback alert
                    setTimeout(() => {
                        formResponseAlert.style.transition = 'opacity 1s';
                        formResponseAlert.style.opacity = '0';
                        setTimeout(() => {
                            formResponseAlert.style.display = 'none';
                            formResponseAlert.style.opacity = '1';
                        }, 1000);
                    }, 5000);
                } else {
                    // Render validation error alerts
                    formResponseAlert.className = 'form-response-alert alert-danger mt-4';
                    let errorMsg = 'Please correct the highlighted errors:<br>';
                    if (data.errors) {
                        for (const field in data.errors) {
                            errorMsg += `- <strong>${field}</strong>: ${data.errors[field].join(', ')}<br>`;
                        }
                    } else {
                        errorMsg += data.message;
                    }
                    formResponseAlert.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i> ${errorMsg}`;
                }
            })
            .catch(error => {
                // Handle system errors
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                formResponseAlert.style.display = 'block';
                formResponseAlert.className = 'form-response-alert alert-danger mt-4';
            });
        });
    }
    
    // ==========================================
    // 8. Mobile Navbar Auto-Collapse on Link Click
    // ==========================================
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    const menuToggle = document.getElementById('navbarContent');
    if (menuToggle && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(menuToggle, { toggle: false });
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
});
