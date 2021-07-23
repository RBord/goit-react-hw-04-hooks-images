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

    // state = {
    //     imageName: null,
    //     images: [],
    //     reqStatus: 'idle',
    //     page: 1,
    //     showModal: false,
    //     fullImg: null,
    // };
     
    const toggleModal = bigImg => {
        setShowModal(!showModal);
        setFullImg(bigImg)
    }
   
    // handleFormSubmit = imageName => {
    //     this.setState({ imageName });
    // }

    const onCloseModal = () => {
        setShowModal(false)
        setFullImg(null)
    };
    const onScroll = () => {
        const ulEl = document.querySelector('ul');
        window.scrollTo({
            top: ulEl.scrollHeight,
            behavior: 'smooth',
        });
    }
    const pageIncrement = () => {
        setPage(prevState => prevState + 1)
    }

    useEffect(() => {
    if (imageName) {
        (async () => {
            
            setReqStatus('pending');
            try {
        
                const onFetchImages = await fetchImages(imageName, page).then(setReqStatus('resolve'))
                if (page > 1) {
                    setImages(prev => [...prev, ...onFetchImages]);
                    setTimeout(()=> {
                        onScroll();
                    }, 500)
                    return;
                }
                
                if (setImageName && page === 1) {
                    setImages(onFetchImages);
                }
                
            } catch (error) {
                console.error('Ошибка!')
            }
        })
            ();
    }
  }, [imageName, page]);
    // async function componentDidUpdate (_, prevState)  {
    //     // const { imageName, page} = this.state;
    //     // const isPageUpdate = prevState.page !== page;
    //     // const updateStringQuery = prevState.imageName !== imageName;
    //     if (setImageName || setPage) {
    //         // this.setState({ reqStatus: 'pending' })
    //         setReqStatus('pending')
    //         try {
    //             const images = await fetchImages(imageName, page).then(setReqStatus('resolved'));

    //             if (setPage && page !== 1) {
    //                 // this.setState(prevState => {
    //                 //     return {
    //                 //         images: [...prevState.images, ...images],
    //                 //     }
    //                 // })
    //                 setImages(prevState => [...prevState.images, ...images])
    //                 setTimeout(()=> {
    //                     onScroll();
    //                 }, 500)
    //             }
    //             if (setImageName || page === 1) {
    //                 // this.setState({ images, page: 1 });
    //                 setImages(images);
    //                 setPage(1)
    //             }
                
    //         }
    //         catch {
    //             console.error();
    //         }
    //     }
    // }
        
    
    // const { images, showModal, fullImg, reqStatus} = this.state;
    const isLoading = reqStatus === 'pending';
    
    const showImagesGallery = images.length > 1 && !isLoading;
    
    return (
        <div className={s.App}>
            {showModal && <Modal fullImg={fullImg} onClick={onCloseModal} />}
            <Searchbar onSubmit={setImageName} />
            {reqStatus === 'pending' && <Spinner />}
            {showImagesGallery && <ImageGallery images={images} onClick={toggleModal} />}
            {showImagesGallery && <Button onClick={pageIncrement} />}
        </div>
    )
    

}
export default App;