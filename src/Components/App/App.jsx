import {useState, useEffect} from 'react';
import { fetchImages } from '../../Services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

import s from '../App/App.module.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [imageName, setImageName] = useState(null);
    const [images, setImages] = useState([]);
    const [reqStatus, setReqStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [fullImg, setFullImg] = useState(null);

   
    const onHandleSubmit = newImage => {
        setImageName(newImage);
        setPage(1);
        setImages([]);
    };
    
    const toggleModal = bigImg => {
        setShowModal(!showModal);
        setFullImg(bigImg)
    };
   
    const onCloseModal = () => {
        setShowModal(false)
        setFullImg(null)
    };

    const onScroll = () => {
        const ulEl = document.querySelector('ul');
        window.scrollTo({
            top: ulEl.scrollHeight,
            behavior: 'smooth',
        })
    };

    const pageIncrement = () => {
        setPage(prevState => prevState + 1)
    };

    useEffect(() => {
        if (imageName === null) return;
        setReqStatus('pending');
        async function getImages () {
            try {
                const onFetchImages = await fetchImages(imageName, page).then(setReqStatus('resolve'))
                if (page > 1) {
                    setImages(prev => [...prev, ...onFetchImages]);
                    setTimeout(()=> {
                        onScroll();
                    }, 500)
                    return;
                }
                setImages(onFetchImages);
                
            } catch (error) {
                console.error('Ошибка!')
            }
        }
        getImages();
    }, [imageName, page]);

    const isLoading = reqStatus === 'pending';
    const showImagesGallery = images.length > 1 && !isLoading;
    
    return (
        <div className={s.App}>
            {showModal && <Modal fullImg={fullImg} onClick={onCloseModal} />}
            <Searchbar onSubmit={onHandleSubmit} />
            {reqStatus === 'pending' && <Spinner />}
            {showImagesGallery && <ImageGallery images={images} onClick={toggleModal} />}
            {showImagesGallery && <Button onClick={pageIncrement} />}
        </div>
    )
    

}
export default App;