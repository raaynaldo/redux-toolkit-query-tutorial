import React, { useEffect } from 'react';
import { useState } from 'react';
import { useGetAlbumQuery } from '../../app/services/jsonServerApi';

import styles from './SelectedAlbum.module.css';

export default function SelectedAlbum(props) {
  const { id } = props;
  const { data: album, isUninitialized } = useGetAlbumQuery(id, { skip: !id });
  const [title, setTitle] = useState(album?.title);

  useEffect(() => {
    setTitle(album?.title);
  }, [album?.title]);

  if (isUninitialized) {
    return <div>No Album is selected</div>;
  }

  function updateTitle(event) {
    event.preventDefault();
    console.log(event.target);
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
