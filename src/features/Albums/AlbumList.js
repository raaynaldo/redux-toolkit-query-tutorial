import {
  useDeleteAlbumMutation,
  useGetAlbumsQuery,
} from '../../app/services/jsonServerApi';

import styles from './AlbumList.module.css';

export default function AlbumList(props) {
  const { page, onChange } = props;
  const { data: albums, isFetching } = useGetAlbumsQuery(page);
  const [deleteAlbum] = useDeleteAlbumMutation();

  if (isFetching) {
    return <div>Loading...</div>;
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
