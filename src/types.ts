type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

export interface CustomFieldConfig {
  width: number;
  displayMode: string;
}

export type PodCellProps {
  name: string;
  replicas: number;
  available_replicas: number;
}

export type KafkaCellProps {
  name: string;
  messages: number;
}

export interface CellElement {
  name: string;
  type: string;
}

export type Topic {
  name: string;
  messages: number;
}

export type Pod {
  name: string;
  replicas: number;
  available_replicas: number;
  ready_replicas: number;
}