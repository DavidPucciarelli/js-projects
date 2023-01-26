const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Dark or Light Images
function imageMode(color) {
  image1.src = `img/undraw_next_tasks_${color}_mode.svg`;
  image2.src = `img/undraw_proud_coder_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = isDark
    ? `${DARK_THEME} mode`
    : `${LIGHT_THEME} mode`;
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  isDark ? imageMode(DARK_THEME) : imageMode(LIGHT_THEME);
}

// // Dark Mode Style
// function darkMode() {
//   nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
//   textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
//   toggleIcon.children[0].textContent = "Dark Mode";
//   toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
//   imageMode("dark");
// }

// // Light Mode Style
// function lightMode() {
//   nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
//   textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
//   toggleIcon.children[0].textContent = "Light Mode";
//   toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
//   imageMode("light");
// }

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    localStorage.setItem("theme", DARK_THEME); // keeping data in localStorage. It always must be a string
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    toggleDarkMode(true);
  } else {
    localStorage.setItem("theme", LIGHT_THEME);
    document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    toggleDarkMode(false);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  // when using local storage, I must always check for if it exists, because on the first visit of the page the local storage is always = null (I don't have anything in the storage yet)
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    toggleDarkMode(true);
  }
}
