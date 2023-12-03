import React from 'react';

import ResultData from 'models/FormResult.interface';

import styles from './FormResult.module.scss';

interface CardProps {
  data: ResultData;
}

function FormResult({ data }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__property}>
        <p className={styles.card__title}>Name: {data.name}</p>
        <p className={styles.card__title}>Age: {data.age}</p>
        <p className={styles.card__title}>Email: {data.email}</p>
        <p className={styles.card__title}>Password: {data.password}</p>
        <p className={styles.card__title}>Gender: {data.gender}</p>
        <p className={styles.card__title}>Country: {data.country}</p>
        <p className={styles.card__title}>
          Terms: {data.isTermAccepted ? 'Accepted' : 'Declined'}
        </p>
      </div>
      <img
        src={data.picture}
        alt="Uploaded pic"
        className={styles.card__image}
      />
    </div>
  );
}

export default FormResult;
