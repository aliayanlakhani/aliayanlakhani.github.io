/* ======================================================= */
/* FUTURISTIC LIQUID BACKGROUND */
/* ======================================================= */

class FuturisticBackground {

    constructor() {

        /* ======================================================= */
        /* DEVICE CHECK */
        /* ======================================================= */

        this.isMobile =
            window.innerWidth <= 768;

        /* ======================================================= */
        /* CANVAS */
        /* ======================================================= */

        this.canvas =
            document.createElement("canvas");

        this.ctx =
            this.canvas.getContext("2d");

        this.canvas.id =
            "liquid-background";

        document.body.prepend(this.canvas);

        /* ======================================================= */
        /* SIZE */
        /* ======================================================= */

        this.resizeCanvas();

        /* ======================================================= */
        /* PARTICLES */
        /* ======================================================= */

        this.particles = [];

        this.mouse = {

            x: this.width / 2,
            y: this.height / 2
        };

        /* ======================================================= */
        /* SETTINGS */
        /* ======================================================= */

        this.particleCount =
            this.getParticleCount();

        this.connectionDistance =
            this.isMobile ? 90 : 140;

        this.colors = [

            "#00f5ff",
            "#38bdf8",
            "#8b5cf6",
            "#00ffff",
            "#60a5fa"

        ];

        /* ======================================================= */
        /* INIT */
        /* ======================================================= */

        this.initParticles();

        this.events();

        this.animate();

    }

    /* ======================================================= */
    /* CANVAS SIZE */
    /* ======================================================= */

    resizeCanvas() {

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;

        this.canvas.width =
            this.width;

        this.canvas.height =
            this.height;

    }

    /* ======================================================= */
    /* PARTICLE COUNT */
    /* ======================================================= */

    getParticleCount() {

        if(window.innerWidth < 768){

            return 35;

        }else if(window.innerWidth < 1200){

            return 70;

        }else{

            return 100;

        }

    }

    /* ======================================================= */
    /* CREATE PARTICLES */
    /* ======================================================= */

    initParticles() {

        this.particles = [];

        for(let i = 0; i < this.particleCount; i++){

            this.particles.push({

                x:
                    Math.random() * this.width,

                y:
                    Math.random() * this.height,

                size:
                    Math.random() * 2 + 1,

                speedX:
                    (Math.random() - 0.5) * 0.5,

                speedY:
                    (Math.random() - 0.5) * 0.5,

                color:
                    this.colors[
                        Math.floor(
                            Math.random()
                            *
                            this.colors.length
                        )
                    ],

                opacity:
                    Math.random() * 0.5 + 0.2

            });

        }

    }

    /* ======================================================= */
    /* DRAW PARTICLE */
    /* ======================================================= */

    drawParticle(particle) {

        this.ctx.beginPath();

        this.ctx.arc(

            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2

        );

        this.ctx.fillStyle =
            particle.color;

        this.ctx.globalAlpha =
            particle.opacity;

        this.ctx.shadowBlur =
            this.isMobile ? 8 : 20;

        this.ctx.shadowColor =
            particle.color;

        this.ctx.fill();

        this.ctx.globalAlpha = 1;

    }

    /* ======================================================= */
    /* CONNECT PARTICLES */
    /* ======================================================= */

    connectParticles() {

        for(let a = 0; a < this.particles.length; a++){

            for(let b = a + 1; b < this.particles.length; b++){

                const dx =
                    this.particles[a].x
                    -
                    this.particles[b].x;

                const dy =
                    this.particles[a].y
                    -
                    this.particles[b].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if(distance < this.connectionDistance){

                    const opacity =
                        1 -
                        distance /
                        this.connectionDistance;

                    this.ctx.beginPath();

                    this.ctx.strokeStyle =
                        `rgba(0,245,255,${
                            opacity * 0.15
                        })`;

                    this.ctx.lineWidth = 1;

                    this.ctx.moveTo(

                        this.particles[a].x,
                        this.particles[a].y

                    );

                    this.ctx.lineTo(

                        this.particles[b].x,
                        this.particles[b].y

                    );

                    this.ctx.stroke();

                }

            }

        }

    }

    /* ======================================================= */
    /* UPDATE PARTICLES */
    /* ======================================================= */

    updateParticles() {

        this.particles.forEach(particle => {

            /* MOVEMENT */

            particle.x += particle.speedX;

            particle.y += particle.speedY;

            /* MOUSE INTERACTION */

            const dx =
                this.mouse.x - particle.x;

            const dy =
                this.mouse.y - particle.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if(distance < 180){

                const force =
                    (180 - distance) / 180;

                particle.x -=
                    dx * force * 0.005;

                particle.y -=
                    dy * force * 0.005;

            }

            /* BOUNDARY */

            if(
                particle.x < 0 ||
                particle.x > this.width
            ){

                particle.speedX *= -1;

            }

            if(
                particle.y < 0 ||
                particle.y > this.height
            ){

                particle.speedY *= -1;

            }

            /* DRAW */

            this.drawParticle(particle);

        });

    }

    /* ======================================================= */
    /* BACKGROUND GLOW */
    /* ======================================================= */

    drawBackgroundGlow() {

        const gradient =

            this.ctx.createRadialGradient(

                this.mouse.x,
                this.mouse.y,
                0,

                this.mouse.x,
                this.mouse.y,

                this.isMobile ? 250 : 400

            );

        gradient.addColorStop(

            0,
            "rgba(0,245,255,0.05)"

        );

        gradient.addColorStop(

            1,
            "rgba(0,245,255,0)"

        );

        this.ctx.fillStyle =
            gradient;

        this.ctx.fillRect(

            0,
            0,
            this.width,
            this.height

        );

    }

    /* ======================================================= */
    /* MAIN ANIMATION */
    /* ======================================================= */

    animate() {

        this.ctx.clearRect(

            0,
            0,
            this.width,
            this.height

        );

        /* BACKGROUND */

        this.ctx.fillStyle =
            "#050816";

        this.ctx.fillRect(

            0,
            0,
            this.width,
            this.height

        );

        this.drawBackgroundGlow();

        this.updateParticles();

        this.connectParticles();

        requestAnimationFrame(
            () => this.animate()
        );

    }

    /* ======================================================= */
    /* EVENTS */
    /* ======================================================= */

    events() {

        /* RESIZE */

        window.addEventListener(

            "resize",

            () => {

                this.resizeCanvas();

                this.particleCount =
                    this.getParticleCount();

                this.initParticles();

            }

        );

        /* MOUSE */

        if(!this.isMobile){

            window.addEventListener(

                "mousemove",

                (e) => {

                    this.mouse.x =
                        e.clientX;

                    this.mouse.y =
                        e.clientY;

                }

            );

        }

        /* TOUCH */

        window.addEventListener(

            "touchmove",

            (e) => {

                this.mouse.x =
                    e.touches[0].clientX;

                this.mouse.y =
                    e.touches[0].clientY;

            },

            { passive: true }

        );

    }

}

/* ======================================================= */
/* INITIALIZE */
/* ======================================================= */

window.addEventListener("load", () => {

    new FuturisticBackground();

});