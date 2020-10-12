import React from 'react';
import { css } from 'emotion';
import { PodCellProps } from 'types'
import { stylesFactory } from '@grafana/ui';
import Badge from "react-bootstrap/Badge";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "badge.css";

export const PodCell: React.FC<PodCellProps> = ({name, replicas, available_replicas}) => {
  const styles = getStyles();
  let pod_name = name.substr(0,2);
  return (
    <div className="dropdown">
      <button className="badge-danger dropdown-toggle" type="button" data-toggle="dropdown">
        <div>
          <b className={styles.pod_cell}>{pod_name}</b> <Badge variant="warning" className={styles.replicas}>{available_replicas}/{replicas}</Badge>
        </div>
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu">
        <li><a href="http://www.google.com">Vai a Google</a></li>
        <li><a href="#">Prova</a></li>
        <li><a href="#">Test</a></li>
      </ul>
    </div> 
    
  )
}
{/* <div className={styles.div} >
      <Badge variant="danger"><b className={styles.pod_cell}>{pod_name}</b>  <Badge variant="warning">{available_replicas}/{replicas}</Badge></Badge>
    </div> */}
const getStyles = stylesFactory(() => {
  return {
    div: css`
      text-align: center;
    `,
    pod_cell: css`
      height: 40px;
      width: 70%;
      font-size: 20px;
    `,
    replicas: css`
      margin-right: 1px;
  `,
    cleaner: css`
      border: none;
      background-color: none;
  `
  };
});