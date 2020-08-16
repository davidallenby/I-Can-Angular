import { Injectable } from '@angular/core';
import { OwnerService, Owner } from '@core/services/owner';
import { Observable } from 'rxjs';
import { IListData } from '@shared/components/list';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private ownerSrv: OwnerService) { }
  /**
   * Accessing core services like this will make it easier to test!
   *
   */
  getOwners(): Observable<Owner[]> {
    return this.ownerSrv.getOwners();
  }

  /**
   * This function will create a list of pet names categorised by the gender of
   * the person that owns them.
   *
   * @private
   * @param {Owner[]} owners
   * @returns
   * @memberof HomeComponent
   */
  getCatsByOwnerGender(owners: Owner[]): IListData[] {
    // // We need to first filter out any owners that do not have pets
    const ownersWithPets = owners.filter(owner => !!owner.pets);
    // Get the available genders (Remove duplicates!)
    const genders = [...new Set(ownersWithPets.map(owner => owner.gender))];
    // Create the new lists
    const list = genders.map(gender => {
    return {
      title: gender,
      items: ownersWithPets.reduce((results, owner) => {
        // This function will filter out any pets that are not cats, return the
        // name
        const pets = owner.pets
          .filter(pet => pet.type.toLowerCase() === 'cat')
          .map(pet => pet.name)
          .sort((a, b) => (a > b) ? 1 : (a < b) ? -1 : 0);
        return (owner.gender === gender) ? results.concat(pets) : results;
      }, [])
    };
    });

    return list;
  }
}
