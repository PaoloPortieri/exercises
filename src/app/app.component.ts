import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .male { background-color: blue; color: white }
    .female { background-color: pink }
    .big { font-size: 30px }  
  `]
})
export class AppComponent {
  title = 'exercises';
}
