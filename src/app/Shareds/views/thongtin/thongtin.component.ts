import { Component, OnInit, Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FileService } from '../../services/file.service';
import { HttpEventType } from '@angular/common/http';
import { ToasterService } from '../../services/toaster.service';
import * as $ from 'jquery';
import { ChatService } from '../../services/chat.service';
import { UserChat } from '../../models/UserChat';
import { MessageData } from '../../models/message';
import { Observable } from 'rxjs';
import { ConnectionState } from '../../models/ConnectionState';
@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {
  // someDate: Date = new Date;
  // progress:number;
  // filename:string;
  // d:boolean=false;
  name: string;
  showPopup1: boolean;
  showPopup2: boolean;
  connectionState

  @Input() userData: UserChat;

  private members: Array<UserChat> = new Array<UserChat>();
  private messages: Array<MessageData> = new Array<MessageData>();

  private isLoggingOut: boolean = false;

  private groups: Array<string> = [
      'Angular PH',
      'Programmers and Developers',
      'Online Filipino Freelancer',
      'Free For All'
  ];

  private messageData: MessageData;
  constructor(private servicefile: FileService, private toaster: ToasterService,private serviceChat: ChatService ) {
    this.name = ' Angular!';
   //this.serviceChat.startConnection();
     // Let's wire up to the signalr observables  

   //serviceChat.startConnection();
   //serviceChat.RecievedMessage();
 
  // sendMessage(){
  //   this.serviceChat.sendMessage(this.message);
  //   this.GetsendMessage();
  // }
  // GetsendMessage(){
  //   this.serviceChat.messageReceivedEvent$.subscribe(data => {
  //     console.log(data);
  //     //this.messages.push(data);
  // });
  //}
  }
  // showSuccessToaster(){
  //   this.toaster.show('warning', 'Check it out!', 'This is a warning alert', 3000);
  // }
  ngOnInit() {
   //initialize Message Data
//    this.messageData = new MessageData(this.userData);

//    this.serviceChat.joinGroupEvent$.subscribe((data: UserChat) => {
//        console.log('welcome ' + JSON.stringify(data));

//        //Update the user Data
//        this.userData.IsMember = data.IsMember;

//        this.messageData = new MessageData(this.userData);

//        //Add user to members list
//        this.members.push(data);

//    }, err => this.errorHandler(err, 'Join Group'));

//    //This will notify Old members that new members has been added
//    this.serviceChat.notifyEvent$.subscribe((member: UserChat) => {
//        console.log('new member ' + JSON.stringify(member));

//        this.members.push(member);

//        //Notify New Members of your existence
//        this.notifyNewMembers(this.userData);

//    }, err => this.errorHandler(err, 'Join Group'));

//    //This will notify New members of Old Members
//    this.serviceChat.notifyNewMembersEvent$.subscribe((member: UserChat) => {

//        //Check if member is already in the list
//        let memberExist = this.members.find(x => {
//            return x.UserId == member.UserId
//        });

//        //Prevent Duplicate Members in the list
//        if (!memberExist) {
//            this.members.push(member)
//        }

//        console.log('old member list ' + JSON.stringify(this.members));

//    }, err => this.errorHandler(err, 'New Member notification'));

//    this.serviceChat.messageReceivedEvent$.subscribe((data: MessageData) => {
//        console.log('new message ' + JSON.stringify(data));
//        this.messages.push(data);

//    }, err => this.errorHandler(err, 'Receiving Message'));

//    this.serviceChat.oldMessagesEvent$.subscribe((messages: Array<MessageData>) => {
//        console.log('old message ' + JSON.stringify(messages));
//        //Replace your current Messages with the Old messages including your messages in it
//        this.messages = messages;

//    }, err => this.errorHandler(err, 'Getting Old Messages'));

//    this.serviceChat.leaveGroupEvent$.subscribe((user: UserChat) => {

//        this.members = this.members.filter((member: UserChat) => member.UserId != user.UserId);

//        if (this.userData.UserId == user.UserId) {
//            this.userData.IsMember = false;
//            this.userData.GroupName = "";

//            this.members = [];
//            this.messages = [];

//            if (this.isLoggingOut) {
//                this.clearUserData();
//            }
//        }
//        else {
//        }

//    })
  }
//   private errorHandler(error: any, title: string) {
//     console.log(title + ':' + error);
// }

// private sortMembers(): Array<UserChat> {

//     return this.members.sort((a: UserChat, b: UserChat) => {
//         var nameA = a.Name.toUpperCase(); // ignore upper and lowercase
//         var nameB = b.Name.toUpperCase(); // ignore upper and lowercase
//         if (nameA < nameB) {
//             return -1;
//         }
//         if (nameA > nameB) {
//             return 1;
//         }

//         // names must be equal
//         return 0;
//     });
// }

// private reConnect() {
//     this.serviceChat.startConnection();
// }

// private joinGroup(groupName): void {
//     this.userData.GroupName = groupName;
//     this.serviceChat.joinGroup(this.userData);
// }

// private notifyNewMembers(user: UserChat) {
//     this.serviceChat.notifyNewMembers(user, this.messages);
// }

// private sendMessage() {
//     this.serviceChat.sendMessage(this.messageData);

//     this.messageData.Message = "";
// }

// private leaveGroup(): void {
//     this.serviceChat.leaveGroup(this.userData);
// }

// private logout(): void {

//     if (this.userData.IsMember && this.userData.GroupName) {
//         this.isLoggingOut = true;
//         this.leaveGroup();
//     }
//     else {
//         this.clearUserData();
//     }
// }

// private clearUserData() {
//     this.userData.Email = '';
//     this.userData.Name = '';

//     localStorage.removeItem('userData');

//     this.serviceChat.stopConnection();

//     this.isLoggingOut = false;

// }
  // showPopup(num: number) {
  //   this["showPopup" + num] = true;
   
  // }

  // hidePopup(num: number) {
  //   this["showPopup" + num] = false;
  // }
  // change() {
  //   alert(this.someDate);
  // }
  // CallMainCloseLogOut(){
  //   this.servicefile.DownloadFile(this.filename).subscribe((result: any) => {  
  //     if (result.type != 'text/plain') {  
  //       var blob = new Blob([result]);    
  //       FileSaver.saveAs(blob, this.filename);  
  //     }}); 
  // }
  // Deletefile(){
  //   this.servicefile.DeleteFile(this.filename).subscribe();
  // }
  // onFileUpload(event){
  //   const file = event.target.files[0];
  //   this.filename=event.target.files[0].name;
  //   if(this.filename)
  //   {
  //     this.servicefile.UploadFile(file).subscribe(data=>{
  //       let z=data['messageBox']
  //      if(z=='true')
  //      {
  //          this.d=true;
  //      }else
  //      {
  //       this.d=false;
  //      }
  //       if (this.d==true)
  //       {
  //         this.toaster.show('success', 'Thành Công!', 'Tệp đã tải xong.');

  //       }else
  //       {
  //         this.toaster.show('error', 'Thất bại!', 'Không tải được tệp.');
  //       }
  //     });
  //   }

  // }
}
