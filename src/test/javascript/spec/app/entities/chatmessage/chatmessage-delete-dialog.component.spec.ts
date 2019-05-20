/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SpingularchatTestModule } from '../../../test.module';
import { ChatmessageDeleteDialogComponent } from 'app/entities/chatmessage/chatmessage-delete-dialog.component';
import { ChatmessageService } from 'app/entities/chatmessage/chatmessage.service';

describe('Component Tests', () => {
  describe('Chatmessage Management Delete Component', () => {
    let comp: ChatmessageDeleteDialogComponent;
    let fixture: ComponentFixture<ChatmessageDeleteDialogComponent>;
    let service: ChatmessageService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpingularchatTestModule],
        declarations: [ChatmessageDeleteDialogComponent]
      })
        .overrideTemplate(ChatmessageDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatmessageDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatmessageService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
