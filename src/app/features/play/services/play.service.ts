import { Injectable } from '@angular/core';
import { IMoleSettings } from '../interfaces';

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
  generateMoles(): any {
    const moles = [];

    for (let i = 0; i < 6; i++) {
      const mole = {};
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
  private getRandomInRange(minimum: number, maximum: number): number {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Number((Math.random() * (max - min) + min * 1).toFixed(1));
  }

  /**
   * Generates a new random speed for the moles
   *
   * @param {number} currentSpeed
   * @returns {number}
   * @memberof PlayService
   */
  generateNewSpeed(currentSpeed: number): number {
    const speedLimit = 2.0; // Lowest speed possible
    // We want to increase the speed
    const minusVal = currentSpeed - 1;
    // If the speed increase is less than or equal to the limit, use the limit.
    // We don't want the speed going faster than 2 seconds
    const min = (minusVal <= speedLimit) ? speedLimit : minusVal;
    return this.getRandomInRange(min, currentSpeed);
  }

}
