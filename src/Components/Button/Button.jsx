import React from 'react';
import PropTypes from 'prop-types';
import s from '../Button/Button.module.css';

const Button = ({onClick}) => {
    return (
        <button className={s.Button} onClick={onClick} id='loadmore'>Load More</button>
    )
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}