import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  useGetAlbumQuery,
  useUpdateAlbumMutation,
} from '../../app/services/jsonServerApi';

import styles from './SelectedAlbum.module.css';

export default function SelectedAlbum(props) {
  const { id } = props;
  const {
    data: album,
    isUninitialized,
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
