export interface IHandler<M, R> {
  execute(data: M): Promise<R>;
}
