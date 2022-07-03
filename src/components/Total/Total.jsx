import PropTypes from 'prop-types';
import s from './total.module.css';

const Total = ({ totalImg, totalShown }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.total}>Total image found : {totalImg} </p>
      <p className={s.total}>Total image shown: {totalShown} </p>
    </div>
  );
};

export default Total;

Total.propTypes = {
  totalImg: PropTypes.number.isRequired,
  totalShown: PropTypes.number.isRequired,
};
