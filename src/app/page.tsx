/* eslint-disable react/no-unescaped-entities */
"use client"

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import HomeSlider from '@/components/ui/slider/HomeSlider'
import { Icon } from '@iconify-icon/react';

export default function Home() {

  return (
    <>
      <HomeSlider />

      <section className="overflow-hidden text-gray-700 dark:text-light w-screen h-fit lg:min-h-screen relative padding-x py-16 bg-transparent space-y-8">
        <div className="z-0 absolute -bottom-16 left-0 transform skew-y-3 w-full h-44 lg:h-72 bg-secondary dark:bg-secondary/50"></div>

        <center className="relative z-10 font-bold text-2xl lg:text-4xl">The World Awaits</center>
        <center className="relative z-10 text-base lg:text-xl lg:max-w-3xl lg:mx-auto">Join us on this epic adventure. Sign up for the <span className="font-bold text-primary dark:text-secondary">Waitlist</span> and be amongst the first to unfurl the map of your dreams, because with Borderless, the world awaits.</center>
        {/* <center className="text-base lg:text-xl">Get ready to explore the world effortlessly.</center> */}
        <center><button className="relative z-10 flex items-center py-3 px-6 bg-primary dark:bg-secondary text-light dark:text-dark rounded-xl hover:scale-105 duration-300 ease-linear gap-3"><Icon className={'w-6 h-6 flex-none'} icon="ph:video-duotone" width="1.5rem" height="1.5rem" /> <span>Intro Video</span></button></center>

        <img src="/home/Shapes.png" alt="z-0 confetti shapes" className="absolute top-48 left-px w-full h-auto padding-x2" />

        <img className="relative z-10 w-full object-fill h-auto" src='/home/borderless-app-view.png' width={100} height={100} alt='borderless app preview' />
      </section>

      <section className="border-b-[0.5px] border-b-dark/20 dark:border-b-light overflow-hidden text-gray-700 dark:text-light w-screen h-fit relative padding-x py-16">
        <img src="/home/welcome-address.png" alt="" className="z-0 absolute top-14 left-px w-1/4 aspect-square" />
        <div className="z-10 bg-light/60 dark:bg-dark/60 bg-blur w-screen h-screen absolute top-0 left-0 right-0 bottom-0"></div>

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="order-2 lg:order-1 flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-start gap-5 lg:max-w-md">
              <h4 className="text-xl lg:text-2xl font-bold">
                Borderless <span className="text-primary dark:text-secondary">is coming soon!</span>
              </h4>
              <p className="text-sm lg:text-base">
                Borderless is coming soon, and it is going to revolutionize the way you travel. We are a one-stop shop for your travel needs, from booking flights and hotels to finding the perfect activities and experiences. WithBorderless, you can explore the world seamlessly with less stress.
              </p>

              <button className="rounded-xl bg-secondary text-dark dark:bg-secondary dark:text-light hover:shadow duration-300 hover:scale-105 py-3 px-6">Join Waiting List</button>
            </div>
          </div>

          <div className="order-1 lg:order-2 p-6 flex flex-col items-center justify-center">
            <img className="mx-auto w-full lg:w-2/3" src="/home/welcome-address.png" alt="coming soon photo" />
          </div>
        </div>
      </section>

      <section className="w-screen min-h-screen py-16 padding-x text-dark dark:text-light space-y-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center group w-full p-4 border-2 border-primary dark:border-secondary flex flex-col items-center gap-4 rounded-xl">
            <div className="group-hover:scale-105 duration-300 ease-linear bg-orange-700 overflow-hidden p-3 rounded-xl">
              <img src="/home/why/unmatched.svg" alt="unmatched convenience" className="w-8 aspect-square" />
            </div>

            <strong className="text-base lg:text-xl block">Unmatched Convenience</strong>

            <p className="text-xs dark:text-sm">Book everything you need for your trip in one pace, with just a few clicks.</p>
          </div>

          <div className="text-center group w-full p-4 border-2 border-primary dark:border-secondary flex flex-col items-center gap-4 rounded-xl">
            <div className="group-hover:scale-105 duration-300 ease-linear bg-purple-700 overflow-hidden p-3 rounded-xl">
              <img src="/home/why/expertly.svg" alt="unmatched convenience" className="w-8 aspect-square" />
            </div>

            <strong className="text-base lg:text-xl block">Expertly Curated Experiences</strong>

            <p className="text-xs dark:text-sm">Discover hidden gems and unique adventures that you won't find anywhere else.</p>
          </div>

          <div className="text-center group w-full p-4 border-2 border-primary dark:border-secondary flex flex-col items-center gap-4 rounded-xl">
            <div className="group-hover:scale-105 duration-300 ease-linear bg-blue-700 overflow-hidden p-3 rounded-xl">
              <img src="/home/why/seemless.svg" alt="Seamless" className="w-8 aspect-square" />
            </div>

            <strong className="text-base lg:text-xl block">Seamless Booking and Payment</strong>

            <p className="text-xs dark:text-sm">Book your trip and pay for it all in one place, with no hassles.</p>
          </div>

          <div className="text-center group w-full p-4 border-2 border-primary dark:border-secondary flex flex-col items-center gap-4 rounded-xl">
            <div className="group-hover:scale-105 duration-300 ease-linear bg-blue-400 overflow-hidden p-3 rounded-xl">
              <img src="/home/why/unmatched.svg" alt="unmatched convenience" className="w-8 aspect-square" />
            </div>

            <strong className="text-base lg:text-xl block">24/7 Customer Support</strong>

            <p className="text-xs dark:text-sm">We're always here to help you no matter what.</p>
          </div>
        </div>

        <h4 className="font-bold text-xl text-center lg:text-2xl">
          <span className="text-secondary dark:text-secondary">Experience the feel of our </span> <span>most innovative features</span>
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="order-2 lg:order-1 flex flex-row items-start lg:flex-col space-y-3">
            <div>
              <strong className="text-base lg:text-xl font-bold">1. Travel On Credit</strong>
              <p className="text-sm lg:text-base font-normal">Through the TravelOnCredit service, we are redefining the way high net worth individuals and esteemed corporate organizations experience travel.</p>
            </div>
            <svg className="hidden lg:block w-3 h-36 lg:h-64" width="16" height="208" viewBox="0 0 16 208" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.29288 207.707C7.68341 208.098 8.31657 208.098 8.7071 207.707L15.0711 201.343C15.4616 200.953 15.4616 200.319 15.0711 199.929C14.6805 199.538 14.0474 199.538 13.6568 199.929L7.99999 205.586L2.34314 199.929C1.95261 199.538 1.31945 199.538 0.928923 199.929C0.538399 200.319 0.538399 200.953 0.928923 201.343L7.29288 207.707ZM7 -4.37114e-08L6.99999 207L8.99999 207L9 4.37114e-08L7 -4.37114e-08Z" fill="currentcolor" />
            </svg>
          </div>

          <div className="order-1 lg:order-2 w-full flex lg:flex-row lg:items-end lg:justify-end">
            <img src="/home/travel-on-credits.png" className="mx-auto lg:mx-0 w-56 lg:w-96 aspect-square" alt="credit travel" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="w-full">
            <img src="/home/sky-pay.png" alt="sky pay" className="w-[520px] lg:-mt-28 h-auto" />
          </div>

          <div className="lg:text-right relative flex flex-row items-start lg:flex-col space-y-3">
            <div>
              <strong className="text-base lg:text-xl font-bold">2. Skyflex Pay</strong>
              <p className="text-sm lg:text-base font-normal">SkyFlex Pay is your passport to affordable travel. It's a revolutionary service that allows you to book your flights and pay for them in convenient installments leading up to your travel date. We believe in giving you the freedom to plan your dream trip without breaking the bank.</p>
            </div>
            <svg className="ml-auto hidden lg:block w-3 h-36 lg:h-64" width="16" height="208" viewBox="0 0 16 208" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.29288 207.707C7.68341 208.098 8.31657 208.098 8.7071 207.707L15.0711 201.343C15.4616 200.953 15.4616 200.319 15.0711 199.929C14.6805 199.538 14.0474 199.538 13.6568 199.929L7.99999 205.586L2.34314 199.929C1.95261 199.538 1.31945 199.538 0.928923 199.929C0.538399 200.319 0.538399 200.953 0.928923 201.343L7.29288 207.707ZM7 -4.37114e-08L6.99999 207L8.99999 207L9 4.37114e-08L7 -4.37114e-08Z" fill="currentcolor" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="order-2 lg:order-1 flex flex-row items-start lg:flex-col space-y-3">
            <div>
              <strong className="text-base lg:text-xl font-bold">3. Sky Rewards</strong>
              <p className="text-sm lg:text-base font-normal">At Borderless , we value your loyalty, and we want to show our appreciation in a meaningful way. With SkyRewards, you can unlock a world of benefits and earn exciting rewards as you explore the globe.</p>
            </div>
            <svg className="hidden lg:block w-3 h-36 lg:h-64" width="16" height="208" viewBox="0 0 16 208" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.29288 207.707C7.68341 208.098 8.31657 208.098 8.7071 207.707L15.0711 201.343C15.4616 200.953 15.4616 200.319 15.0711 199.929C14.6805 199.538 14.0474 199.538 13.6568 199.929L7.99999 205.586L2.34314 199.929C1.95261 199.538 1.31945 199.538 0.928923 199.929C0.538399 200.319 0.538399 200.953 0.928923 201.343L7.29288 207.707ZM7 -4.37114e-08L6.99999 207L8.99999 207L9 4.37114e-08L7 -4.37114e-08Z" fill="currentcolor" />
            </svg>
          </div>

          <div className="order-1 lg:order-2 w-full flex lg:flex-row lg:items-end lg:justify-end">
            <img src="/home/sky-rewards.png" className="w-[520px] lg:w-96 aspect-square" alt="sky rewards" />
          </div>
        </div>

      </section>
    </>
  )
}
