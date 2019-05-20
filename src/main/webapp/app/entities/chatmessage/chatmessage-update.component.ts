import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IChatmessage, Chatmessage } from 'app/shared/model/chatmessage.model';
import { ChatmessageService } from './chatmessage.service';

@Component({
  selector: 'jhi-chatmessage-update',
  templateUrl: './chatmessage-update.component.html'
})
export class ChatmessageUpdateComponent implements OnInit {
  chatmessage: IChatmessage;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    userLogin: [],
    message: [],
    time: []
  });

  constructor(protected chatmessageService: ChatmessageService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chatmessage }) => {
      this.updateForm(chatmessage);
      this.chatmessage = chatmessage;
    });
  }

  updateForm(chatmessage: IChatmessage) {
    this.editForm.patchValue({
      id: chatmessage.id,
      userLogin: chatmessage.userLogin,
      message: chatmessage.message,
      time: chatmessage.time
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chatmessage = this.createFromForm();
    if (chatmessage.id !== undefined) {
      this.subscribeToSaveResponse(this.chatmessageService.update(chatmessage));
    } else {
      this.subscribeToSaveResponse(this.chatmessageService.create(chatmessage));
    }
  }

  private createFromForm(): IChatmessage {
    const entity = {
      ...new Chatmessage(),
      id: this.editForm.get(['id']).value,
      userLogin: this.editForm.get(['userLogin']).value,
      message: this.editForm.get(['message']).value,
      time: this.editForm.get(['time']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatmessage>>) {
    result.subscribe((res: HttpResponse<IChatmessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
