export interface IModel {
  id?: string;
}

export abstract class ModelBase implements IModel {
  public id?: string;
}

export type ModelWithoutId<M extends IModel> = Omit<M, 'id'>;
