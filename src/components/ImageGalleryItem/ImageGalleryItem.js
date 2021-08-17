import PropTypes from "prop-types";
import S from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={S.ImageGalleryItem}>
      <img
        src={image}
        alt=""
        className={S.ImageGalleryItemImage}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  bigImage: PropTypes.func,
};

export default ImageGalleryItem;
