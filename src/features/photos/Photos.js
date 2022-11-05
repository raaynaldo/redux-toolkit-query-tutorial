import React, { useState } from 'react';
import { useGetPhotosQuery } from '../../app/services/jsonServerApi';

export default function Photos() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1>Photos</h1>
      <PhotoList page={page} />

      <div>Current Page: {page}</div>
      <button onClick={() => setPage(Math.max(page - 1, 1))}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

function PhotoList(props) {
  const { page } = props;
  const { data, isFetching } = useGetPhotosQuery(page);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data?.map((photo) => (
        <li key={photo.id}>{photo.title}</li>
      ))}
    </ul>
  );
}
