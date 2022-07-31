import { schema } from 'normalizr';

export type Id = string;
export type Schemas = Record<string, schema.Entity>;

export type Normalized<T, K extends keyof T = never> = Omit<T, K> & {
  [Key in K]: T[Key] extends any[] | undefined ? string[] : string;
};
