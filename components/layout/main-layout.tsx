import Header from './header';
import Sidebar from './sidebar';
import { Toaster } from '../ui/toaster';
import Providers from './providers';

export default function MainLayout({
  children,
  meta
}: {
  children: React.ReactNode;
  meta: { title: string };
}) {
  const { title } = meta;
  return (
    <>
      <title style={{color:"red"}} >{title}</title>
      <Providers>
        <Toaster />
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto pt-16">{children}</main>
        </div>
      </Providers>
    </>
  );
}
