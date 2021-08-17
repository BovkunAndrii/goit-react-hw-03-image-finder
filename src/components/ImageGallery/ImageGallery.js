import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import S from "./ImadeGallery.module.css";

const ImageGallery = ({ pictures, bigImage }) => {
  return (
    <ul className={S.ImageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL }) => {
        const handleItemClick = () => bigImage(largeImageURL);

        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            onClick={handleItemClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  bigImage: PropTypes.func,
};

export default ImageGallery;
