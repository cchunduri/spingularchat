/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpingularchatTestModule } from '../../../test.module';
import { ChatmessageDetailComponent } from 'app/entities/chatmessage/chatmessage-detail.component';
import { Chatmessage } from 'app/shared/model/chatmessage.model';

describe('Component Tests', () => {
  describe('Chatmessage Management Detail Component', () => {
    let comp: ChatmessageDetailComponent;
    let fixture: ComponentFixture<ChatmessageDetailComponent>;
    const route = ({ data: of({ chatmessage: new Chatmessage('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpingularchatTestModule],
        declarations: [ChatmessageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatmessageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatmessageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatmessage).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
