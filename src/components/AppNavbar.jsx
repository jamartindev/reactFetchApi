import React, { useContext, useEffect } from "react"; // Importing React, useContext, and useEffect from React
import { ThemeContext } from "../contexts/themeContext"; // Importing the ThemeContext from the themeContext file
import "../styles/Nav.css"; // Importing the Nav.css file for styling



// Logo component
function Logo() {
  return (
    <a className="logo">
      <img src="./reactFetchApi/assets/jujuLogo.svg" alt="Jujutsu Kaisen Logo" />
    </a>
  );
}

// ThemeToggle component
function ThemeToggle({ onToggleTheme }) {
  const theme = useContext(ThemeContext); // Using the useContext hook to access the current theme from the ThemeContext
  return (
    <a className="btnDarkMode" onClick={onToggleTheme}>
      <img
        alt={`${
          theme === "light" ? "Dark" : "Light"
        } Mode`}
        src={`${theme === "light" ? "/reactFetchApi/assets/theme_dark.svg" : "/reactFetchApi/assets/theme_light.svg"}`}
      />
    </a>
  );
}

// NavbarLink component
function NavbarLink({ href, target, children }) {
  return (
    <a href={href} target={target}>
      {children}
    </a>
  );
}

// HamburgerIcon component
function HamburgerIcon() {
  return (
    <a href="#" className="icon">
      <i className="fa fa-bars"></i>
    </a>
  );
}

// AppNavbar component
export default function AppNavbar({ onToggleTheme }) {
  useEffect(() => { // Using the useEffect hook to add an event listener for collapsing the nav bar
    const collapseNav = (e) => { // Defining the collapseNav function to toggle the responsive class on the nav bar
      e.preventDefault();
      let x = document.querySelector(".nav-bar");
      if (x.className === "nav-bar") {
        x.className += " responsive";
      } else {
        x.className = "nav-bar";
      }
    };
    document.querySelector(".icon").addEventListener("click", collapseNav); // Adding an event listener to the icon for clicking to collapse the nav bar
  }, []);
  return (
    <div className="nav-bar">
      <Logo />
      <ThemeToggle onToggleTheme={onToggleTheme} />
      <NavbarLink href="https://jujutsu-kaisen.fandom.com/wiki/Jujutsu_Kaisen_Wiki" target="_blank">Wiki</NavbarLink>
      <NavbarLink href="https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen" target="_blank">Crunchyroll</NavbarLink>
      <HamburgerIcon />
    </div>
  );
}

