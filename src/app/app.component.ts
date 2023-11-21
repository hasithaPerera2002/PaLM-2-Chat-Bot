import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Palm2';
  inputVal: string = '';
  chat: ChatData[] = [];


  async btnClickHandle() {
    let message = this.inputVal;
    console.log('btn clicked', this.inputVal);
    const userMessage: ChatData = {
      user: 'user',
      message: message
    }
    this.chat.push(userMessage)
    this.inputVal = '';
    const reply = await fetch(`https://localhost:3000/api/prompt/:${message}`).then(res => res.json());
    let replyMessage: ChatData = {
      user: 'palm',
      message: await reply.candidates[0].content
    };

    this.chat.push(replyMessage);

  }
}

interface ChatData {
  user: string;
  message: string;
}
