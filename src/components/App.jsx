import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import * as API from '../Api/Api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Loader } from './Loader/Loader';
import { Button } from 'components/Button/Button';
import { Layout } from './Layout/Layout';
import { notifyOptions } from '../utils/notify/notify.js';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);
        if (data.hits.length === 0) {
          return toast.error('Sorry, image not found...', notifyOptions);
        }
        const normalizedImages = API.normalizedImages(data.hits);
        setImages(images => [...images, ...normalizedImages]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevSate => prevSate + 1);
  };
  const handleSearchSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <Layout>
        <ImageGallery images={images} />
      </Layout>
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      <ToastContainer draggablePercent={60} />
      <GlobalStyle />
    </div>
  );
}
