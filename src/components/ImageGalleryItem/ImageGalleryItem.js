import React from 'react';
import PropTypes from 'prop-types';

import styles from '../ImageGalleryItem/imageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={webformatURL} alt={tags} data-url={largeImageURL} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
