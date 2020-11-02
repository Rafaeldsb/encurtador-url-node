import { injectable } from 'inversify';

@injectable()
export class StringHelper {
  public generateRandomCode(min: number, max: number): string {
    if (min > max) {
      throw new Error('`min` não pode ser maior que `max`');
    }
    return Math.random().toString(36).substring(
      2,
      Math.floor(Math.random() * (max - min)) + min + 2,
    );
  }
}
