import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <p>Copyright steamroll &copy; 2024 </p>
        <p>This Site is not associated with Steam/Valve software.</p>
        <p>
          If you would like to report an issue or feedback you can do so{" "}
          <a
            style={{ color: "greenyellow", textDecoration: "underline" }}
            href="#"
          >
            here
          </a>
        </p>
      </footer>
    </div>
  );
};
