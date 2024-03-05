import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Forgotten Password",
    description: "Request with your registered email address to get a one time auth reset code for resetting your authentication password",
};

export default function ForgotPassword() {
  return (
    <div>ForgotPassword</div>
  )
}
