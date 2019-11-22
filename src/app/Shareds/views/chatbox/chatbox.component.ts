import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  

  constructor(private _serviceChat :ChatService) { 
      // Let's wire up to the signalr observables        
     

  }

  ngOnInit() {

  }

}
