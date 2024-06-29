import React, { useCallback, useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { photosArr } from '../photos';
import PhotoAlbum from 'react-photo-album';
import { FaInstagram } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos = photosArr.map(({ url, width, height }) => ({
  src: url,
  width,
  height,
  srcSet: breakpoints.map((breakpoint) => ({
    src: `${url}?w=${breakpoint}&q=75`,
    width: breakpoint,
    height: Math.round((height / width) * breakpoint),
  })),
}));

export function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const openCarousel = useCallback((index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeCarousel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (embla && isOpen) {
      embla.scrollTo(currentIndex);
    }
  }, [embla, isOpen, currentIndex]);

  return (
    <>
      <div className='flex justify-center items-center'>
        <img src={logo} alt="Elias Pinheiro logo" className="mb-6" />
      </div>

      <PhotoAlbum
        photos={photos}
        layout="masonry"
        columns={3}
        spacing={10}
        onClick={({ index }) => openCarousel(index)}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 text-white hover:opacity-65 hover:transition-opacity"
          >
            go out
          </button>
          <div className="embla w-full max-w-4xl" ref={emblaRef}>
            <div className="embla__container">
              {photos.map((photo, index) => (
                <div className="embla__slide flex justify-center items-center" key={index}>
                  <img
                    src={photo.src}
                    alt=""
                    className="max-h-screen"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className='mt-4 flex justify-center items-center'>
        <a
          className='flex flex-row items-center hover:opacity-60 hover:transition-opacity text-gray-300'
          href="http://www.instagram.com/eliasrpinheiro"
          target='_blank'
          rel="noopener noreferrer"
        >
          <FaInstagram className='mr-2' fontSize={23} />
          eliasrpinheiro
        </a>
      </footer>
    </>
  );
}