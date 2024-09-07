'use client';
import { ReactNode } from 'react';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageItem, getSessionStorageItem } from '@/utils/localStorage';
import { setLoading } from '@/app/redux/slices/authSlice';
import Loader from '../loader/Loader';

interface ProtectedRouteProps {
  children: ReactNode; // Define children as a ReactNode prop
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { loading } = useSelector((state: RootState) => state.auth);
  const isAuthenticated  = getSessionStorageItem('token');
  const { loading } = useSelector((state: RootState) => state.auth);

  const { push } = useRouter();
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(setLoading(true)); 
    const isAuthenticated  = getSessionStorageItem('token');
    if (!isAuthenticated) {
      push('/auth/login');
    }else{
      dispatch(setLoading(false)); 
    }
  }, [isAuthenticated, push]);

  if (loading) {
    return  <div className='  min-h-[100vh] min-w-full flex justify-center items-center' >
    <Loader/>
    </div>
  }

  // if (!isAuthenticated) {
  //   return null; // Render nothing if not authenticated to avoid flicker
  // }


  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
