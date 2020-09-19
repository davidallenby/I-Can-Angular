import { Injectable } from '@angular/core';
import { IPlayerRecord } from '../interfaces';

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
  getRandomInRange(minimum: number, maximum: number): number {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Number((Math.random() * (max - min) + min * 1).toFixed(1));
  }

  /**
   * Get a new mole animation speed based on the range provided
   *
   * @param {number} fastest
   * @param {number} slowest
   * @returns {number}
   * @memberof PlayService
   */
  getNewSpeed(fastest: number, slowest: number): number {
    const slowLimit = 3.0;
    const fastLimit = 1.0;
    const f = (fastest > fastLimit) ? fastest : fastLimit;
    const s = (slowest > slowLimit) ? slowest : slowLimit;
    return this.getRandomInRange(f, s);
  }

  /**
   * Add the user's score to the leaderboard.
   *
   * @param {IPlayerRecord} record
   * @memberof PlayService
   */
  setHighScore(record: IPlayerRecord): void {
    // Get the saved scores
    const store = localStorage.getItem('whacAMoleScores');
    const parsed: IPlayerRecord[] = JSON.parse(store) || [];
    // Add this score to the leaderboard
    parsed.push(record);
    // Sort by the highest number first
    parsed.sort((a, b) => b.score - a.score);
    // If there are 11 records, remove one (we only want a top 10)
    if (parsed.length > 10) {
      parsed.pop();
    }
    // Stringify the scores for saving
    const storeStr = JSON.stringify(parsed);
    // Save the scores
    localStorage.setItem('whacAMoleScores', storeStr);
  }

  /**
   * Return the player scores from the store
   *
   * @returns {IPlayerRecord[]}
   * @memberof PlayService
   */
  getScores(): Promise<IPlayerRecord[]> {
    return new Promise((resolve, reject) => {
      // Get the scores from the store
      const store = localStorage.getItem('whacAMoleScores');
      // If there's nothing in the store, return an empty array. Otherwise, make
      // sure the scores are sorted highest to lowest.
      const results = (!store) ? [] : JSON.parse(store)
      .sort((a: IPlayerRecord, b: IPlayerRecord) => {
        return b.score - a.score;
      });
      resolve(results);
    });
  }

  /**
   * Get the highest score
   *
   * @returns {number}
   * @memberof PlayService
   */
  async getHighestScore(): Promise<number> {
    const scores = await this.getScores();
    return scores[0].score;
  }

}
