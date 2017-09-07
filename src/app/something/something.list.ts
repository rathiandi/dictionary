import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';

import { Something }          from '../model/model.something';
import { SomethingService }   from './something.service';

@Component({
  selector: 'something-list',
  templateUrl: './something.list.html'
})
export class SomethingList implements OnInit {
  somethings : Something[] = [];
  searchString: string = '';
  something : Something = new Something(-1, '', '');

  constructor(private somethingService : SomethingService) {}

  ngOnInit(): void {
    this.load(this.searchString);
  }

  load(searchString) {
    this.somethingService.findSomethings(searchString)
      .then(somethings => this.somethings = somethings)
      .catch(error => console.log(error));  // TODO: do proper error handling. Missing in requirements.
  }

  onKey(event:any) {
    this.searchString = event.target.value;
    this.load(this.searchString);
  }

  onSubmit() {
    this.somethingService.saveSomething(this.something);
  }

  deleteSomething(something : Something) {
    this.somethingService.deleteSomething(something);
    this.load(this.searchString);
  }

  editSomething(something : Something) {
    this.something = new Something(something.id, something.name, something.description);
  }

  reset() {
    this.something = new Something(-1, '', '');
  }

}
