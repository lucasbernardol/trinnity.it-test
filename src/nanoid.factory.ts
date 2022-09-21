import { nanoid } from 'nanoid';

export class NanoIdFactory {
  private static _length: number = 16;

  /**
   * - `NanoID.js`
   * @returns
   */
  static sign(): string {
    const _LENGHT: number = this._length;

    return nanoid(_LENGHT);
  }
}
