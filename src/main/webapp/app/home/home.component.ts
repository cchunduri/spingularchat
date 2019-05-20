import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ChatService } from '../shared';

import { LoginModalService, AccountService, Account } from 'app/core';

import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IChatmessage, Chatmessage } from 'app/shared/model/chatmessage.model';
import { ChatmessageService } from '../entities/chatmessage/chatmessage.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  messages: Array<Object> = [];
  message = '';
  private _chatmessage: IChatmessage = { userLogin: null, message: null, time: null };

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private chatService: ChatService,
    protected chatmessageService: ChatmessageService
  ) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.receive().subscribe(message => {
      this.messages.push(message);
    });

    this.accountService.identity().then(account => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.registerLogoutSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
        this.chatService.disconnect();
        this.chatService.connect();
      });
    });
  }
  registerLogoutSuccess() {
    this.eventManager.subscribe('logoutSuccess', message => {
      this.chatService.disconnect();
      this.chatService.connect();
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  sendMessage(message) {
    if (message.length === 0) {
      return;
    }
    const chatMessage = {
      message: '',
      userLogin: '',
      time: new Date()
    };
    chatMessage.message = message;
    chatMessage.userLogin = this.account.login;
    chatMessage.time = new Date();

    this.chatService.sendMessage(chatMessage);
    this.message = '';
  }
}
