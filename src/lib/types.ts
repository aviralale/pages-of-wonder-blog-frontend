export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  posts_count: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: number;
  author_username: string;
  category: number;
  category_name: string;
  category_slug: string;
  thumbnail: string;
  slug: string;
}

export interface Categories {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export interface Posts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface registerData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
}

export interface loginData {
  username: string;
  password: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
