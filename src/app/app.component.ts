import { Component, effect, signal, WritableSignal } from '@angular/core';
import { setThemeFromHexColor } from 'm3-css-color-token-generator';

type LchColor = `oklch(${number} ${number} ${number})`;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  public hexThemeColor: WritableSignal<string> =  signal('#ff0000');
  public PALETTES = ['primary', 'secondary', 'tertiary', 'neutral', 'neutral-variant', 'error'] as const;
  public VALUES = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 100] as const;

  constructor()
  {
    setThemeFromHexColor(this.hexThemeColor());
    document.documentElement.classList.add('light');

    effect(() => {
      setThemeFromHexColor(this.hexThemeColor());

      this.setPaletteInnerHtml();

      setTimeout(() => {
        this.updateThemeColorLabel();
      }, 100);
    });
  }

  private isLchColor(color: string): color is LchColor
  {
    return color.startsWith('oklch');
  }

  public handleColorChange() {
    const colorPickerValue = this.getColorPickerValue();
    this.hexThemeColor.set(colorPickerValue);
  }

  ngAfterViewInit()
  {
    this.setPaletteInnerHtml();
    this.updateThemeColorLabel();
  }

  public getColorPickerValue(): string {

    const themeColor = document.querySelector(`#themeColor`);

    if(!themeColor)
    {
      console.warn(`Element with id themeColor not found!`);
      return '';
    }

    const colorPickerValue = (themeColor as HTMLInputElement).value;

    return colorPickerValue;
  }

  private updateThemeColorLabel() {
    const themeColorLabel = document.querySelector(`#themeColorLabel`);

    if(!themeColorLabel)
    {
      console.warn(`Element with id themeColorLabel not found!`);
      return;
    }

    const lchThemeColor = window.getComputedStyle(themeColorLabel);

    const [l, c, h] = lchThemeColor.color.match(/\d+(\.\d+)?/g)!.map(Number);

    themeColorLabel.innerHTML = `Theme Color L:${l.toFixed(2).padStart(5, '0')} C:${c.toFixed(2).padStart(5, '0')} H:${h.toFixed(2).padStart(5, '0')}`;
  }

  private setPaletteInnerHtml()
  {
    this.PALETTES.forEach(palette =>
    {
      this.VALUES.forEach(value =>
      {
        const element = document.querySelector(`#${palette}${value}`);

        if(!element)
        {
          console.warn(`Element with id ${palette}${value} not found!`);
          return;
        }

        const compStyles = window.getComputedStyle(element);
        const lchColor = compStyles.backgroundColor;

        if(!this.isLchColor(lchColor))
        {
          console.warn(`Element with id ${palette}${value} has no LCH color!`);
          return;
        }

        // get the L C and H values
        const [l, c, h] = lchColor.match(/\d+(\.\d+)?/g)!.map(Number);

        // round the values to 2 decimal places
        const lchFixedDecimals = `${value.toString().padStart(2, '0')} L:${l.toFixed(2).padStart(5, '0')} C:${c.toFixed(2).padStart(5, '0')} H:${h.toFixed(2).padStart(5, '0')}`;

        element.innerHTML = lchFixedDecimals;
      });
    });
  }
}
