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
  public hexThemeColor: string = '#ff0000';
  public PALETTES = ['primary', 'secondary', 'tertiary', 'neutral', 'neutral-variant', 'error'] as const;
  public VALUES = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 100] as const;

  constructor()
  {
    setThemeFromHexColor(this.hexThemeColor);
    document.documentElement.classList.add('light');
  }
}
