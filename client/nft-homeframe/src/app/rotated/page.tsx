'use client';

import { useEffect, useState } from 'react';
import { fetchRandomNFT, setNFTShow } from '../../utils/fetchRandomNFT';
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';

const ONE_HOUR_IN_MS = 3600000;
const TEN_SECONDS_IN_MS = 10000;

import Image from 'next/image';
type NFT = {
  id: number;
  imageUrl: string | null;
  description: string | null;
  name: string | null;
  owner: string | null;
};


const Home = () => {
  const [nft, setNft] = useState<NFT | null>(null);
  const [imageError, setImageError] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

  const loadRandomNFT = async () => {
    try {
      const newNFT = await fetchRandomNFT();
      setNft(newNFT);
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  };

  useEffect(() => {
    if(imageError) {
      setImageError(false);
      loadRandomNFT();
    }
  }, [imageError]);

  const hideNFT = async () => {
    try {
      if (!nft) return;
      await setNFTShow(nft.id, false);
      const newNFT = await fetchRandomNFT();
      setNft(newNFT);
    } catch (error) {
      console.error('Failed to hide image:', error);
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } else {
        document.exitFullscreen();
        setIsFullscreen(false);
    }
  }

  useEffect(() => {
    loadRandomNFT();
    const interval = setInterval(() => {
      loadRandomNFT();
    }, ONE_HOUR_IN_MS); // 60s * 60m * 1000ms = 1 hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
              <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <ArrowsPointingInIcon className="w-6 h-6 text-white" />
        ) : (
          <ArrowsPointingOutIcon className="w-6 h-6 text-white" />
        )}
      </button>
      {nft && (
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="rotate-90">
            <Image 
              src={nft.imageUrl ?? ''} alt={nft.name ?? ''} 
              width={750}
              height={750} 
              className="max-w-full max-h-screen object-contain" 
              onError={() => setImageError(true)}
            />
          </div>
          <div className="absolute left-0 bottom-0 w-[150px] h-full bg-gray-800">
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vh',
                transform: 'rotate(90deg) translate(-50%, -50%)',
                transformOrigin: '0 0'
              }}
              className="text-white p-4"
            >
              <h1 className="text-lg font-bold">{nft.name}</h1>
              <p className="italic text-wrap">{(nft.description ?? '').length > 300 ? `${nft.description?.substring(0, 300)}...` : nft.description}</p>
              <p><span className="font-bold">Owner:</span> {nft.owner}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

