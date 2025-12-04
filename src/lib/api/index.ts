import { Client } from './client';
import { FolderResponseSchema } from '@/types/api';

export async function getAlbums() {
  console.log("getAlbums() started");
  const client = new Client();
  const data = await client.albums.get().catch(err => {
    console.error("Albums API threw:", err);
    throw err;
  });
  console.log("Albums API Response:", data); 
  if (data.success) {
    const albums = data.data.photoGalleryCollection.items;
    return [...albums].sort((a, b) => a.order - b.order);
  }
  throw new Error('Failed to fetch albums');
}

export async function getAlbumByTitle(title: string) {
  const client = new Client();
  const data = await client.albums.getByTitle(title);
  if (data.success) {
    const album = data.data.photoGalleryCollection.items[0];

    if (!album) {
      throw new Error(`Album not found for title ${title}`);
    }

    const photos = album.photosCollection?.items ?? [];
    return { album, photos };
  }
  throw new Error(`Failed to fetch album ${title}`);
}

export async function getPhotos(tag: string = '') {
  const client = new Client();
  
  // If no tag provided, get all photos
  if (!tag) {
    const data = await client.photos.get();
    if (data.success) {
      const photos = data.data.assetCollection.items;
      return photos;
    }
    throw new Error('Failed to fetch photos');
  }
  
  // Otherwise filter by tag
  const data = await client.photos.findBy(tag);
  if (data.success) {
    const photos = data.data.assetCollection.items;
    return photos;
  }
  throw new Error(`Failed to fetch photos tagged '${tag}'`);
}

export async function getFolders() {
  try {
    const client = new Client();
    const response = await client.folders.get();

    if (!response.success) {
      console.warn("Folders API returned failure at build time");
      return [];
    }

    const data = FolderResponseSchema.parse(response);

    const folders = data.photoFoldersCollection?.items ?? [];
    return [...folders].sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("Folders API threw:", err);
    return [];
  }
}

export async function getFolderByTitle(title: string) {
  const client = new Client();
  const data = await client.folders.getByTitle(title);
  if (data.success) {
    const folder = data.data.photoFoldersCollection.items[0];

    if (!folder) {
      throw new Error(`Folder not found for title ${title}`);
    }

    const photos = folder.photosCollection?.items ?? [];
    return { folder, photos };
  }
  throw new Error(`Failed to fetch folder '${title}'`);
}