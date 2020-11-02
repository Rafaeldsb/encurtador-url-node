import { StringHelper } from './string.helper';

jest.mock('inversify');

describe('StringHelper', () => {
  describe('generateRandomCode', () => {
    it('should return a string with length equals 5 given min and max equals 5', () => {
      const stringHelper = new StringHelper();

      const code = stringHelper.generateRandomCode(5, 5);

      expect(code).toHaveLength(5);
    });

    it('should return a string with length between 5 and 7 given min and max equals 5 and 7', () => {
      const stringHelper = new StringHelper();

      const code = stringHelper.generateRandomCode(5, 7);

      expect(code.length).toBeGreaterThanOrEqual(5);
      expect(code.length).toBeLessThanOrEqual(7);
    });

    it('should return a string with only alphanumeric characters', () => {
      const stringHelper = new StringHelper();

      const code = stringHelper.generateRandomCode(10, 20);

      expect(code).toMatch(/^[a-z0-9]+$/i);
    });

    it('should return a error given min greater than max', () => {
      const stringHelper = new StringHelper();

      const codeFn = () => stringHelper.generateRandomCode(6, 1);

      expect(codeFn).toThrowError();
    });
  })
});
