import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './image-gallery.module.css';

function ImageGallery({ items, onClick }) {
  const elements = items.map(({ id, ...rest }) => (
    <ImageGalleryItem key={id} {...rest} onClick={onClick} />
  ));

  return <ul className={s.imageGallery}>{elements}</ul>;
}

export default ImageGallery;


ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),)
};
