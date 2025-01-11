// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // Add to your scripts.js file
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        parallaxSections.forEach(section => {
            const limit = section.offsetTop + section.offsetHeight;
            if (scrolled > section.offsetTop && scrolled <= limit) {
                const yPos = (scrolled - section.offsetTop) / 2;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
});

    // Scroll reveal animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const elementInView = (el, offset = 150) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Trigger once on load
    handleScrollAnimation();
});
// Fetch and display weather information

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "5f3b947a1b8c42de9a0141649250901"; // Replace with your WeatherAPI.com API key
    const weatherElement = document.getElementById("weather");
    const weatherModal = document.getElementById("weather-modal");
    const closeModal = document.getElementById("close-weather-modal");

    // Function to get the weather data for the user's location
    function getWeather(latitude, longitude) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Debugging line to check fetched data
                if (data.error) {
                    weatherElement.textContent = "Weather data not available";
                } else {
                    const temp = data.current.temp_c; // Temperature in Celsius
                    const condition = data.current.condition.text; // Weather condition
                    const windSpeed = data.current.wind_kph; // Wind speed in kph
                    const humidity = data.current.humidity; // Humidity in percentage
                    const pressure = data.current.pressure_mb; // Pressure in mb

                    // Displaying basic weather info in navbar
                    weatherElement.textContent = `${data.location.name}: ${temp}°C, ${condition}`;

                    // Event listener to open the modal when clicked
                    weatherElement.addEventListener("click", function() {
                        console.log("Weather clicked");  // Debugging line
                        // Displaying detailed weather info in the modal
                        document.getElementById("temp-data").textContent = `${temp}°C`;
                        document.getElementById("humidity-data").textContent = `${humidity}%`;
                        document.getElementById("wind-speed-data").textContent = `${windSpeed} kph`;
                        document.getElementById("pressure-data").textContent = `${pressure} mb`;
                        
                        // Show the modal (remove 'hidden' class)
                        weatherModal.classList.remove("hidden");
                    });
                }
            })
            .catch(error => {
                weatherElement.textContent = "Error fetching weather data";
                console.error("Error fetching weather data:", error);
            });
    }

    // Get the user's location (latitude and longitude)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeather(latitude, longitude); // Fetch weather data for the user's location
        }, function(error) {
            weatherElement.textContent = "Error fetching location data";
            console.error("Error fetching location:", error);
        });
    } else {
        weatherElement.textContent = "Geolocation is not supported by this browser.";
    }

    // Close the modal when the user clicks on the close button
    closeModal.addEventListener("click", function() {
        weatherModal.classList.add("hidden"); // Hide the modal (add 'hidden' class)
    });
});






