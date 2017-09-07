import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { AppCommonModule }    from '../common/common.module';
import { SomethingList }      from './something.list';
import { SomethingService }   from './something.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule
  ],
  declarations: [
    SomethingList
  ],
  exports: [
    SomethingList
  ],
  providers: [
    SomethingService
  ]
})
export class SomethingModule { }
