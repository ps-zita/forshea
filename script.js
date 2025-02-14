document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const content = document.getElementById('content');
    const yesButton = document.querySelector('.btn.yes');
    const noButton = document.querySelector('.btn.no');
    const buttonsContainer = document.querySelector('.buttons');
    const countdown = document.getElementById('countdown');
    const timer = document.getElementById('timer');
    const headline = document.getElementById('headline');

    // Load audio files
    const buzzSound = new Audio('buzz.wav');
    const animaleseSound = new Audio('animalese.wav');
    const hooraySound = new Audio('hooray.wav');

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

    // Handle the click event for the "YES!!!" button
    yesButton.addEventListener('click', () => {
        // Play the hooray sound
        hooraySound.play();
        // Hide other content (buttons and headline)
        document.querySelectorAll('.buttons, #headline').forEach(element => {
            element.style.display = 'none';
        });
        // Display the countdown message
        countdown.style.display = 'block';
        // Animate the postcard twirling and fading out
        content.style.animation = 'twirl-fade-out 1s forwards';
        // Redirect to another webpage after the animation
        setTimeout(() => {
            window.location.href = 'blogpage.html'; // Replace with the URL of the desired webpage
        }, 1500); // Delay to match the animation duration plus an extra half second
    });

    function swapButtons() {
        const parent = yesButton.parentElement;
        parent.insertBefore(yesButton, noButton); // Ensure the green button is on top
    }

    // Initialize and start the countdown to Valentine's Day in Los Angeles timezone
    function startCountdown() {
        const valentineDate = new Date(new Date().getFullYear(), 1, 14); // February 14th of the current year
        const laTimezone = 'America/Los_Angeles';

        function updateTimer() {
            const now = new Date();
            const laTime = new Date(now.toLocaleString('en-US', { timeZone: laTimezone }));
            const timeDiff = valentineDate - laTime;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                timer.textContent = "It's time to open the letter!";
                clearInterval(intervalId);
            }
        }

        updateTimer(); // Initial call to set the timer immediately
        const intervalId = setInterval(updateTimer, 1000); // Update the timer every second
    }

    // Prevent any clicks on the body from affecting the animation
    document.body.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});