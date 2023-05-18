import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

export interface FindParams<T> {
  select?: FindOptionsSelect<T>;
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
  search?: string;
  skip?: number;
  take?: number;
}
