import dynamic from 'next/dynamic';
import { getAlbums, getPhotos } from '@/lib/api';
import Nav from '@/lib/nav';

const Masonry = dynamic(() => import('@/lib/images/masonry'), {
  ssr: false
});

async function Tags() {
  const albums = await getAlbums();
  const photos = await getPhotos();

  return (
    <section className="flex flex-col sm:flex-row sm:my-20">
      <div className="pt-10 sm:pl-10 sm:pr-20 lg:pl-20 lg:pr-40 space-y-1">
        <Nav albums={albums} />
      </div>

      <div className="flex-col max-sm:px-2">
        <div
          className={`mt-12 inline-block px-2 py-1
          border-dashed border border-gray-200 rounded-md
          bg-gray-100 text-gray-500`}
        >
          All Photos
        </div>

        <Masonry className="my-6" items={photos} />
      </div>
    </section>
  );
}

export default Tags;