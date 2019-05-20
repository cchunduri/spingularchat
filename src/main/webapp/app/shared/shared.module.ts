import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpingularchatSharedLibsModule, SpingularchatSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SpingularchatSharedLibsModule, SpingularchatSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
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
