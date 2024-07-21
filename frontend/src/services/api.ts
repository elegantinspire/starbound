import axios, { AxiosResponse } from 'axios';
import axiosInstance from './AxiosInstance';
import axiosInstanceNoAuth from './AxiosInstanceNoAuth';
import {
  Place,
  Activity,
  AuthResponse,
  Register,
  Profile,
  AccountSettings,
  FAQ,
  Conversation,
  Message,
  User,
  Post,
} from '../types/types'; // Adjust the import path as necessary

export const register = (userData: Register): Promise<AxiosResponse<void>> => {
  return axiosInstanceNoAuth.post<void>('/register/', userData);
};

export const login = (userData: {
  username: string;
  password: string;
}): Promise<AxiosResponse<AuthResponse>> => {
  return axiosInstanceNoAuth.post<AuthResponse>('/login/', userData);
};

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data; // Assuming backend responds with user data
  } catch (error) {
    throw new Error('Failed to fetch user data'); // Handle specific error cases if needed
  }
};

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const response = await axiosInstance.get('/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData: FormData): Promise<void> => {
  try {
    // Make a PUT request to update the profile using axiosInstance
    await axiosInstance.put('/profile/', profileData);
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error updating profile:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const fetchAccountSettings = async (): Promise<AccountSettings> => {
  try {
    const response = await axiosInstance.get('/account-settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching account settings:', error);
    throw error;
  }
};

export const updateAccountSettings = async (
  settingsData: Partial<AccountSettings>
): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      '/account-settings/update/',
      settingsData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating account settings:', error);
    throw error;
  }
};

export const fetchPosts = async (
  filter: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  results: Post[];
  count: number;
  next: string | null;
  previous: string | null;
}> => {
  try {
    const response = await axiosInstanceNoAuth.get(`/posts/${filter}/`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const response = await axiosInstanceNoAuth.get(`/posts/s/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const fetchTrips = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/trips');
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const fetchHistory = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/history/');
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const fetchWishlist = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/wishlist/');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const fetchOrders = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/orders/');
    return response.data;
  } catch (error) {
    console.error('Error fetching Orders:', error);
    throw error;
  }
};

export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await axiosInstanceNoAuth.get('/places/');
    return response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};

export const fetchPlace = async (id: string): Promise<Place> => {
  try {
    const response = await axiosInstanceNoAuth.get(`/places/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching place with id ${id}:`, error);
    throw error;
  }
};

export const fetchCards = async (): Promise<Place[]> => {
  try {
    const response = await axiosInstanceNoAuth.get('/places/');
    return response.data;
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error;
  }
};

export const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstanceNoAuth.get('/activities/');
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

const currencyApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
const countriesApiUrl = 'https://restcountries.com/v3.1/all';

export const fetchCurrencyData = async () => {
  try {
    const [currencyResponse, countriesResponse] = await Promise.all([
      axios.get(currencyApiUrl),
      axios.get(countriesApiUrl),
    ]);

    const currencyRates = currencyResponse.data.rates;
    const countries = countriesResponse.data;

    const currencyFlags: { [key: string]: string } = {};

    countries.forEach((country: any) => {
      if (country.currencies) {
        Object.keys(country.currencies).forEach((currency) => {
          currencyFlags[currency] = country.cca2.toLowerCase();
        });
      }
    });

    return { currencyRates, currencyFlags };
  } catch (error) {
    console.error('Error fetching currency data:', error);
    throw error;
  }
};

export const fetchFAQs = async (): Promise<FAQ[]> => {
  try {
    const response = await axiosInstanceNoAuth.get('/faqs/');
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

export const fetchFAQ = async (id: number): Promise<FAQ> => {
  try {
    const response = await axiosInstanceNoAuth.get(`/faqs/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching FAQ with id ${id}:`, error);
    throw error;
  }
};

export const fetchConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await axiosInstance.get('/chat/');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const fetchMessages = async (
  conversationId: number
): Promise<Message[]> => {
  try {
    const response = await axiosInstance.get(`/chat/${conversationId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (
  conversationId: number,
  messageData: Message
): Promise<Message> => {
  try {
    // Convert BigInt id to string if necessary
    const messageToSend = {
      ...messageData,
      id: messageData.id.toString(),
    };

    const response = await axiosInstance.put<Message>(
      `/chat/${conversationId}/`,
      messageToSend
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const fetchNotifications = async (
  pageNumber: number,
  pageSize: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get('/notifications/', {
      params: {
        page: pageNumber,
        page_size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching notifications');
  }
};

export const markNotificationAsRead = async (
  notificationId: number
): Promise<void> => {
  try {
    await axiosInstance.put(`/notifications/${notificationId}/`, {
      is_read: true,
    });
  } catch (error) {
    throw new Error('Error marking notification as read');
  }
};

export const fetchUpdates = async (
  pageNumber: number,
  pageSize: number
): Promise<any> => {
  try {
    const response = await axiosInstance.get('/updates/', {
      params: {
        page: pageNumber,
        page_size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching updates');
  }
};

export const markUpdateAsRead = async (Id: number): Promise<void> => {
  try {
    await axiosInstance.put(`/ updates/${Id}/`, {
      is_read: true,
    });
  } catch (error) {
    throw new Error('Error marking update as read');
  }
};
