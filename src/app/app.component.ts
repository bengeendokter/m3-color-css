import { Component, effect, signal, WritableSignal } from '@angular/core';
import { argbFromHex, blueFromArgb, DynamicColor, greenFromArgb, Hct, MaterialDynamicColors, redFromArgb, SchemeTonalSpot } from '@material/material-color-utilities';
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

    // setThemeFromHexColor(this.hexThemeColor());
    document.documentElement.classList.add('light');

    effect(() => {
      // setThemeFromHexColor(this.hexThemeColor());
      this.getSchemeColorUtils(0);
      // this.getSchemeColorUtils(0.5);
      // this.getSchemeColorUtils(1);

      this.setPaletteInnerHtml();

      setTimeout(() => {
        this.updateThemeColorLabel();
      }, 100);
    });


  }

  private getSchemeColorUtils(contrast: 0 | 0.5 | 1 = 0)
  {
    const htc = Hct.fromInt(argbFromHex(this.hexThemeColor()));
    const scheme = new SchemeTonalSpot(htc, false, contrast);
    console.log('scheme ' + contrast, scheme);
    const primaryPalette = scheme.primaryPalette;
    const schemePrimary = scheme.primary;
    document.documentElement.style.setProperty(`--color-to-find`, `rgb(${redFromArgb(schemePrimary)}, ${greenFromArgb(schemePrimary)}, ${blueFromArgb(schemePrimary)})`);


    console.log("primary from scheme " + contrast, `rgb(${redFromArgb(schemePrimary)}, ${greenFromArgb(schemePrimary)}, ${blueFromArgb(schemePrimary)})`);

    if(contrast === 0)
    {
      console.log("primary40 from palette " + contrast, `rgb(${redFromArgb(primaryPalette.tone(40))}, ${greenFromArgb(primaryPalette.tone(40))}, ${blueFromArgb(primaryPalette.tone(40))})`);
    }
    else if(contrast === 0.5)
    {
      console.log("primary23 from palette " + contrast, `rgb(${redFromArgb(primaryPalette.tone(23))}, ${greenFromArgb(primaryPalette.tone(23))}, ${blueFromArgb(primaryPalette.tone(23))})`);
    }
    else if(contrast === 1)
    {
      console.log("primary18 from palette " + contrast, `rgb(${redFromArgb(primaryPalette.tone(18))}, ${greenFromArgb(primaryPalette.tone(18))}, ${blueFromArgb(primaryPalette.tone(18))})`);
    }

    this.VALUES.forEach(value =>
    {
      const primaryValue = primaryPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-primary${value}`, `rgb(${redFromArgb(primaryValue)}, ${greenFromArgb(primaryValue)}, ${blueFromArgb(primaryValue)})`);

      const secondaryValue = scheme.secondaryPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-secondary${value}`, `rgb(${redFromArgb(secondaryValue)}, ${greenFromArgb(secondaryValue)}, ${blueFromArgb(secondaryValue)})`);

      const tertiaryValue = scheme.tertiaryPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-tertiary${value}`, `rgb(${redFromArgb(tertiaryValue)}, ${greenFromArgb(tertiaryValue)}, ${blueFromArgb(tertiaryValue)})`);

      const neutralValue = scheme.neutralPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-neutral${value}`, `rgb(${redFromArgb(neutralValue)}, ${greenFromArgb(neutralValue)}, ${blueFromArgb(neutralValue)})`);

      const neutralVariantValue = scheme.neutralVariantPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-neutral-variant${value}`, `rgb(${redFromArgb(neutralVariantValue)}, ${greenFromArgb(neutralVariantValue)}, ${blueFromArgb(neutralVariantValue)})`);

      const errorValue = scheme.errorPalette.tone(value);
      document.documentElement.style.setProperty(`--md-ref-palette-error${value}`, `rgb(${redFromArgb(errorValue)}, ${greenFromArgb(errorValue)}, ${blueFromArgb(errorValue)})`);
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
    [1, 2, 3].forEach((paletteType) => {
      this.PALETTES.forEach(palette =>
        {
          this.VALUES.forEach(value =>
          {
            const element = document.querySelector(`#${palette}${value}${paletteType}`);

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
    });
  }
}
