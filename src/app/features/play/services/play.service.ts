import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor() { }
  /**
   * TODO: Update types, create interfaces for mole/moles/schema
   *
   * @param {*} schema
   * @memberof PlayService
   */
  generateMoles(schema: any): any {
    const moles = [];

    for (let i = 0; i < 6; i++) {
      const mole = {
        speed: this.getRandomInRange(schema.speed.min, schema.speed.max),
        delay: this.getRandomInRange(schema.delay.min, schema.delay.max)
      };
      moles.push(mole);
    }
    console.log(moles);
    return moles;
  }

  /**
   * Get a random number between a range
   *
   * @private
   * @param {number} minimum
   * @param {number} maxiumum
   * @returns
   * @memberof PlayService
   */
  private getRandomInRange(minimum: number, maxiumum: number): number {
    const min = Math.ceil(minimum);
    const max = Math.floor(maxiumum);
    return Math.floor(Math.random() * (max - min + 1) / 10) + min;
  }

}
