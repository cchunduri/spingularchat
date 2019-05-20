import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentAdapter } from './util/datepicker-adapter';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  SpingularchatSharedLibsModule,
  SpingularchatSharedCommonModule,
  JhiLoginModalComponent,
  HasAnyAuthorityDirective,
  ChatService
} from './';

@NgModule({
  imports: [SpingularchatSharedLibsModule, SpingularchatSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }, ChatService],
  entryComponents: [JhiLoginModalComponent],
  exports: [SpingularchatSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpingularchatSharedModule {
  static forRoot() {
    return {
      ngModule: SpingularchatSharedModule
    };
  }
}
