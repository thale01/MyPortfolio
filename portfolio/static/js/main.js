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
                formResponseAlert.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> An unexpected connection error occurred. Please try again.';
            });
    }

    // ==========================================
    // 8. Antigravity Particle Animation (Three.js)
    // ==========================================
    const antigravityContainer = document.getElementById('antigravity-container');
    if (antigravityContainer && typeof THREE !== 'undefined') {
        const count = 300;
        const magnetRadius = 7.5;
        const ringRadius = 7.0;
        const waveSpeed = 0.4;
        const waveAmplitude = 1.0;
        const particleSize = 1.6;
        const lerpSpeed = 0.05;
        const colorVal = '#8B5CF6'; // Purple Theme Color
        const autoAnimate = true;
        const particleVariance = 1.0;
        const rotationSpeed = 0.15;
        const depthFactor = 1.0;
        const pulseSpeed = 3.0;
        const particleShape = 'capsule';
        const fieldStrength = 10.0;

        // Scene Setup
        const width = antigravityContainer.clientWidth || 500;
        const height = antigravityContainer.clientHeight || 500;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        camera.position.set(0, 0, 45);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        antigravityContainer.appendChild(renderer.domElement);

        // Particle geometry & material
        let geometry;
        if (particleShape === 'capsule') {
            geometry = new THREE.CapsuleGeometry(0.08, 0.35, 4, 8);
        } else if (particleShape === 'sphere') {
            geometry = new THREE.SphereGeometry(0.15, 8, 8);
        } else if (particleShape === 'box') {
            geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        } else {
            geometry = new THREE.ConeGeometry(0.12, 0.3, 4);
        }

        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colorVal),
            transparent: true,
            opacity: 0.90
        });

        const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
        scene.add(instancedMesh);

        // Calculate size of 3D plane visible in viewport
        const getViewportSize = () => {
            const fovRad = (camera.fov * Math.PI) / 180;
            const h = 2 * Math.tan(fovRad / 2) * camera.position.z;
            const w = h * camera.aspect;
            return { width: w, height: h };
        };
        const viewport = getViewportSize();

        const dummy = new THREE.Object3D();
        const lastMousePos = { x: 0, y: 0 };
        let lastMouseMoveTime = 0;
        const virtualMouse = { x: 0, y: 0 };
        const pointer = { x: 0, y: 0 };

        const particles = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            
            const x = (Math.random() - 0.5) * viewport.width;
            const y = (Math.random() - 0.5) * viewport.height;
            const z = (Math.random() - 0.5) * 20;

            particles.push({
                t,
                speed,
                mx: x,
                my: y,
                mz: z,
                cx: x,
                cy: y,
                cz: z,
                randomRadiusOffset: (Math.random() - 0.5) * 2
            });
        }

        // Pointer event listener relative to the container center
        window.addEventListener('mousemove', (e) => {
            const rect = antigravityContainer.getBoundingClientRect();
            // Calculate coords relative to canvas center
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });

        window.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                const rect = antigravityContainer.getBoundingClientRect();
                pointer.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
                pointer.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
            }
        });

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const time = clock.getElapsedTime();

            // Track mouse changes
            const mouseDist = Math.sqrt(Math.pow(pointer.x - lastMousePos.x, 2) + Math.pow(pointer.y - lastMousePos.y, 2));
            if (mouseDist > 0.001) {
                lastMouseMoveTime = Date.now();
                lastMousePos.x = pointer.x;
                lastMousePos.y = pointer.y;
            }

            const currentViewport = getViewportSize();
            let destX = (pointer.x * currentViewport.width) / 2;
            let destY = (pointer.y * currentViewport.height) / 2;

            // Idle circular orbit animation when mouse is stationary
            if (autoAnimate && (Date.now() - lastMouseMoveTime > 2000)) {
                destX = Math.sin(time * 0.5) * (currentViewport.width / 4);
                destY = Math.cos(time * 0.5 * 2) * (currentViewport.height / 4);
            }

            virtualMouse.x += (destX - virtualMouse.x) * 0.05;
            virtualMouse.y += (destY - virtualMouse.y) * 0.05;

            const targetX = virtualMouse.x;
            const targetY = virtualMouse.y;

            const globalRotation = time * rotationSpeed;

            for (let i = 0; i < count; i++) {
                const particle = particles[i];
                particle.t += particle.speed / 2;
                const t = particle.t;

                const projectionFactor = 1 - particle.cz / 50;
                const projectedTargetX = targetX * projectionFactor;
                const projectedTargetY = targetY * projectionFactor;

                const dx = particle.cx - projectedTargetX;
                const dy = particle.cy - projectedTargetY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const targetPos = {
                    x: particle.mx,
                    y: particle.my,
                    z: particle.mz * depthFactor
                };

                if (dist < magnetRadius) {
                    const angle = Math.atan2(dy, dx) + globalRotation;
                    const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
                    const deviation = particle.randomRadiusOffset * (5 / (fieldStrength + 0.1));
                    const currentRingRadius = ringRadius + wave + deviation;

                    targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
                    targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
                    targetPos.z = particle.mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
                }

                particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
                particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
                particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

                dummy.position.set(particle.cx, particle.cy, particle.cz);
                dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
                dummy.rotateX(Math.PI / 2);

                const currentDistToMouse = Math.sqrt(
                    Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
                );

                const distFromRing = Math.abs(currentDistToMouse - ringRadius);
                let scaleFactor = 1 - distFromRing / 10;
                scaleFactor = Math.max(0, Math.min(1, scaleFactor));

                const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
                dummy.scale.set(finalScale, finalScale, finalScale);

                dummy.updateMatrix();
                instancedMesh.setMatrixAt(i, dummy.matrix);
            }

            instancedMesh.instanceMatrix.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        // Canvas responsiveness
        const handleResize = () => {
            const w = antigravityContainer.clientWidth || 500;
            const h = antigravityContainer.clientHeight || 500;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);
    }
});
