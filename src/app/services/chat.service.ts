import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private storageKey = 'chatMessages';
  private messages: Message[] = this.getMessages();
  private messagesSubject = new BehaviorSubject<Message[]>(this.messages);
  messages$ = this.messagesSubject.asObservable();
  private channel = new BroadcastChannel('chat_channel');

  constructor() {
    this.channel.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };
  }

  getMessages(): Message[] {
    const messages = localStorage.getItem(this.storageKey);
    return messages ? JSON.parse(messages) : [];
  }

  saveMessage(username: string, text: string) {
    const newMessage: Message = {
      user: username,
      message: text,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    const updatedMessages = [...this.messagesSubject.value, newMessage];
    this.messagesSubject.next(updatedMessages);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedMessages));
    this.channel.postMessage(updatedMessages);
  }
  removeMessage() {
    this.messagesSubject.next([]);
    localStorage.setItem(this.storageKey, JSON.stringify([]));
    this.channel.postMessage([]);
  }
}
