/* ====================================================== */
/* FUTURISTIC PORTFOLIO JS */
/* ====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ====================================================== */
    /* VARIABLES */
    /* ====================================================== */

    const header = document.querySelector(".header");

    const menuBtn = document.querySelector(".menu-btn");

    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelectorAll(".navbar a");

    const sections = document.querySelectorAll("section");

    const cursor = document.querySelector(".cursor");

    const skillBoxes = document.querySelectorAll(".skill-box");

    const projectCards = document.querySelectorAll(".project-card");

    const statCards = document.querySelectorAll(".stat-card");

    const hoverElements = document.querySelectorAll(
        "a, button, .skill-box, .project-card, .info-card"
    );

    const isMobile = window.innerWidth <= 768;

    /* ====================================================== */
    /* ALWAYS OPEN WEBSITE FROM TOP */
    /* ====================================================== */

    window.history.scrollRestoration = "manual";

    window.onbeforeunload = () => {

        window.scrollTo(0, 0);
    };

    window.addEventListener("load", () => {

        window.scrollTo(0, 0);
    });

    /* ====================================================== */
    /* MOBILE MENU */
    /* ====================================================== */

    if(menuBtn){

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            if(navbar.classList.contains("active")){

                menuBtn.innerHTML =
                    `<i class="ri-close-line"></i>`;

            }else{

                menuBtn.innerHTML =
                    `<i class="ri-menu-3-line"></i>`;
            }

        });

    }

    /* CLOSE MENU */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            if(menuBtn){

                menuBtn.innerHTML =
                    `<i class="ri-menu-3-line"></i>`;
            }

        });

    });

    /* ====================================================== */
    /* STICKY HEADER */
    /* ====================================================== */

    window.addEventListener("scroll", () => {

        if(window.scrollY > 50){

            header.style.background =
                "rgba(5,8,22,0.85)";

            header.style.backdropFilter =
                "blur(20px)";

            header.style.borderBottom =
                "1px solid rgba(255,255,255,0.08)";

        }else{

            header.style.background =
                "rgba(5,8,22,0.6)";
        }

    });

    /* ====================================================== */
    /* ACTIVE NAVIGATION */
    /* ====================================================== */

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 200;

            const sectionHeight =
                section.clientHeight;

            if(
                pageYOffset >= sectionTop &&
                pageYOffset < sectionTop + sectionHeight
            ){

                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if(link.getAttribute("href") === `#${current}`){

                link.classList.add("active");
            }

        });

    });

    /* ====================================================== */
    /* SMOOTH SCROLL */
    /* ====================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const targetId =
                link.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);

            window.scrollTo({

                top:
                    targetSection.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

    /* ====================================================== */
    /* RESUME MODAL */
    /* ====================================================== */

    const resumeBtn =
        document.getElementById("resumeBtn");

    const resumeModal =
        document.getElementById("resumeModal");

    const closeModal =
        document.querySelector(".close-modal");

    if(resumeBtn && resumeModal){

        resumeBtn.addEventListener("click", () => {

            resumeModal.classList.add("active");

        });

        closeModal.addEventListener("click", () => {

            resumeModal.classList.remove("active");

        });

        window.addEventListener("click", (e) => {

            if(e.target === resumeModal){

                resumeModal.classList.remove("active");

            }

        });

    }

    /* ====================================================== */
    /* CUSTOM CURSOR */
    /* ====================================================== */

    if(!isMobile && cursor){

        window.addEventListener("mousemove", (e) => {

            cursor.style.left = `${e.clientX}px`;

            cursor.style.top = `${e.clientY}px`;

        });

        hoverElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursor.style.transform =
                    "translate(-50%, -50%) scale(2.5)";

                cursor.style.background =
                    "rgba(0,245,255,0.25)";

            });

            element.addEventListener("mouseleave", () => {

                cursor.style.transform =
                    "translate(-50%, -50%) scale(1)";

                cursor.style.background =
                    "rgba(0,245,255,0.15)";

            });

        });

    }

    /* ====================================================== */
    /* REVEAL ANIMATION */
    /* ====================================================== */

    const revealElements = document.querySelectorAll(

        ".section-header,\
         .glass-card,\
         .info-card,\
         .skill-box,\
         .project-card,\
         .experience-card,\
         .certificate-card,\
         .contact-info-card,\
         .contact-form-card"
    );

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(element => {

        element.classList.add("hidden");

        revealObserver.observe(element);

    });

    /* ====================================================== */
    /* MAGNETIC BUTTON EFFECT */
    /* ====================================================== */

    if(!isMobile){

        const buttons = document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );

        buttons.forEach(button => {

            button.addEventListener("mousemove", (e) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    e.clientX - rect.left - rect.width / 2;

                const y =
                    e.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.15}px, ${y * 0.15}px)`;

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform =
                    "translate(0px,0px)";

            });

        });

    }

    /* ====================================================== */
    /* FLOATING STATS */
    /* ====================================================== */

    function floatingAnimation(elements, speed){

        elements.forEach((element, index) => {

            let position = 0;

            setInterval(() => {

                position += 0.02;

                element.style.transform =
                    `translateY(${Math.sin(position + index) * speed}px)`;

            }, 20);

        });

    }

    floatingAnimation(statCards, 8);

    /* ====================================================== */
    /* 3D PROJECT CARD EFFECT */
    /* ====================================================== */

    if(!isMobile){

        projectCards.forEach(card => {

            card.addEventListener("mousemove", (e) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 18;

                const rotateY =
                    (centerX - x) / 18;

                card.style.transform =
                    `perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    `perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0px)`;

            });

        });

    }

    /* ====================================================== */
    /* SKILL HOVER EFFECT */
    /* ====================================================== */

    skillBoxes.forEach(box => {

        box.addEventListener("mousemove", (e) => {

            const rect =
                box.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            box.style.background =
                `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(0,245,255,0.18),
                    rgba(255,255,255,0.03)
                )`;

        });

        box.addEventListener("mouseleave", () => {

            box.style.background =
                "rgba(13, 23, 42, 0.65)";

        });

    });

    /* ====================================================== */
    /* PARALLAX ORBS */
    /* ====================================================== */

    if(!isMobile){

        const orb1 = document.querySelector(".orb1");

        const orb2 = document.querySelector(".orb2");

        window.addEventListener("mousemove", (e) => {

            const x =
                e.clientX / window.innerWidth;

            const y =
                e.clientY / window.innerHeight;

            orb1.style.transform =
                `translate(${x * 40}px, ${y * 40}px)`;

            orb2.style.transform =
                `translate(${x * -40}px, ${y * -40}px)`;

        });

    }

    /* ====================================================== */
    /* TYPEWRITER EFFECT */
    /* ====================================================== */

    const roles = [

        "Full Stack Developer",
        "AI Engineer",
        "Data Analyst",
        "Graphic & Motion Designer",
        "UI/UX Creator"

    ];

    const roleElement =
        document.querySelector(".hero-tag");

    let roleIndex = 0;

    let charIndex = 0;

    function typeEffect(){

        if(charIndex < roles[roleIndex].length){

            roleElement.textContent =
                roles[roleIndex].substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            setTimeout(typeEffect, 80);

        }else{

            setTimeout(eraseEffect, 1500);

        }

    }

    function eraseEffect(){

        if(charIndex > 0){

            roleElement.textContent =
                roles[roleIndex].substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            setTimeout(eraseEffect, 40);

        }else{

            roleIndex++;

            if(roleIndex >= roles.length){

                roleIndex = 0;

            }

            setTimeout(typeEffect, 300);

        }

    }

    if(roleElement){

        roleElement.textContent = "";

        typeEffect();

    }

    /* ====================================================== */
    /* SCROLL PROGRESS BAR */
    /* ====================================================== */

    const progressBar =
        document.createElement("div");

    progressBar.classList.add("scroll-progress");

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight
            -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / scrollHeight) * 100;

        progressBar.style.width =
            `${progress}%`;

    });

    /* ====================================================== */
    /* PARTICLE CLICK EFFECT */
    /* ====================================================== */

    if(!isMobile){

        document.addEventListener("click", (e) => {

            for(let i = 0; i < 6; i++){

                createParticle(
                    e.clientX,
                    e.clientY
                );

            }

        });

    }

    function createParticle(x, y){

        const particle =
            document.createElement("span");

        particle.classList.add("particle");

        document.body.appendChild(particle);

        const size =
            Math.random() * 8 + 2;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;

        const destinationX =
            (Math.random() - 0.5) * 300;

        const destinationY =
            (Math.random() - 0.5) * 300;

        particle.animate([

            {
                transform:
                    "translate(0,0)",
                opacity: 1
            },

            {
                transform:
                    `translate(
                        ${destinationX}px,
                        ${destinationY}px
                    )`,
                opacity: 0
            }

        ], {

            duration: 1200,

            easing:
                "cubic-bezier(0, .9, .57, 1)"

        });

        setTimeout(() => {

            particle.remove();

        }, 1200);

    }

});