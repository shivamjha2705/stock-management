'use client';
import UserAuthForm from '@/components/forms/sign-form';
import Image from 'next/image';
import logo from '@/public/assets/ngLogo.png';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useEffect } from 'react';
import { getLocalStorageItem, getSessionStorageItem } from '@/utils/localStorage';
import { setLoading } from '@/app/redux/slices/authSlice';
import Loader from '@/components/loader/Loader';

export default function AuthenticationPage() {
const router = useRouter();
const isAuthenticated = getSessionStorageItem('token');
//   const loading = useSelector((state: RootState) => state.auth.loading);
const { loading } = useSelector((state: RootState) => state.auth);

const dispatch=useDispatch()
  useEffect(() => {
    const isAuthenticated = getSessionStorageItem('token');

    if (isAuthenticated) {
      router.push('/dashboard'); // Redirect to dashboard if already authenticated
    }
    dispatch(setLoading(false)); 
  }, [isAuthenticated, router]);


  return (
    <>
{(loading || isAuthenticated )  && 
 <div className='min-h-[100vh] min-w-full flex justify-center items-center' >
    <Loader/>
</div>
}    
    {(!loading) && <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src={logo} alt="Naturally Goods Logo" width={50} height={50} />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aut aspernatur esse quibusdam nesciunt.
            </p>
            <footer className="text-sm">Naturally Good</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>}
    </>
  );
}
