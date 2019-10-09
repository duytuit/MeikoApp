import { UserChat } from "./UserChat";

export class MessageData {
    public UserInfo: UserChat;
    public Message: string;
    public DateCreated: Date;

    constructor(user: UserChat) {
        this.UserInfo = user;
    }
}