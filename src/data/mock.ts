// Sample posts for the design only (no API yet).
//
// HOW TO EDIT A POST:
//   name     -> who posted
//   username -> the @handle under the name
//   text     -> the caption
//   image    -> the photo (a file inside assets/images/posts/). Delete the line for a text-only post.
//   avatar   -> (optional) the poster's profile picture. Leave it out and the app shows their first letter.
import type { ImageSource } from 'expo-image';

export type Post = {
  id: string
  user: { name: string; username: string; avatar?: ImageSource }
  text: string
  image?: ImageSource
  time: string
  likes: number
  comments: number
}

export const POSTS: Post[] = [
  {
    id: '1',
    user: { name: 'Nangcas Niel Vince', username: 'Nangcas Niel Vince' },
    text: 'Buy Bust Operation',
    image: require('@/assets/images/posts/hangout.jpg'),
    time: '2m',
    likes: 128,
    comments: 14,
  },
  {
    id: '2',
    user: { name: 'Mico Daroy', username: 'Mico Daroy' },
    text: 'xxx.com',
    image: require('@/assets/images/posts/xxx.com.jpg'),
    time: '25m',
    likes: 342,
    comments: 31,
  },
  {
    id: '3',
    user: { name: 'Michael Partidas', username: 'Michael Partidas' },
    text: 'Stomachache',
    image: require('@/assets/images/posts/stomachaech.jpg'),
    time: '1h',
    likes: 87,
    comments: 9,
  },
  {
    id: '4',
    user: { name: 'Remiel Ucat', username: 'Remiel Ucat' },
    text: 'Aura',
    image: require('@/assets/images/posts/aura.jpg'),
    time: '3h',
    likes: 215,
    comments: 22,
  }, 
]
