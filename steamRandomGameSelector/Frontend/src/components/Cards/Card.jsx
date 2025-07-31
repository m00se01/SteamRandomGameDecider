import "./Card.css";
const Card = ({ children, className }) => {
  return <div className={`card-container ${className}`}>{children}</div>;
};

export default Card;
