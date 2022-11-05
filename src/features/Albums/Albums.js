import React, { useState } from 'react';

import AlbumList from './AlbumList';
import SelectedAlbum from './SelectedAlbum';

export default function Albums() {
  const [page, setPage] = useState(1);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  function albumChange(id) {
    setSelectedAlbumId(id);
  }

  return (
    <div>
      <h1>Albums</h1>
      <AlbumList page={page} onChange={albumChange} />

      <div>Current Page: {page}</div>
      <button onClick={() => setPage(Math.max(page - 1, 1))}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      <h2>Selected Album</h2>
      <SelectedAlbum id={selectedAlbumId} />
    </div>
  );
}
