const canvas = document.getElementById("embers");
const ctx = canvas.getContext("2d");

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

const embers = [];

for (let i = 0; i < 120; i++) {

    embers.push({

        x:
            Math.random() * canvas.width,

        y:
            Math.random() * canvas.height,

        size:
            Math.random() * 3 + 1,

        speed:
            Math.random() * 0.7 + 0.3,

        opacity:
            Math.random() * 0.5 + 0.2
    });
}

function animateEmbers() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    embers.forEach(ember => {

        ember.y -= ember.speed;

        ember.x +=
            Math.sin(ember.y * 0.01) * 0.3;

        if (ember.y < -10) {

            ember.y =
                canvas.height + 10;

            ember.x =
                Math.random() * canvas.width;
        }

        ctx.beginPath();

        ctx.arc(
            ember.x,
            ember.y,
            ember.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,140,60,${ember.opacity})`;

        ctx.fill();
    });

    requestAnimationFrame(
        animateEmbers
    );
}

animateEmbers();