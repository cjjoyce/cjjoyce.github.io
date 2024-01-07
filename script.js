/**
 * Close the responsive menu when exiting the page.
 */
function pageUnload() {
    closeResponsiveMenu();
}

/**
 * Global function for all pages when shown.
 */
function pageShow() {
    var bodyElement = document.body;
    var allBodyElements = bodyElement.getElementsByTagName("*");
    // Add the transition class to body.
    if (bodyElement.classList.contains("dark-mode-transition")) {
        bodyElement.classList.remove("dark-mode-transition");
    }
    // Add transition class to all elements inside body.
    for (var i = 0; i < allBodyElements.length; i++) {
        if (allBodyElements[i].classList.contains("dark-mode-transition")) {
            // Add dark-mode-transition class to all elements.
            allBodyElements[i].classList.remove("dark-mode-transition");
        }
    }
    setDarkMode(localStorage.getItem("theme-setting"));
}

/**
 * Main function for index page.
 */
function indexMain() {
    var jobTitleElement = document.getElementById("job-title");
    if (jobTitleElement != null) {
        var jobTitles = ["Software Developer", "JavaScript Developer", "Python Developer", "Java Developer", "Computer Science Graduate"];
        animateTyping(jobTitleElement, jobTitles);
    }
    var paragraphElements = document.getElementsByTagName("p");
    setTimeout(function() {
        fadeIn(paragraphElements);
    }, 500);
}

var responsiveTransitionTimeout;

/**
 * Open and close responsive menu when clicking the hamburger button.
 */
function displayResponsiveMenu() {
    clearTimeout(responsiveTransitionTimeout);
    var navBar = document.getElementsByTagName("nav")[0];
    if (navBar.classList.contains("responsive")) {
        navBar.classList.remove("responsive");
        document.getElementById("dark-mode-button").style.zIndex = "auto";
    }
    else {
        navBar.classList.add("responsive");
        responsiveTransitionTimeout = setTimeout(function() {
            // Wait for opacity transition (0.5s) then decrease the z-index so that it can't be clicked.
            document.getElementById("dark-mode-button").style.zIndex = "-1";
        }, 400);
    }
}

/**
 * Close responsive menu when clicking off.
 */
function closeResponsiveMenu() {
    clearTimeout(responsiveTransitionTimeout);
    var navBar = document.getElementsByTagName("nav")[0];
    if (navBar.classList.contains("responsive")) {
        navBar.classList.remove("responsive");
        document.getElementById("dark-mode-button").style.zIndex = "auto";
    }
}

// If the screen is larger than mobile then close the responsive menu.
window.onresize = function() {
    if (window.innerWidth > 768) {
        closeResponsiveMenu();
    }
};

var themeTransitionTimeout;
/**
 * Toggles dark/light mode when the dark mode button is clicked.
 */
function toggleDarkMode() {
    var navElement = document.getElementsByTagName("nav")[0];
    if (navElement == null || navElement.classList.contains("responsive") === false) {
        clearTimeout(themeTransitionTimeout);
        let allElements = document.getElementsByTagName("*");

        // Add transition class to all elements.
        for (let i = 0; i < allElements.length; i++) {
            if (!allElements[i].classList.contains("dark-mode-transition")) {
                // Add dark-mode-transition class to all elements.
                allElements[i].classList.add("dark-mode-transition");
            }
        }
        var darkModeSetting;
        if (localStorage.getItem("theme-setting")) {
            darkModeSetting = localStorage.getItem("theme-setting");
        }
        else {
            darkModeSetting = "light";
        }
        if (darkModeSetting == "dark") {
            localStorage.setItem("theme-setting", "light");
        }
        else {
            localStorage.setItem("theme-setting", "dark");
        }
        setDarkMode(localStorage.getItem("theme-setting"));
        // Wait for the theme transtion then remove the dark-mode-transition from all elements
        themeTransitionTimeout = setTimeout(function() {
            let allElements = document.getElementsByTagName("*");
            for (let i = 0; i < allElements.length; i++) {
                if (allElements[i].classList.contains("dark-mode-transition")) {
                    allElements[i].classList.remove("dark-mode-transition");
                }
            }
        }, 800);
    }
}

function setDarkMode(darkModeSetting) {
    var bodyElement = document.body;
    var allBodyElements = bodyElement.getElementsByTagName("*");
    // Toggle body class.
    if (darkModeSetting == "dark") {
        bodyElement.classList.add("dark-mode");
        // Change dark mode button icon to sun.
        // document.getElementById("dark-mode-icon").getElementsByTagName("path")[0].setAttribute('d', "M 62.22,4.78 C 72.48,3.21 69.81,21.62 65.78,23.22 57.18,26.63 58.49,9.90 59.74,7.23 60.56,5.47 60.89,5.71 62.22,4.78 Z M 23.23,20.78 C 28.39,20.01 32.73,23.75 35.40,28.00 37.16,30.80 37.53,34.97 33.85,36.38 28.44,38.47 14.98,26.55 23.23,20.78 Z M 101.00,20.78 C 113.38,19.05 105.70,33.86 98.00,36.38 93.58,37.83 90.17,34.42 91.62,30.00 92.95,25.94 97.37,22.61 101.00,20.78 Z M 57.00,34.53 C 68.30,32.68 78.99,35.09 86.79,44.02 101.51,60.87 93.10,88.40 71.00,93.47 42.41,100.03 22.02,65.98 41.21,44.02 45.49,39.12 50.85,36.34 57.00,34.53 Z M 7.23,59.74 C 10.45,58.88 17.71,58.31 20.77,59.74 24.50,61.48 24.50,66.52 20.77,68.26 18.54,69.31 9.46,69.31 7.23,68.26 2.98,66.28 3.94,62.12 7.23,59.74 Z M 107.23,59.67 C 110.18,58.96 118.01,58.35 120.77,59.67 124.50,61.28 124.50,66.72 120.77,68.33 118.66,69.35 109.33,69.25 107.23,68.33 102.98,66.28 103.94,62.12 107.23,59.67 Z M 29.00,92.03 C 33.70,90.61 38.25,92.31 36.38,98.00 35.39,101.03 30.86,105.46 28.00,106.81 23.13,109.11 19.28,105.62 20.78,101.00 22.01,97.20 25.82,94.14 29.00,92.03 Z M 93.31,92.03 C 98.89,90.12 103.44,94.35 106.26,99.00 107.76,101.47 108.40,104.97 105.57,106.81 100.58,110.05 86.67,99.17 93.31,92.03 Z M 62.22,104.78 C 72.48,103.21 69.81,121.62 65.78,123.22 57.18,126.63 58.49,109.90 59.74,107.23 60.56,105.47 60.89,105.71 62.22,104.78 Z");
        // document.getElementById("dark-mode-icon").className = "fa fa-sun-o";
    }
    else {
        bodyElement.classList.remove("dark-mode");
        // Change dark mode button icon to moon.
        // document.getElementById("dark-mode-icon").getElementsByTagName("path")[0].setAttribute('d', "M 55.00,0.48 C 59.04,0.14 63.07,0.66 61.25,6.02 59.86,10.09 54.93,13.58 51.45,22.00 43.71,40.76 46.86,58.59 60.32,73.96 69.16,84.05 85.52,91.12 99.00,89.83 104.55,89.30 110.83,87.75 116.00,85.67 118.08,84.83 121.18,83.03 123.25,84.84 127.72,88.77 117.61,101.32 115.00,104.62 102.90,119.96 85.39,127.72 66.25,127.50 21.00,127.50 -9.12,82.28 5.54,42.00 13.78,19.37 31.83,5.33 55.00,0.48 Z")
        // document.getElementById("dark-mode-icon").className = "fa fa-moon-o";
    }
    // Toggle the class of all elements inside the body.
    for (var i = 0; i < allBodyElements.length; i++) {
        if (darkModeSetting == "dark") {
            // Add dark-mode class to all elements.
            allBodyElements[i].classList.add("dark-mode");
        }
        else {
            // Remove dark-mode class from all elements.
            allBodyElements[i].classList.remove("dark-mode");
        }
    }
}

/**
* Creates an animation for typing out strings.
* 
* @param {Element} element         The element which text is to be modified.
* @param {Array.<String>} list     A list of strings to be printed in order.
* @param {Number} index            Index of the current character in the string.
* @param {Number} listIndex        Index of the string in the list.
* @param {String} typed            String that has been printed so far.
* 
*/
function animateTyping(element, list, index, listIndex, typed) {
    // These don't need to be defined on initial call.
    if (index == undefined) {
        var index = 0;
    }
    if (listIndex == undefined) {
        var listIndex = 0;
    }
    if (typed == undefined) {
        var typed = '';
    }
    // Adds the cursor animation after the text.
    element.classList.add("typed-text");

    if (index < list[listIndex].length) {
        typed += list[listIndex].charAt(index);
        element.textContent = typed;
        index++;
        setTimeout(function() {
            animateTyping(element, list, index, listIndex, typed);
        }, 50);
    }
    
    else if (list.length > 1){
        setTimeout(function() {
            element.classList.add("highlight");
            element.classList.remove("typed-text");
        }, 2000);

        setTimeout(function() {
            element.classList.remove("highlight");
            typed = '';
            element.textContent = typed;
            listIndex++;
            if (listIndex == list.length) {
                listIndex = 0;
            }
            animateTyping(element, list, 0, listIndex, typed);
        }, 3500);
    }
}

function fadeIn(elementList, listIndex, opacity) {
    if (listIndex == undefined) {
        var listIndex = 0;
    }
    if (opacity == undefined) {
        var opacity = 0;
    }
    if (opacity < 1) {
        opacity += 0.01;
        elementList[listIndex].style.opacity = opacity;
        setTimeout(function() {
            fadeIn(elementList, listIndex, opacity);
        }, 10);
    }
    else {
        listIndex++;
        if (listIndex < elementList.length) {
            opacity = 0;
            setTimeout(function() {
                fadeIn(elementList, listIndex, opacity);
            }, 200);
        }
    }
}

function showFlipBoxDescription(flipBoxElement) {
    flipBoxElement.classList.add("show-description");
}

function hideAllFlipBoxDescriptions() {
    let flipBoxElements = document.getElementsByClassName("flip-box");
    for (let i = 0; i < flipBoxElements.length; i++) {
        if (flipBoxElements[i].classList.contains("show-description")) {
            flipBoxElements[i].classList.remove("show-description");
        }
    }
}

function showFlipBox(element) {
    hideAllFlipBoxDescriptions();
    showFlipBoxDescription(element);
    window.event.stopPropagation();
}


function flipBoxMouseMove(element, moveOut) {
    // let currentFlipBox = element.getElementsByClassName("flip-box")[0];
    let currentFlipBoxX = element.getBoundingClientRect().left + (element.offsetWidth / 2);
    let currentFlipBoxY = element.getBoundingClientRect().top + (element.offsetHeight / 2);

    let flipBoxElements = document.getElementsByClassName("flip-box");
    
    for (let i = 0; i < flipBoxElements.length; i++) {
        flipBoxElements[i].style.backgroundImage = 'radial-gradient(circle at ' + currentFlipBoxX + 'px ' + currentFlipBoxY + 'px, rgb(111, 94, 214), rgb(43, 42, 51))';
        // flipBoxElements[i].style.backgroundImage = 'radial-gradient(circle at ' + currentFlipBoxX + 'px ' + currentFlipBoxY + 'px, rgb(230, 0, 0), rgb(43, 42, 51))';
    }
    if (!moveOut) {
        // Make the hovered flip box brighter.
        element.style.backgroundImage = 'radial-gradient(circle at ' + currentFlipBoxX + 'px ' + currentFlipBoxY + 'px, mediumslateblue, rgb(43, 42, 51))';
        // element.style.backgroundImage = 'radial-gradient(circle at ' + currentFlipBoxX + 'px ' + currentFlipBoxY + 'px, red, rgb(43, 42, 51))';
    }
}