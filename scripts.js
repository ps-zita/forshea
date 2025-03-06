document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const intervalTime = 3000; // 5 seconds between slides

    function showSlide(index) {
        // Remove active class from all slides
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current slide
        carouselItems[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Show first slide
    showSlide(currentIndex);

    // Start automatic rotation
    setInterval(nextSlide, intervalTime);
});