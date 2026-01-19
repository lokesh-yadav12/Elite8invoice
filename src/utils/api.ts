// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// // Create axios instance with default config
// const api: AxiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || '/api',
//   timeout: 10000, // 10 seconds
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // You can add auth tokens here if needed
//     // const token = localStorage.getItem('authToken');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response.data;
//   },
//   (error: AxiosError) => {
//     // Handle errors globally
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error('Response error:', error.response.data);
//       console.error('Status code:', error.response.status);
      
//       // Handle specific status codes
//       if (error.response.status === 401) {
//         // Handle unauthorized access
//         // e.g., redirect to login page
//         console.error('Unauthorized access - please login');
//       } else if (error.response.status === 404) {
//         console.error('The requested resource was not found');
//       } else if (error.response.status >= 500) {
//         console.error('Server error - please try again later');
//       }
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('No response received:', error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Request error:', error.message);
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Generic GET request
// export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await api.get<T>(url, config);
//   return response as unknown as T;
// };

// // Generic POST request
// export const post = async <T>(
//   url: string, 
//   data?: any, 
//   config?: AxiosRequestConfig
// ): Promise<T> => {
//   const response = await api.post<T>(url, data, config);
//   return response as unknown as T;
// };

// // Generic PUT request
// export const put = async <T>(
//   url: string, 
//   data?: any, 
//   config?: AxiosRequestConfig
// ): Promise<T> => {
//   const response = await api.put<T>(url, data, config);
//   return response as unknown as T;
// };

// // Generic PATCH request
// export const patch = async <T>(
//   url: string, 
//   data?: any, 
//   config?: AxiosRequestConfig
// ): Promise<T> => {
//   const response = await api.patch<T>(url, data, config);
//   return response as unknown as T;
// };

// // Generic DELETE request
// export const del = async <T>(
//   url: string, 
//   config?: AxiosRequestConfig
// ): Promise<T> => {
//   const response = await api.delete<T>(url, config);
//   return response as unknown as T;
// };

// export default api;
