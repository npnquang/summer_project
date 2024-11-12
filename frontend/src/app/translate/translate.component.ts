import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { Package } from '../../models/package';
import { UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketIoService } from '../../services/socket/socket.io.service';

interface Translation {
  language: string,
  text: string,
  translation: string
}

const languageCodes = ['es', 'ko', 'zh-CN'];
const languageNames = ['Spanish', 'Korean', 'Chinese (PRC)'];

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, DecimalPipe, FormsModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {
  packages: Package[] = [];
  translations: Translation[] = [];
  currentTargetLanguage: number = -1;
  currentIndex: number = -1;
  currentContext: string = '';


  constructor(private db: BackendService, private socket: SocketIoService) {}

  ngOnInit() {
    // retrieve packages
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });

    this.socket.receiveTranslation().subscribe({
      next: (data: string) =>{

        let exist: boolean = false;
        this.translations.map((translation: Translation) => {
          if (translation.language === languageNames[this.currentTargetLanguage]) {
            exist = true;
          }
        })

        if (!exist) {
          this.translations.push({
            language: languageNames[this.currentTargetLanguage],
            text: this.currentContext,
            translation: data
          });
        }
        
      },
      error: (e) => console.log(e)
    })
  }


  translate(index: number, text: string) {
    if (this.currentTargetLanguage >= 0 && this.currentTargetLanguage <= 2) {
      if (index != this.currentIndex) {
        this.translations = [];
      }
      this.currentIndex = index;
      this.currentContext = text;

  
      this.socket.sendTranslateLanguage(languageCodes[this.currentTargetLanguage], text);
    }  
  }

  close() {
    this.translations = [];
  }

}
