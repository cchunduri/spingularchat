import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Chatmessage } from 'app/shared/model/chatmessage.model';
import { ChatmessageService } from './chatmessage.service';
import { ChatmessageComponent } from './chatmessage.component';
import { ChatmessageDetailComponent } from './chatmessage-detail.component';
import { ChatmessageUpdateComponent } from './chatmessage-update.component';
import { ChatmessageDeletePopupComponent } from './chatmessage-delete-dialog.component';
import { IChatmessage } from 'app/shared/model/chatmessage.model';

@Injectable({ providedIn: 'root' })
export class ChatmessageResolve implements Resolve<IChatmessage> {
  constructor(private service: ChatmessageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChatmessage> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Chatmessage>) => response.ok),
        map((chatmessage: HttpResponse<Chatmessage>) => chatmessage.body)
      );
    }
    return of(new Chatmessage());
  }
}

export const chatmessageRoute: Routes = [
  {
    path: '',
    component: ChatmessageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spingularchatApp.chatmessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatmessageDetailComponent,
    resolve: {
      chatmessage: ChatmessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spingularchatApp.chatmessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatmessageUpdateComponent,
    resolve: {
      chatmessage: ChatmessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spingularchatApp.chatmessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatmessageUpdateComponent,
    resolve: {
      chatmessage: ChatmessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spingularchatApp.chatmessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const chatmessagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ChatmessageDeletePopupComponent,
    resolve: {
      chatmessage: ChatmessageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spingularchatApp.chatmessage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
