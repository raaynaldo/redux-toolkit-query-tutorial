import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  useGetAlbumQuery,
  useUpdateAlbumMutation,
} from '../../app/services/jsonServerApi';
import { ColorRing } from 'react-loader-spinner';

import styles from './SelectedAlbum.module.css';

export default function SelectedAlbum(props) {
  const { id } = props;
  const {
    data: album,
    isUninitialized,
    isFetching,
    isError,
  } = useGetAlbumQuery(id, { skip: !id });
  const [updateAlbum] = useUpdateAlbumMutation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (album?.title) {
      setTitle(album?.title);
    }
  }, [album?.title]);

  if (isUninitialized || isError) {
    return <div>No Album is selected</div>;
  }

  if (isFetching) {
    return (
      <ColorRing
        visible={true}
        height='100'
        width='100'
        ariaLabel='blocks-loading'
        wrapperStyle={{ marginBottom: '1rem' }}
        wrapperClass='blocks-wrapper'
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    );
  }

  function updateTitle(event) {
    event.preventDefault();
    updateAlbum({ id: album?.id, data: { title } });
  }

  return (
    <div>
      <div>
        {album?.id} - {album?.title}
      </div>

      <h3>Edit Album</h3>
      <form onSubmit={updateTitle}>
        <label htmlFor='album-title' className={styles.titleLabel}>
          Title:
        </label>
        <input
          id='album-title'
          type='text'
          className={styles.titleInput}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input type='submit' className={styles.updateButton} value='Update' />
      </form>
    </div>
  );
}
