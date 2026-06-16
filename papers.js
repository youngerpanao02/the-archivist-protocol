const papersContainer =
    document.getElementById("papers");

for (let i = 0; i < 12; i++) {

    createPaper();
}

function createPaper() {

    const paper =
        document.createElement("div");

    paper.classList.add(
        "paper-fragment"
    );

    resetPaper(paper);

    papersContainer.appendChild(
        paper
    );

    animatePaper(paper);
}

function resetPaper(paper) {

    paper.style.left =
        Math.random() * 100 + "vw";

    paper.style.top =
        Math.random() * 120 + "vh";

    paper.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    paper.dataset.speed =
        20 + Math.random() * 30;

    paper.dataset.drift =
        Math.random() * 100 - 50;
}

function animatePaper(paper) {

    let start =
        performance.now();

    const duration =
        paper.dataset.speed * 1000;

    const initialTop =
        parseFloat(
            paper.style.top
        );

    const initialLeft =
        parseFloat(
            paper.style.left
        );

    const drift =
        parseFloat(
            paper.dataset.drift
        );

    function frame(time) {

        let progress =
            (time - start) / duration;

        if (progress > 1) {

            resetPaper(paper);

            start = performance.now();

            requestAnimationFrame(
                frame
            );

            return;
        }

        const y =
            initialTop - progress * 150;

        const x =
            initialLeft +
            Math.sin(progress * 10) *
            drift * 0.02;

        const rotate =
            progress * 360;

        paper.style.transform =
            `translate(${x}px, ${y}vh)
             rotate(${rotate}deg)`;

        requestAnimationFrame(
            frame
        );
    }

    requestAnimationFrame(frame);
}