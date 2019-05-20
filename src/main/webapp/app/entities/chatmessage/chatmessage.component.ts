import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChatmessage } from 'app/shared/model/chatmessage.model';
import { AccountService } from 'app/core';
import { ChatmessageService } from './chatmessage.service';

@Component({
  selector: 'jhi-chatmessage',
  templateUrl: './chatmessage.component.html'
})
export class ChatmessageComponent implements OnInit, OnDestroy {
  chatmessages: IChatmessage[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected chatmessageService: ChatmessageService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.chatmessageService
      .query()
      .pipe(
        filter((res: HttpResponse<IChatmessage[]>) => res.ok),
        map((res: HttpResponse<IChatmessage[]>) => res.body)
      )
      .subscribe(
        (res: IChatmessage[]) => {
          this.chatmessages = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInChatmessages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChatmessage) {
    return item.id;
  }

  registerChangeInChatmessages() {
    this.eventSubscriber = this.eventManager.subscribe('chatmessageListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
