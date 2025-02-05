'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import MusixMatchLogo from '~/images/musix.svg.png';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <NextImage src={MusixMatchLogo} height={100} width={100} alt="Musix Match" />

          <ButtonLink className='mt-6' href='/login' variant='light'>
            Login
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
