import { Metadata } from 'next';
import React from 'react'
import InputComponent from '@/components/forms/InputComponent';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Request with your registered email address to get a one time auth reset code for resetting your authentication password",
};

export default function ResetPassword() {
  return (
    <>
      <section className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8 bg-light/60 dark:bg-dark overflow-y-auto md:gap-6 lg:gap-0">
        <div className="flex-none order-2 lg:order-1 relative z-0 rounded-xl overflow-hidden flex flex-col items-center h-1.2 lg:h-full justify-center bg-dark dark:bg-light/50 text-light dark:text-dark">
          <div className="w-full md:max-w-sm lg:max-w-md p-6">
            <h1 className="text-normal text-4xl md:text-4xl lg:text-6xl border-b border-b-secondary dark:border-b-primary pb-4">
              An Adventure that is sure to thrill you
            </h1>
            <p className="py-4 font-normal">
              With Borderless, you can explore the world in style and enjoy travel-free pecks, guaranteed adventure all in one.
            </p>
          </div>
        </div>

        <div className="flex-none order-1 lg:order-2 text-dark dark:text-light w-full flex flex-col items-center h-[calc(100vh_-_2rem)] lg:h-full justify-center p-6 relative">
          <center className="flex-col space-y-2">
            <Link href='/' className="w-24 h-24 bg-primary dark:bg-transparent dark:border-secondary border-2 overflow-hidden rounded-full flex flex-col items-center justify-center group">
              <Image width="96" height="96" src="/logo-mobile.png" alt="logo" className="object-fit h-24 w-24 group-hover:scale-125 duration-300 ease-in-out" />
            </Link>
            <h3 className="font-semibold text-base uppercase">Borderless</h3>
            <p className="text-xs font-normal">You are doing an amazing thing securing your account with a new set of credential. Please carry on.</p>
          </center>
          <form action="" className="pt-8 max-w-xs lg:max-w-md w-full space-y-6">
            <InputComponent type="old_password" id="id_old_password" name="old_password" text="Old Password" />
            <InputComponent type="password" id="id_password" name="password" text="Password" />
            <InputComponent type="password" id="id_password_confirm" name="password_confirm" text="Retype Password" />

            <button className="rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 bg-primary dark:bg-secondary text-light dark:text-dark">Submit</button>
          </form>

          <center className="absolute bottom-10 w-full">
            <span className="font-normal text-xs lg:text-sm">
              Return to dashboard? <Link href="/dashboard" className="font-semibold hover:text-primary dark:hover:text-secondary duration-300 ease-linear">Dashboard</Link>
            </span>
          </center>
        </div>
      </section>
    </>
  )
}
