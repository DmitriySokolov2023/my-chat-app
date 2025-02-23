import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../common-ui/form/form.component';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat-page',
  imports: [FormComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  messages: Message[] = [];
  userName: string | null = null;

  constructor(
    private chatService: ChatService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chatService.messages$.subscribe((msgs) => {
      this.messages = [...msgs];
      this.cdr.detectChanges();
    });
    this.loginService.userName$.subscribe((user) => {
      this.userName = user;
      this.cdr.detectChanges();
    });
  }

  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  sendMessage(formValue: any) {
    this.chatService.saveMessage(this.userName!, formValue.message);
  }
  removeMessage() {
    this.chatService.removeMessage();
  }
}
