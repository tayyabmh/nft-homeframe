'use client';

import { useEffect, useState } from 'react';
import { fetchRandomNFT, setNFTShow } from '../utils/fetchRandomNFT';

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

  useEffect(() => {
    loadRandomNFT();
    const interval = setInterval(() => {
      loadRandomNFT();
    }, ONE_HOUR_IN_MS); // 60s * 60m * 1000ms = 1 hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {nft && (
        <div className="relative w-full h-full flex justify-center items-center">
          <Image 
          src={nft.imageUrl ?? ''} alt={nft.name ?? ''} 
          width={750}
          height={750} 
          className="max-w-full max-h-screen object-contain" 
          onError={() => setImageError(true)}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white p-4">
            <h1 className="text-lg font-bold">{nft.name}</h1>
            <p className="italic">{(nft.description ?? '').length > 400 ? `${nft.description?.substring(0, 400)}...` : nft.description}</p>
            <p><span className="font-bold">Owner:</span> {nft.owner}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
