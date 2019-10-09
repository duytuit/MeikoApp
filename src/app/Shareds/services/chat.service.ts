import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConnectionState } from '../models/ConnectionState';
import { UserChat } from '../models/UserChat';
import { MessageData } from '../models/message';
import { Subject } from 'rxjs/internal/Subject';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
     * starting$ is an observable available to know if the signalr 
     * connection is ready or not. On a successful connection this
     * stream will emit a value.
     */
    starting$: Observable<any>;

    /**
     * connectionState$ provides the current state of the underlying
     * connection as an observable stream.
     */
    connectionState$: Observable<ConnectionState>;

    /**
     * error$ provides a stream of any error messages that occur on the 
     * SignalR connection
     */
    error$: Observable<string>;

    joinGroupEvent$: Observable<UserChat>;
    notifyEvent$: Observable<UserChat>;
    notifyNewMembersEvent$: Observable<UserChat>;
    messageReceivedEvent$: Observable<MessageData>;
    oldMessagesEvent$: Observable<Array<MessageData>>;
    leaveGroupEvent$: Observable<UserChat>;
    membersStatusEvent$: Observable<UserChat>;

    // These are used to feed the public observables     
    private connectionStateSubject = new Subject<ConnectionState>();
    private startingSubject = new Subject<any>();
    private errorSubject = new Subject<any>();

    private joinGroupSubject: Subject<UserChat> = new Subject<UserChat>();
    private notifySubject: Subject<UserChat> = new Subject<UserChat>();
    private notifyNewSubject: Subject<UserChat> = new Subject<UserChat>();
    private messageReceivedSubject: Subject<MessageData> = new Subject<MessageData>();
    private oldMessagesSubject: Subject<Array<MessageData>> = new Subject<Array<MessageData>>();
    private leaveGroupSubject: Subject<UserChat> = new Subject<UserChat>();
    private membersStatusSubject: Subject<UserChat> = new Subject<UserChat>();

    private hub: any;
    private hubName: string = 'chatMessaging';
    private connection: any;

    constructor(private zone: NgZone) {
        //debugger;        

        // Set up our observables        
        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.starting$ = this.startingSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();

        this.joinGroupEvent$ = this.joinGroupSubject.asObservable();
        this.notifyEvent$ = this.notifySubject.asObservable();
        this.notifyNewMembersEvent$ = this.notifyNewSubject.asObservable();
        this.messageReceivedEvent$ = this.messageReceivedSubject.asObservable();
        this.oldMessagesEvent$ = this.oldMessagesSubject.asObservable();
        this.leaveGroupEvent$ = this.leaveGroupSubject.asObservable();
        this.membersStatusEvent$ = this.membersStatusSubject.asObservable();

        //Configure Hub Connection 
        this.setupHub();

        this.GroupEvents();
        this.NotifyMembers();
        this.RecievedMessage();

        this.startConnection();
    }

    private setupHub() {

        // create hub connection  
        this.connection = $.hubConnection();
        // create new proxy as name already given in top  
        this.hub = this.connection.createHubProxy(this.hubName);

        // Define handlers for the connection state events        
        this.connection.stateChanged((state: any) => {
            let newState = ConnectionState.Connecting;

            switch (state.newState) {
                case $.signalR.connectionState.connecting:
                    newState = ConnectionState.Connecting;
                    break;
                case $.signalR.connectionState.connected:
                    newState = ConnectionState.Connected;
                    break;
                case $.signalR.connectionState.reconnecting:
                    newState = ConnectionState.Reconnecting;
                    break;
                case $.signalR.connectionState.disconnected:
                    newState = ConnectionState.Disconnected;
                    break;
            }

            //Add ngZone to make UI apply the async data
            this.zone.run(() => {
                // Push the new state on our subject                        
                this.connectionStateSubject.next(newState);
            });


        });

        // Define handlers for any errors        
        this.connection.error((error: any) => {

            this.zone.run(() => {
                // Push the error on our subject                     
                this.errorSubject.next(error);
            });

        });

    }

    public startConnection(): void {

        this.connection.start().done((data: any) => {
            console.log(data);
            this.zone.run(() => {
                this.startingSubject.next(data.id);
            });


        }).fail((error: any) => {

            console.log('Could not connect ' + error);

            this.zone.run(() => {
                this.startingSubject.error(error);
            });

        });
    }

    public stopConnection() : void {
        this.connection.stop();
    }

    private GroupEvents(): void {
        this.hub.on('onGroupAccepted', (data: UserChat) => {
            this.zone.run(() => {
                this.joinGroupSubject.next(data);
            });
        });

        this.hub.on('onGroupLeave', (data: UserChat) => {
            this.zone.run(() => {
                this.leaveGroupSubject.next(data);
            });
        });
    }

    private NotifyMembers(): void {       
              
        this.hub.on('notifyMembers', (data: UserChat) => {
            this.zone.run(() => {
                this.notifySubject.next(data);
            });
        });

        this.hub.on('notifyNewMembers', (data: UserChat) => {
            this.zone.run(() => {
                this.notifyNewSubject.next(data);
            });
        });

        this.hub.on('loadOldMessages', (data: Array<MessageData>) => {
            this.zone.run(() => {
                this.oldMessagesSubject.next(data);
            });
        });

    }

    private RecievedMessage(): void {
        this.hub.on('onRecieved', (data: MessageData) => {
            this.messageReceivedSubject.next(data);
        });
    }

    public joinGroup(user: UserChat) {
        this.hub.invoke('JoinGroup', user);
    }

    public notifyNewMembers(user: UserChat, oldMessages: Array<MessageData>) {
        this.hub.invoke('NotifyMembers', user);

        if (oldMessages.length > 0) {
            this.hub.invoke('OldMessages', oldMessages);
        }
    }

    public sendMessage(message: MessageData) {
        this.hub.invoke('SendMessage', message);
    }

    public leaveGroup(user: UserChat) {
        this.hub.invoke('LeaveGroup', user);
    }
}
