/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpingularchatTestModule } from '../../../test.module';
import { ChatmessageComponent } from 'app/entities/chatmessage/chatmessage.component';
import { ChatmessageService } from 'app/entities/chatmessage/chatmessage.service';
import { Chatmessage } from 'app/shared/model/chatmessage.model';

describe('Component Tests', () => {
  describe('Chatmessage Management Component', () => {
    let comp: ChatmessageComponent;
    let fixture: ComponentFixture<ChatmessageComponent>;
    let service: ChatmessageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpingularchatTestModule],
        declarations: [ChatmessageComponent],
        providers: []
      })
        .overrideTemplate(ChatmessageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatmessageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatmessageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Chatmessage('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chatmessages[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
