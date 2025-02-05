import Image from 'next/image';
import React from 'react'

import s from './Loading.module.scss'

type LoadingProps = {
  type?: 'inline' | 'default'
}
export default function Loading({ type = 'default' }: LoadingProps) {

  return (
    <div className={`${s.Loading} ${type}`} >
      <Image
        src='/images/loading_white.gif'
        alt='loading animation'
        width={210}
        height={95}
      />
    </div>
  )
}