// Theme Toggle
// Theme Toggle using a button
const themeToggleBtn = document.getElementById("themeToggleBtn");
const currentTheme = localStorage.getItem("theme");

// Set the theme on page load
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});


// Password Generator Functions
const randomFunc = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => "!@#$%^&*(){}[]=<>/,.".charAt(Math.floor(Math.random() * 21)),
};

// Generate Password
document.getElementById("generateBtn").addEventListener("click", () => {
  const length = +document.getElementById("Passwordlength").value;
  const hasLower = document.getElementById("lowercase").checked;
  const hasUpper = document.getElementById("uppercase").checked;
  const hasNumber = document.getElementById("numbers").checked;
  const hasSymbol = document.getElementById("symbols").checked;

  document.getElementById("PasswordResult").value = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let password = "";
  const types = [{ lower }, { upper }, { number }, { symbol }].filter(
    (type) => Object.values(type)[0]
  );

  if (types.length === 0) return "";

  for (let i = 0; i < length; i += types.length) {
    types.forEach((type) => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    });
  }

  return password.slice(0, length);
}

// Copy to Clipboard
document.getElementById("clipboardBtn").addEventListener("click", () => {
  const password = document.getElementById("PasswordResult");
  password.select();
  document.execCommand("copy");
});
