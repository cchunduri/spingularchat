import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChatmessage } from 'app/shared/model/chatmessage.model';

@Component({
  selector: 'jhi-chatmessage-detail',
  templateUrl: './chatmessage-detail.component.html'
})
export class ChatmessageDetailComponent implements OnInit {
  chatmessage: IChatmessage;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chatmessage }) => {
      this.chatmessage = chatmessage;
    });
  }

  previousState() {
    window.history.back();
  }
}
