import React from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './PreviewLoading.module.css';

const PreviewLoading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={styles.spinner}>
        <Spinner />
      </div>
    </div>
  );
};

export default PreviewLoading;
