import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes: ['Photos', 'Album', 'User'],
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (page = 1) => `albums?_page=${page}&_limit=10`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((album) => ({ type: 'Albums', id: album.id })),
              { type: 'Albums', id: 'LIST' },
            ]
          : [{ type: 'Albums', id: 'LIST' }],
    }),
    getAlbum: builder.query({
      query: (id) => `albums/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Albums', id }],
    }),
    updateAlbum: builder.mutation({
      query: ({ id, data }) => ({
        url: `albums/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Albums', id: arg.id },
      ],
    }),
    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `albums/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Albums', id: arg.id },
        { type: 'Albums', id: 'LIST' },
      ],
    }),

    getPhotos: builder.query({
      query: (page = 1) => `photos?_page=${page}&_limit=10`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((id) => ({ type: 'Photos', id })),
              { type: 'Photos', id: 'LIST' },
            ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useGetAlbumQuery,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
  useGetPhotosQuery,
} = jsonServerApi;
