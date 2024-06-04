document.addEventListener("DOMContentLoaded", () => {
  const themeSwitchButton = document.getElementById("theme-switch");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.classList.add("dark-theme");
    themeSwitchButton.innerHTML = "🌝";
  }
  themeSwitchButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const newTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeSwitchButton.innerHTML = body.classList.contains("dark-theme")
      ? "🌝"
      : "🌚";
  });
});
