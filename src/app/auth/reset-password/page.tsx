import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Request with your registered email address to get a one time auth reset code for resetting your authentication password",
};

export default function ResetPassword() {
  return (
    <div>ResetPassword</div>
  )
}
