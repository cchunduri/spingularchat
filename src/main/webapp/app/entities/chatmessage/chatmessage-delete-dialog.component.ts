import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatmessage } from 'app/shared/model/chatmessage.model';
import { ChatmessageService } from './chatmessage.service';

@Component({
  selector: 'jhi-chatmessage-delete-dialog',
  templateUrl: './chatmessage-delete-dialog.component.html'
})
export class ChatmessageDeleteDialogComponent {
  chatmessage: IChatmessage;

  constructor(
    protected chatmessageService: ChatmessageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.chatmessageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'chatmessageListModification',
        content: 'Deleted an chatmessage'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-chatmessage-delete-popup',
  template: ''
})
export class ChatmessageDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chatmessage }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChatmessageDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.chatmessage = chatmessage;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/chatmessage', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/chatmessage', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
