import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './image-gallery.module.css';

function ImageGallery({ items, onClick }) {
  const elements = items.map(({ id, ...rest }) => (
    <ImageGalleryItem key={id} {...rest} onClick={onClick} />
  ));
  // <li onClick={() => showModal({ title, body })} className={styles.item} key={id}>
  //     <h4>{title}</h4>
  //     <p>{body}</p>
  // </li>);

  return <ul className={s.imageGallery}>{elements}</ul>;
}

export default ImageGallery;
