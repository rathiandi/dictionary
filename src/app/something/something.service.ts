import { Injectable } from '@angular/core';

import { Something }  from '../model/model.something';

@Injectable()
export class SomethingService {
  somethings: Something[];
  STORAGE_KEY = "MY_SOMETHINGS";

  /**
   * Usages local browser storage to store and retrieve data.
   */
  constructor() {
    if (typeof(Storage) !== "undefined") {  // check if local storage supported; if yes try load previously stored data.
      this.somethings = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    }

    if(this.somethings == null || this.somethings.length == 0) {  // if no data found; populate it with provided test data
      this.somethings = [
        { id: 0, name: 'Bugs Bunny', description: 'A rabbit' },
        { id: 1, name: 'Daffy Duck', description: 'A duck' },
        { id: 2, name: 'Foghorn Leghorn', description: 'A chichen' },
        { id: 3, name: 'Road Runner', description: 'A fast bird' },
        { id: 4, name: 'Wile E Coyote', description: 'He hunts road runners' }
      ];
    }
  }

  /**
   * Facilitate load and search operations; load all if no search string provided.
   * @param searchString
   * @returns {any}
   */
  findSomethings(searchString:string): Promise<Something[]> {
    if(searchString.length > 0) {
      return Promise.resolve(this.somethings.filter(something => (
        (something.name.indexOf(searchString) != -1) || (something.description.indexOf(searchString) != -1)
      )));
    }
    else {
      return Promise.resolve(this.somethings);
    }
  }

  /**
   * Facilitate add/Edit operations. It looks for id as an indicator for add & edit.
   * @param something
   */
  saveSomething(something : Something) {
    if(something.id == -1 ) { // add
      this.somethings.push({id: this.somethings.length, name:something.name, description: something.description});
    }
    else {  // update
      for(let i=0; i< this.somethings.length; i++) {
        if(this.somethings[i].id == something.id) {
          this.somethings[i].name = something.name;
          this.somethings[i].description = something.description;
          break;
        }
      }
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.somethings));
  }

  /**
   * deletes selected object
   * @param something
   */
  deleteSomething(something : Something) {
    if(something != null) {
      this.somethings = this.somethings.filter(obj => obj.id !== something.id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.somethings));
    }
  }

}
