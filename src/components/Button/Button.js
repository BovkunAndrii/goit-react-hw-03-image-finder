import PropTypes from "prop-types";
import S from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <button className={S.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
