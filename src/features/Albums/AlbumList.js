import {
  useDeleteAlbumMutation,
  useGetAlbumsQuery,
} from '../../app/services/jsonServerApi';

import { ColorRing } from 'react-loader-spinner';

import styles from './AlbumList.module.css';

export default function AlbumList(props) {
  const { page, onChange } = props;
  const { data: albums, isFetching } = useGetAlbumsQuery(page);
  const [deleteAlbum] = useDeleteAlbumMutation();

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

  return (
    <ul>
      {albums?.map((album) => (
        <li className={styles.list} key={album.id}>
          <button
            className={styles.albumText}
            onClick={() => onChange(album.id)}
          >
            {album.id} - {album.title}
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => deleteAlbum(album.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
