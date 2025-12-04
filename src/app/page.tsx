import dynamic from 'next/dynamic';
import './globals.css';
import { getAlbums } from '@/lib/api';

const Globe = dynamic(() => import('@/lib/globes/globe'), {
  ssr: false
});

export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function Page() {
  const albums = await getAlbums();

  return (
    <main role="main">
      <Globe albums={albums} />
    </main>
  );
}
