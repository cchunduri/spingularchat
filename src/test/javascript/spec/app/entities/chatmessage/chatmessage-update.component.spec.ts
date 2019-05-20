/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SpingularchatTestModule } from '../../../test.module';
import { ChatmessageUpdateComponent } from 'app/entities/chatmessage/chatmessage-update.component';
import { ChatmessageService } from 'app/entities/chatmessage/chatmessage.service';
import { Chatmessage } from 'app/shared/model/chatmessage.model';

describe('Component Tests', () => {
  describe('Chatmessage Management Update Component', () => {
    let comp: ChatmessageUpdateComponent;
    let fixture: ComponentFixture<ChatmessageUpdateComponent>;
    let service: ChatmessageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpingularchatTestModule],
        declarations: [ChatmessageUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChatmessageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatmessageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatmessageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chatmessage('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chatmessage();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
