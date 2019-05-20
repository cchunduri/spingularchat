import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChatmessage } from 'app/shared/model/chatmessage.model';

type EntityResponseType = HttpResponse<IChatmessage>;
type EntityArrayResponseType = HttpResponse<IChatmessage[]>;

@Injectable({ providedIn: 'root' })
export class ChatmessageService {
  public resourceUrl = SERVER_API_URL + 'api/chatmessages';

  constructor(protected http: HttpClient) {}

  create(chatmessage: IChatmessage): Observable<EntityResponseType> {
    return this.http.post<IChatmessage>(this.resourceUrl, chatmessage, { observe: 'response' });
  }

  update(chatmessage: IChatmessage): Observable<EntityResponseType> {
    return this.http.put<IChatmessage>(this.resourceUrl, chatmessage, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IChatmessage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChatmessage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
