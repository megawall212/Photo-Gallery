// src/app/Zander/page.tsx

import dynamic from 'next/dynamic';
import { getAlbums, getAlbumByTitle } from '@/lib/api';
import Nav from '@/lib/nav';
import { generateTags, TagChip } from '@/lib/chip';

const Masonry = dynamic(() => import('@/lib/images/masonry'), {
  ssr: false
});

async function ZanderPage() {  
  const albums = await getAlbums();
  
  let album, photos;
  try {
    const result = await getAlbumByTitle('Zander');  
    album = result.album;
    photos = result.photos;
  } catch (error) {
    console.error('Failed to fetch Zander album:', error); 
    return (
      <section className="flex flex-col sm:flex-row sm:my-20">
        <div className="pt-10 sm:pl-10 sm:pr-20 lg:pl-20 lg:pr-40 space-y-1">
          <Nav albums={albums} />
        </div>
        <div className="flex-col max-sm:px-2">
          <p className="text-red-500 mt-12">Album not found</p>
        </div>
      </section>
    );
  }

  const tags = generateTags(album);

  return (
    <section className="flex flex-col sm:flex-row sm:my-20">
      <div className="pt-10 sm:pl-10 sm:pr-20 lg:pl-20 lg:pr-40 space-y-1">
        <Nav albums={albums} />
      </div>

      <div className="flex-col max-sm:px-2">
        <h1 className="font-semibold tracking-tight text-4xl mt-12 mb-6">
          {album.title}
        </h1>

        {album.description && (
          <p className="text-lg text-gray-600 mb-6">{album.description}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}

        <Masonry className="my-6" items={photos} />
      </div>
    </section>
  );
}

export default ZanderPage;
