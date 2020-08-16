import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '@core/services/owner';
import { Subscription } from 'rxjs';
import { Owner } from '@core/services/owner';
import { IListData } from '@shared/components/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  ownerSub: Subscription;
  catsByOwnerGender: IListData[] = [];

  constructor(private ownerSrv: OwnerService) { }

  ngOnInit(): void {
    this.ownerSub = this.ownerSrv.getOwners().subscribe((owners: Owner[]) => {
      this.catsByOwnerGender = this.getListOfCatsByOwnerGender(owners);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribing from observables will prevent memory leaks!
    if (this.ownerSub) {
      this.ownerSub.unsubscribe();
    }
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
  private getListOfCatsByOwnerGender(owners: Owner[]): IListData[] {
    // We need to first filter out any owners that do not have pets
    const ownersWithPets = owners.filter(owner => !!owner.pets);
    // Get the owner genders available. (Removes duplicates!)
    const genders = [...new Set(ownersWithPets.map(owner => owner.gender))];
    // Create the lists
    const list = genders.map(gender => {
    return {
      title: gender,
      // Filter out any owners whose gender doesn't match the current
      // iteration.
      items: ownersWithPets.reduce((results, owner) => {
        if (owner.gender === gender) {
          // Then return their pets
          const pets = owner.pets.filter(pet => pet.type.toLowerCase() ===
            'cat').map(pet => pet.name).sort((a, b) => {
              return (a > b) ? 1 : (a < b) ? -1 : 0;
            });
          return results.concat(pets);
        } else {
          return results;
        }
      }, [])
    };
    });

    return list;
  }

}
