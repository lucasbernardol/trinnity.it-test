import { nanoid } from 'nanoid';

const _LENGHT: number = 16;

/**
 * @class NanoIDFactory
 */
class NanoIDFactory {
  /**
   * - NanoID factory method.
   * @returns {String} id
   */
  static id(): string {
    return nanoid(_LENGHT);
  }
}

export { NanoIDFactory };
