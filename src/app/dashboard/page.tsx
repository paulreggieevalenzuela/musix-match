"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";

import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import Accordion from '@/components/Accordion';
import ProgressBar from '@/components/Loading/ProgressBar';
import s from './page.module.scss';
import MusixMatchLogo from '~/images/musix.svg.png';
import NextImage from '@/components/NextImage';

type ArtistProps = {
  id: number;
  artist: string;
  albums: any[];
  tracks: any[];
}

export default function Dashboard() {
  const router = useRouter();
  const [topArtists, setArtists] = React.useState<ArtistProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchTopArtists = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/top-artists');
        const data = await response.json();
        setArtists(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching artists:', error);
      }
    };

    fetchTopArtists();
  }, []);

  return (
    <Layout className={s.Page}>
      <nav className="bg-maroon-900 shadow-md p-3 text-right flex items-center justify-between">
        <NextImage src={MusixMatchLogo} height={40} width={40} alt="Musix Match" />
        <Button className="text-white" onClick={() => router.push('/logout')}> Logout </Button>
      </nav>
      {loading && (<ProgressBar />)}
      {!loading && (
        <Fragment>
          <div className="p-3">
            <h3>Top Artist:</h3>
            {topArtists.map((artist, index) => (
              <div key={index} className="mb-8">
                <h4 className="mb-1">Artist: {artist.artist}</h4>
                {artist.albums.map((album, idx) => (
                  <div key={idx} className="ml-3">
                    <p>Album Name: {album.name} (Released: {album.release_date})</p>
                    <Accordion items={album.tracks} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Layout>
  )

}