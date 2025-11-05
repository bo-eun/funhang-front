
import { Link } from "react-router-dom";

function ButtonOrLink({ isLink = false, to, onClick, children, className, style, disabled }) {
  if (isLink) {
    return (
      <Link to={to} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

export default ButtonOrLink;
