import * as React from 'react';
import styles from './App.module.css';
import Albums from './features/Albums/Albums';
import Photos from './features/photos/Photos';

export default function App() {
  return (
    <div className={styles.wrapper}>
      <Photos />
      <hr />
      <Albums />
    </div>
  );
}
