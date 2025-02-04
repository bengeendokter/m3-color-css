import { Component } from '@angular/core';
import { setThemeFromHexColor } from 'm3-css-color-token-generator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{

  constructor()
  {
    setThemeFromHexColor('#ff0000');
    document.documentElement.classList.add('light');
  }
}
