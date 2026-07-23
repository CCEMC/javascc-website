document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Sticky Nav Shadow
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    // 3. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });

    // 4. Feature Preview Tab Switcher (Event Delegation)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            if (!tabName) return;

            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Deactivate all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Show selected tab content
            const targetContent = document.getElementById('tab-' + tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Activate clicked button
            button.classList.add('active');
        });
    });

    // 5. Login Modal Event Listeners
    let isSignedIn = false;
    const loginTrigger = document.getElementById('login-nav-trigger');
    const loginModal = document.getElementById('login-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const loginForm = document.getElementById('login-form');
    const downloadBtn = document.getElementById('download-btn');

    if (loginTrigger && loginModal) {
        loginTrigger.addEventListener('click', () => {
            loginModal.classList.add('active');
            loginModal.style.display = 'flex';
        });
    }

    if (modalCloseBtn && loginModal) {
        modalCloseBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
            loginModal.style.display = 'none';
        });

        // Close on background overlay click
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
                loginModal.style.display = 'none';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username');
            const feedback = document.getElementById('login-feedback');
            const username = usernameInput ? usernameInput.value : 'User';

            if (feedback) {
                feedback.innerText = `Welcome back, ${username}! Authenticating profile...`;
            }

            setTimeout(() => {
                isSignedIn = true;
                if (loginModal) {
                    loginModal.classList.remove('active');
                    loginModal.style.display = 'none';
                }
                if (loginTrigger) {
                    loginTrigger.innerText = `Account (${username})`;
                }
                alert(`Signed in successfully as ${username}!`);
            }, 1000);
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isSignedIn) {
                alert('You must be signed in to download javascc.');
                if (loginModal) {
                    loginModal.classList.add('active');
                    loginModal.style.display = 'flex';
                }
            } else {
                alert('Downloading javascc v1.0.jar...');
            }
        });
    }
});
