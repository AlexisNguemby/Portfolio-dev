// Fonction pour afficher l'heure
function displayTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Vérifier si l'élément time existe déjà
    let timeElement = document.querySelector('.status-bar .time');
    
    if (!timeElement) {
        // Créer l'élément time s'il n'existe pas
        timeElement = document.createElement('div');
        timeElement.className = 'time';
        document.querySelector('.status-bar').prepend(timeElement);
    }
    
    // Mettre à jour le contenu
    timeElement.textContent = `${hours}:${minutes}`;
}

// Initialisation de l'heure et mise à jour toutes les minutes
displayTime();
setInterval(displayTime, 60000);

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour mettre à jour la salutation selon l'heure
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.querySelector('#hero-section h1');
        const currentText = greetingElement.innerHTML;
        
        // Si c'est le soir (après 18h)
        if (hour >= 18) {
            greetingElement.innerHTML = currentText.replace('Bonjour', 'Bonsoir');
        } else {
            greetingElement.innerHTML = currentText.replace('Bonsoir', 'Bonjour');
        }
    }

    // Mettre à jour la salutation au chargement
    updateGreeting();

    // Mettre à jour la salutation toutes les minutes
    setInterval(updateGreeting, 60000);

    // Gestion du thème
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Vérifier le thème sauvegardé ou utiliser les préférences système
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Appliquer le thème initial
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Gérer le changement de thème
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Mettre à jour l'icône du thème
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    const phone = document.getElementById('phone');
    const progressBar = document.getElementById('progress-bar');
    const mainSections = document.querySelectorAll('.content-card, .section-title');
    const phoneSections = document.querySelectorAll('.phone-section');
    const pfp = document.getElementById('pfp');
    const h1 = document.querySelector('h1');
    const cursorFollow = document.querySelector('.cursor-follow');
    
    // Suivi du curseur
    document.addEventListener('mousemove', function(e) {
        cursorFollow.style.top = e.clientY + 'px';
        cursorFollow.style.left = e.clientX + 'px';
    });
    
    // Animation initiale du téléphone
    setTimeout(() => {
        document.getElementById('phone-welcome').classList.add('animate-in');
        
        setTimeout(() => {
            const circleProgress = document.querySelector('.circle-progress');
            circleProgress.style.background = 'conic-gradient(var(--primary-color) 75%, transparent 0%)';
        }, 1000);
    }, 800);
    
    let lastScrollTop = 0;
    
    // Gestion du défilement
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        // Mise à jour de la barre de progression
        progressBar.style.width = scrollPercentage + '%';
        
        // Animation du téléphone
        if (scrollTop > lastScrollTop) {
            phone.classList.remove('tilt-left');
            phone.classList.add('tilt-right');
        } else {
            phone.classList.remove('tilt-right');
            phone.classList.add('tilt-left');
        }
        lastScrollTop = scrollTop;
        
        animateOnScroll();
        
        // Déclencheurs d'animation du téléphone
        const phoneAnimationTriggers = [
            {scrollPercentage: 10, section: 'phone-welcome'},
            {scrollPercentage: 30, section: 'phone-skills'},
            {scrollPercentage: 60, section: 'phone-projects'},
            {scrollPercentage: 85, section: 'phone-contact'}
        ];
        
        phoneAnimationTriggers.forEach(trigger => {
            if (scrollPercentage >= trigger.scrollPercentage) {
                const section = document.getElementById(trigger.section);
                section.classList.add('animate-in');
                
                if (trigger.section === 'phone-skills') {
                    const skillBars = document.querySelectorAll('.phone-skill');
                    skillBars.forEach(skill => {
                        skill.classList.add('animate');
                    });
                }
            }
        });
    });
    
    // Fonction d'animation au défilement
    function animateOnScroll() {
        mainSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;
            
            if (sectionTop < viewportHeight * 0.8 && sectionBottom > 0) {
                if (section.classList.contains('section-title')) {
                    section.classList.add('highlight');
                } else {
                    section.classList.add('scale-up');
                }
            } else {
                if (section.classList.contains('section-title')) {
                    section.classList.remove('highlight');
                } else {
                    section.classList.remove('scale-up');
                }
            }
        });
        
        // Animation du profil et du titre
        if (window.scrollY < 200) {
            pfp.classList.add('float-up');
            h1.classList.add('highlight');
        } else {
            pfp.classList.remove('float-up');
            h1.classList.remove('highlight');
        }
    }
    
    // Animation initiale
    animateOnScroll();

    // Gestion de la visibilité du téléphone
    const phoneContainer = document.getElementById('phone-container');
    const contactSection = document.getElementById('contact');

    window.addEventListener('scroll', () => {
        const contactSectionTop = contactSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (contactSectionTop < windowHeight * 0.8) {
            phoneContainer.style.opacity = '0';
        } else {
            phoneContainer.style.opacity = '1';
        }
    });

    // Défilement fluide pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const typewriter = document.querySelector('.typewriter');
    const text = "Développeur Web Full Stack";
    let i = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;

    // Créer le conteneur de Pikachu s'il n'existe pas
    let pikachuContainer = document.querySelector('.pikachu-container');
    if (!pikachuContainer) {
        pikachuContainer = document.createElement('div');
        pikachuContainer.className = 'pikachu-container';
        const pikachu = document.createElement('div');
        pikachu.className = 'pikachu';
        pikachuContainer.appendChild(pikachu);
        typewriter.appendChild(pikachuContainer);
    }

    function updatePikachu() {
        if (i <= text.length && !isDeleting) {
            // Calculer la position de Pikachu en fonction de la longueur du texte
            const textWidth = typewriter.querySelector('.typed-text').offsetWidth;
            const containerWidth = typewriter.offsetWidth;
            const pikachuPosition = Math.min(textWidth, containerWidth - 100); // 100px de marge
            pikachuContainer.style.left = `${pikachuPosition}px`;
            pikachuContainer.style.opacity = '1';
        } else if (isDeleting) {
            const textWidth = typewriter.querySelector('.typed-text').offsetWidth;
            pikachuContainer.style.left = `${textWidth}px`;
        } else {
            pikachuContainer.style.opacity = '0';
        }
    }

    function type() {
        if (i <= text.length && !isDeleting) {
            currentText = text.substring(0, i);
            typewriter.querySelector('.typed-text').textContent = currentText;
            i++;
            typeSpeed = 100;
        } else if (isDeleting) {
            currentText = text.substring(0, i);
            typewriter.querySelector('.typed-text').textContent = currentText;
            i--;
            typeSpeed = 50;
        }

        if (i === text.length + 1) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (i === 0) {
            isDeleting = false;
            typeSpeed = 1000;
        }

        updatePikachu();
        setTimeout(type, typeSpeed);
    }

    type();
});

// Création des particules
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'creative-particles';
    heroSection.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particlesContainer.appendChild(particle);
    }
}

// Application des effets créatifs
function applyCreativeEffects() {
    // Effet de texte créatif pour le titre
    const title = document.querySelector('.hero-title');
    if (title) {
        title.classList.add('creative-text');
        title.setAttribute('data-text', title.textContent);
    }

    // Effet de bordure animée pour les cartes
    document.querySelectorAll('.content-card').forEach(card => {
        card.classList.add('animated-border');
    });

    // Effet de survol pour les cartes de compétences
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Animation des étapes du processus
function animateProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    steps.forEach(step => observer.observe(step));
}

// Animation des cartes du blog
function animateBlogCards() {
    const cards = document.querySelectorAll('.blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    applyCreativeEffects();
    animateProcessSteps();
    animateCertifications();
    animateBlogCards();
});

// Gestion du bouton Back to Top
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 