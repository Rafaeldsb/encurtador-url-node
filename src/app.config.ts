export interface AppConfig {
  port: number;
  mongoConnection?: string;
}

export const appConfigSymbol = Symbol.for('AppConfig');
