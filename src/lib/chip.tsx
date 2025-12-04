import { Album } from '@/types';

type Tag = string;

export function generateTags(
  album: Pick<Album, 'date' | 'description' | 'locations'>
) {
  let tags = [];
  tags.push(album.date);
  for (const location of album.locations) {
    tags.push(location.date);
  }
  tags.push(album.description);
  for (const location of album.locations) {
    tags.push(location.description);
  }
  tags = tags.filter(Boolean) as string[];
  return tags;
}

export function TagChip({ tag }: { tag: Tag }) {
  return (
    <div key={tag} className="border border-gray-300 rounded-md px-3 py-1">
      {tag}
    </div>
  );
}