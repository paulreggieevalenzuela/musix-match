'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  // const reqMusic = async () => {
  //   fetch(`https://api.musixmatch.com/ws/1.1/artist.get?artist_id=118&apikey=${API_KEY}`, {
  //     method: 'GET',
  //     mode: 'cors', // Enables cross-origin requests
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
  const API_KEY = '8e343bd24865f49e56ffb12348bb9ccf';
  const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';

  const fetchLyrics = async (artist: string) => {
    const params = new URLSearchParams({
      // q_track: track, // Search by track name
      q_artist: artist, // Search by artist name
      apikey: API_KEY
    });

    try {
      const response = await fetch(`${BASE_URL}matcher.lyrics.get?${params}`, {
        method: 'GET',
        mode: 'cors', // Allow cross-origin requests
        headers: {
          'Content-Type': 'application/json; charset=UTF-8' // UTF-8 encoding
        }
      });

      console.log('response', response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Lyrics Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching lyrics:', error.message);
    }
  };

  React.useEffect(() => {
    fetchLyrics('justin')
  }, []);

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />

          <ButtonLink className='mt-6' href='/login' variant='light'>
            Login
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
