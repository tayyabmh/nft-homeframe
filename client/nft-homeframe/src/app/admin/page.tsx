'use client';

import { useEffect, useState } from 'react';
import { fetchRandomNFT, setNFTShow } from '@/utils/fetchRandomNFT';

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

  const loadRandomNFT = async () => {
    try {
      const newNFT = await fetchRandomNFT();
      setNft(newNFT);
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  };

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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {nft && (
        <div className="relative w-full h-full flex justify-center items-center">
          <Image 
          src={nft.imageUrl ?? ''} alt={nft.name ?? ''} 
          width={750}
          height={750} 
          className="max-w-full max-h-screen object-contain" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-4">
            <h1 className="text-lg font-bold">{nft.name}</h1>
            <p>{(nft.description && nft.description?.length > 250) ? `${nft.description?.slice(0, 250)}...` : nft.description}</p>
            <p>Owner: {nft.owner}</p>
          </div>
        </div>
      )}
      <button onClick={loadRandomNFT} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">
        Refresh Image
      </button>
      <button onClick={hideNFT} disabled={!nft} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">
        Hide this NFT
      </button>
    </div>
  );
};

export default Home;
