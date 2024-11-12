import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const API_URL = "";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private translate: Socket;
  private text2speech: Socket;
  private distance: Socket;
  
  constructor() {
    this.translate = io(API_URL + "/translate");
    this.text2speech = io(API_URL + "/text-to-speech");
    this.distance = io(API_URL + "/distance");

  }
  
  sendTextToSpeech(text: string) {
    this.text2speech.emit("text", text);
  }
  
  sendTranslateLanguage(language: string, content: string) {
    this.translate.emit("translate", {language, content});
  }

  receiveTranslation() {
    return new Observable<string>((observer) => {
      this.translate.on('return', (data: string) => {
        observer.next(data);
      });
    });
  }

  getDistance(destination: string) {
    this.distance.emit('distance', destination);
  }


  receiveDistance() {
    return new Observable<number>((observer) => {
      this.distance.on('return', ((data: number) => {
        observer.next(data);
      }));
    })
  }
}
