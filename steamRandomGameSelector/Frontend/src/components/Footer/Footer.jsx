import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <p>Copyright steamroll &copy; 2024 </p>
        <p>
          This Site is not associated with Steam/Valve software. Steam is a
          trademark of Valve Corporation. All game logos are property of their
          respective owners
        </p>
        <p>
          If you would like to report an issue or feedback you can do so{" "}
          <a
            style={{ color: "var(--accent)", textDecoration: "underline" }}
            href="#"
          >
            here
          </a>
        </p>
      </footer>
    </div>
  );
};
