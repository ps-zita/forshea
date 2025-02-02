document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const content = document.getElementById('content');
    const yesButton = document.querySelector('.btn.yes');
    const noButton = document.querySelector('.btn.no');
    const buttonsContainer = document.querySelector('.buttons');

    // Load audio files
    const buzzSound = new Audio('buzz.wav');
    const animaleseSound = new Audio('animalese.wav');

    envelope.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling
        // Play the animalese sound after 0.5 seconds
        setTimeout(() => {
            animaleseSound.play();
        }, 500);

        // Fade out the envelope image
        envelope.style.transition = 'opacity 0.5s';
        envelope.style.opacity = '0';

        // Show the content with fade and scale effect
        setTimeout(() => {
            content.style.display = 'flex';
            content.style.animation = 'scale-up 1s forwards';
        }, 500); // Delay to ensure envelope is fully transparent
    });

    // Handle the click event for the "eww.. no.." button
    noButton.addEventListener('click', () => {
        buzzSound.play(); // Play the buzz sound

        if (noButton.textContent === 'eww.. no..') {
            noButton.textContent = 'no!!!';
            noButton.style.backgroundColor = '#b0bec5'; // Grey
            swapButtons();
        } else if (noButton.textContent === 'no!!!') {
            noButton.textContent = 'no way! NERD!';
            noButton.style.backgroundColor = '#b0bec5'; // Grey
        } else if (noButton.textContent === 'no way! NERD!') {
            noButton.classList.add('disabled');
            yesButton.classList.add('larger');
            swapButtons();
            buttonsContainer.classList.add('vertical'); // Change layout to vertical
        }
    });

    function swapButtons() {
        const parent = yesButton.parentElement;
        parent.insertBefore(yesButton, noButton); // Ensure the green button is on top
    }

    // Prevent any clicks on the body from affecting the animation
    document.body.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});