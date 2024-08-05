'use client';

import Image from 'next/image';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useAuthContext } from '@/provider/auth.provider';
import { IAuthContext } from '@/types';
import logo from '@/public/assets/ngLogo.png';

const Header = () => {
  const { user } = useAuthContext() as IAuthContext;
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="d-flex hidden lg:block">
          <Link href={''}>
            <Image src={logo} alt="Naturally Goods Logo" width={50} height={50} />
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav user={user} />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Header;
