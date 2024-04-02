import AppNavbar from "./components/AppNavbar"; // Importing the AppNavbar component
import AppBody from "./components/AppBody"; // Importing the AppBody component
import { useState } from "react"; // Importing the useState hook from React
import { ThemeContext } from "./contexts/themeContext"; // Importing the ThemeContext from the themeContext file

export default function App() {
  const [theme, setTheme] = useState("light"); // Using the useState hook to create a state variable 'theme' with initial value 'light'
  const toggleTheme = () => { // Defining a function toggleTheme to toggle between light and dark themes
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // Using the setTheme function to toggle the theme based on the previous theme value
    toggleDarkMode(currentTheme);
  };

  const toggleDarkMode = (currentTheme) => {
    const page = document.querySelector("*");
    page.style.backgroundColor = currentTheme === 'dark' ? 'rgba(1, 1, 1, 1.63)' : 'rgba(255, 255, 255, 0.801)';
    page.style.color = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.801)' : 'rgba(0, 0, 0, 0.63)';
  };

  return (
    <ThemeContext.Provider value={theme}> {/* Providing the theme value to the ThemeContext.Provider */}
      <AppNavbar onToggleTheme={toggleTheme} /> {/* Rendering the AppNavbar component and passing the toggleTheme function as prop */}
      <AppBody /> {/* Rendering the AppBody component */}
    </ThemeContext.Provider>
  ); 
}