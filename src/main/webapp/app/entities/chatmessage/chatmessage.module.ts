import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SpingularchatSharedModule } from 'app/shared';
import {
  ChatmessageComponent,
  ChatmessageDetailComponent,
  ChatmessageUpdateComponent,
  ChatmessageDeletePopupComponent,
  ChatmessageDeleteDialogComponent,
  chatmessageRoute,
  chatmessagePopupRoute
} from './';

const ENTITY_STATES = [...chatmessageRoute, ...chatmessagePopupRoute];

@NgModule({
  imports: [SpingularchatSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ChatmessageComponent,
    ChatmessageDetailComponent,
    ChatmessageUpdateComponent,
    ChatmessageDeleteDialogComponent,
    ChatmessageDeletePopupComponent
  ],
  entryComponents: [ChatmessageComponent, ChatmessageUpdateComponent, ChatmessageDeleteDialogComponent, ChatmessageDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpingularchatChatmessageModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
