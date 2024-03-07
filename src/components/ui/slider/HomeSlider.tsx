/* eslint-disable @next/next/no-img-element */
"use client";

import 'swiper/css';
import 'swiper/css/effect-fade';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { sliderItems } from '@/data/slider';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';


export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slide, setSlide] = useState<any>(Swiper);

  const nextSlide = () => {
    slide.slideNext();

  };

  const preSlide = () => {
    slide.slidePrev();
  };

  const slideItems = sliderItems;

  return (
    <>
      <div className="w-screen h-screen relative z-0">
        <Swiper
          slidesPerView={1}
          modules={[EffectFade, Autoplay, Keyboard]}
          keyboard={true}
          autoplay={{
            delay: 9500,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={false}
          effect={'fade'}
          onSwiper={(swiper) => {
            setSlide(swiper)
            setActiveIndex(swiper.activeIndex)
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex)
          }}
          className='w-screen h-screen overflow-hidden relative z-10'
        >
          {slideItems.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index} className={`w-screen h-screen relative z-10 top-0 left-0 overflow-hidden ${activeIndex !== index ? 'opacity-0' : 'opacity-100'}`}>
              <img className='fader__slide__image' src={item.img} alt={item.heading} style={{ minHeight: '100vh', minWidth: '100vw', objectFit: "cover", objectPosition: "bottom-right" }} />
              <div className="w-screen h-screen absolute top-0 left-0 z-10 bg-secondary/40 dark:bg-primary/55"></div>
              <div className="gap-6 absolute z-10 bottom-24 lg:bottom-32 right-x max-w-xs md:max-w-md lg:max-w-xl">
                <h1 className="pb-4 block font-bold text-2xl md:text-3xl text-white text-right">{item.heading}</h1>
                <p className="block rounded-tl-xl rounded-br-xl bg-black/15 bg-blur dark:bg-secondary/15 text-light/60 p-4 text-xs xl:text-sm">
                  <span>{item.description}</span>
                  <span className="px-2">-</span>
                  <Link className="hover:text-secondary duration-300 ease-linear" href={item.attibute_link}><span className="font-bold">{item.attibute}</span></Link>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:flex absolute z-40 top-40 md:top-1/4 xl:top-1/3 left-x flex-col space-y-4 max-w-xl">
          <h1 className="font-black text-6xl">We are not simply <span className="text-white">flight bookers</span> or hotel finders</h1>
          <div className="h-1 bg-primary dark:bg-secondary w-full max-w-xs"></div>
          <p className="text-white text-sm lg:text-base">We are your travel confidantes, your mapmakers, your local guides, all woven into one seamless platform. We curate experience that go beyond the tourist bubble, immersing you in the authentic pulse of each destination.</p>
        </div>

        <div className="absolute z-50 lg:bottom-20 bottom-10 right-x flex items-center space-x-4">
          <button onClick={preSlide} className="py-2 px-4 bg-primary/70 dark:bg-primary/50 bg-blur text-secondary rounded-lg">
            <Icon className="w-6 h-6" icon="flowbite:caret-left-solid" width="1.2em" height="1.2em" />
          </button>
          <span className="text-white">
            {activeIndex + 1}/{slideItems.length}
          </span>
          <button onClick={nextSlide} className="py-2 px-4 bg-primary/70 dark:bg-primary/50 bg-blur text-secondary rounded-lg">
            <Icon className="w-6 h-6" icon="flowbite:caret-right-solid" width="1.2em" height="1.2em" />
          </button>
        </div>

        <div className="z-50 text-primary dark:text-secondary absolute top-1/3 lg:bottom-20 lg:top-auto left-x flex flex-col items-center gap-3">
          <Link href=""><Icon className="hover:text-secondary duration-300 ease-linear w-6 h-6" icon="cib:facebook" width="1.2em" height="1.2em" /></Link>
          <Link href=""><Icon className="hover:text-secondary duration-300 ease-linear w-6 h-6" icon="entypo-social:instagram-with-circle" width="1.2em" height="1.2em" /></Link>
          <Link className="w-6 h-6 rounded-full overflow-hidden" href=""><Icon className="overflow-hidden rounded-full hover:text-secondary duration-300 ease-linear w-6 h-6" icon="fa6-brands:square-x-twitter" width="1.2em" height="1.2em" /></Link>
        </div>
      </div>
    </>
  );
}
