import PropTypes from 'prop-types';
import s from './image-gallery-item.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li className={s.galleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGallery}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

