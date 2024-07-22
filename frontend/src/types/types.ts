import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface SignUp extends Omit<User, 'id'> {
  password: string;
}
export interface Profile {
  user: User;
  bio: string;
  image: string | any;
  phone: string;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  date_of_birth: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  signin: (tokens: { access: string; refresh: string }) => void;
  signout: () => void;
  user: User | null;
  profile: Profile | null;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AccountSettings {
  username: string;
  twoFactorSMS: boolean;
  twoFactorTOTP: boolean;
  email: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface Image {
  image: string;
  alt: string;
}

export interface Category {
  href: string;
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  profile: {
    image: string;
    bio: string;
  };
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Post {
  id: number;
  slug: string;
  category: Category;
  title: string;
  description: string;
  author: Author;
  date: string;
  images: Image[];
  featured_image: string;
  visitor_count: number;
}

export interface FetchPostsResponse {
  data: Post[];
  totalPages: number;
}

export interface PlaceImage {
  id: number;
  image_url: string;
}

export interface ThingToSee {
  id: number;
  name: string;
  description: string;
  images: PlaceImage[];
}

export interface Place {
  id: number;
  name: string;
  description: string;
  images: PlaceImage[];
  things_to_see: ThingToSee[];
}
export interface Activity {
  id: number;
  name: string;
  description: string;
  images: Image[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

export interface Participant {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image: any;
}

export interface Message {
  id: number;
  sender: number;
  sender_name: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  title: string;
  participants: Participant[];
  messages: Message[];
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
  is_read: boolean;
  profile_image: string;
}

export interface Update {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
  is_read: boolean;
  profile_image: string;
}
