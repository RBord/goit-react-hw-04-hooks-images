import React from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

function ImageGallery ({images, onClick}) {
    return (
    <ul className={s.ImageGallery}>
        {images.map(({id, webformatURL}) => (
            <li key={id}><img src={webformatURL} alt="" onClick={(e => {
                e.preventDefault()
                onClick(webformatURL);
            })}/></li>
        ))}
    </ul>
    )
    
}
export default ImageGallery;