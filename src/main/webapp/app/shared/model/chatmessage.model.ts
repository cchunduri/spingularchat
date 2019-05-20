export interface IChatmessage {
  id?: string;
  userLogin?: string;
  message?: string;
  time?: string;
}

export class Chatmessage implements IChatmessage {
  constructor(public id?: string, public userLogin?: string, public message?: string, public time?: string) {}
}
