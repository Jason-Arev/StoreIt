'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { verifySecret, sendEmailOTP } from '@/lib/actions/user.actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Authentication logic here
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push('/');
    } catch (error) {
      console.error('OTP verification error:', error);
      alert(
        `OTP verification failed: ${error instanceof Error ? error.message : JSON.stringify(error)}`
      );
    }

    setIsLoading(false);
    setIsOpen(false);
  };

  const handleResendOTP = async () => {
    try {
      // Resend OTP logic here
      await sendEmailOTP({ email });
      alert('OTP resent successfully!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert(
        `Failed to resend OTP: ${error instanceof Error ? error.message : JSON.stringify(error)}`
      );
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader className='relative flex justify-center'>
          <AlertDialogTitle className='h2 text-center'>
            Enter Your OTP
            <Image
              src='/assets/icons/close-dark.svg'
              alt='close'
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className='otp-close-button'
            />
          </AlertDialogTitle>
          <AlertDialogDescription className='subtitle-2 text-center text-light-100'></AlertDialogDescription>
          We have sent a code to{' '}
          <span className='pl-1 text-brand'>{email}</span>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className='shad-otp'>
            <InputOTPSlot index={0} className='shad-otp-slot' />
            <InputOTPSlot index={1} className='shad-otp-slot' />
            <InputOTPSlot index={2} className='shad-otp-slot' />
            <InputOTPSlot index={3} className='shad-otp-slot' />
            <InputOTPSlot index={4} className='shad-otp-slot' />
            <InputOTPSlot index={5} className='shad-otp-slot' />
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <div className='flex w-full flex-col gap-4'>
            <AlertDialogAction
              onClick={handleSubmit}
              className='shad-submit-btn h-12'
              type='button'
            >
              Submit
              {isLoading && (
                <Image
                  src='/assets/icons/loader.svg'
                  alt='loader'
                  width={24}
                  height={24}
                  className='ml-2 animate-spin'
                />
              )}
            </AlertDialogAction>
            <div className='subtitle-2 mt-2 flex flex-row text-center text-light-100'>
              Didn&#39;t get a code?
              <Button
                type='button'
                onClick={handleResendOTP}
                variant='link'
                className='pl-1 text-brand'
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
