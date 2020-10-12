import React from 'react';
import { PanelProps, DataFrame } from '@grafana/data';
import { SimpleOptions, CellElement, Topic, Pod } from 'types';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { KafkaCell } from 'KafkaCell';
import { PodCell } from 'PodCell';



/*
Query 1 - usecase:
  campi: name, pipelines

Query 2 - topic:
  campi: name, messages

Query 3 - deployments:
  campi: name, replicas, available_replicas

*/

interface Props extends PanelProps<SimpleOptions> {}

// convert DataFrame to list of dictionary
function convertSeries(data:DataFrame) {
  let len = data.fields[0].values.length;
  let n_fields = data.fields.length;
  let output:any[] = []

  for (let i = 0; i < len; i++){
    let obj:any = {}
    for (let j=1; j < n_fields; j++){
      obj[data.fields[j].name] = data.fields[j].values.get(i);
    }
    output.push(obj);
  }
  return output;
}

function findElement(name:string, list:any[]) : any{
  for (let i=0; i<list.length; i++){
    if (list[i].name == name){
      return list[i]
    }
  }
}

function getPipelineElement (element:CellElement, topics: Topic[], pods: Pod[]) : JSX.Element {
  switch (element.type) {
    case "kafka":
      let topic = findElement(element.name, topics)
      return (<KafkaCell name={element.name} messages={topic.messages}/>);
    case "pod":
      let pod = findElement(element.name, pods);
      return (<PodCell name={element.name} replicas={pod.replicas} available_replicas={pod.available_replicas}/>);
    default:
      return (<div>{element.name}</div>);
  }
}

function createTable(pipeline:any, topics:Topic[], pods:Pod[]) : JSX.Element[][] {
  let output:JSX.Element[][] = []
  
  pipeline.forEach((table:any) => {
    let row:JSX.Element[] = []
    row.push(table.table)
    console.log(row)
    table.pipeline.forEach((element:CellElement) => {
      row.push(getPipelineElement(element, topics, pods))
    });
    output.push(row)
  });
  return output
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {

  // TODO useare selector invece di scegliere il primo usecase
  let usecase_index : number = 0
  
  let usecase = convertSeries(data.series[0]);
  
  let topics = convertSeries(data.series[1]);

  let pods = convertSeries(data.series[2]);

  let headers = JSON.parse(usecase[usecase_index].pipelines).headers
  let pipelines = JSON.parse(usecase[usecase_index].pipelines).usecase

  // const theme = useTheme();
  const styles = getStyles();
  let table:any = createTable(pipelines, topics, pods)

  return (
    <div className={ css`
      height: ${height}px;
      overflow: auto;
    ` }>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((element:any) => {
                  return (
                    <th className={styles.cell}><div>{element}</div></th>
                  )
                })}
          </tr>
        </thead>
        <tbody>
          {table.map((row: any) => {
            return (
              <tr>
                {row.map((element:any) => {
                  return (
                    <td className={styles.cell}>{element}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};


const getStyles = stylesFactory(() => {
  return {
    table: css`
      width: 99%;
      margin-left: 0.5%;
    `,
    header_row: css`
      height: 33px;
      overflow: hidden auto;
      background: rgb(32, 34, 38) none repeat scroll 0% 0%;
    `,
    header_cell: css`
      padding: 6px 10px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      color: rgb(51, 162, 229);
      border-right: 1px solid rgb(20, 22, 25);
    `,
    row: css`
      height: 33px;
    `,
    cell: css`
      padding: 6px 10px;
      height: 33px;
      width: 100px;
      align: center;
    `,
    table_name: css`
      padding: 6px 10px;
      height: 33px;
    `
  }
});