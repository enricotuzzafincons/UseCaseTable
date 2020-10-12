import React from 'react';
import { css } from 'emotion';
import { KafkaCellProps } from 'types';
import { stylesFactory } from '@grafana/ui';

export const KafkaCell: React.FC<KafkaCellProps> = ({name, messages}) => {
  const styles = getStyles();
  return (
    <div className={styles.kafka_cell} >
      {/* <div className={styles.textContainer}>{messages} msgs</div> */}
      <div><img className={styles.kafka_image} src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Mail.png"/></div>
      <div className={styles.textContainer}>{messages} msgs</div>
    </div>
  )
};


const getStyles = stylesFactory(() => {
  return {
    kafka_image: css`
      height: 30px;
    `,
    kafka_cell: css`
      text-align: center;
    `,
    kafka_cell_with_img: css`
      background-image: url("https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Mail.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 40px auto;
    `,
    textContainer: css`
      text-align: center;
      color: white;
      font-size: 10px;
    `
  };
});