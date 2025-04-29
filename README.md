# Material Design 3 colors implemented in plain CSS using the relative color syntax.
[![Netlify Status](https://api.netlify.com/api/v1/badges/b5294323-31f4-44ae-8390-b6a6b7f8ec11/deploy-status)](https://app.netlify.com/sites/m3-color-css/deploys)
## Demo
A demo is available on https://m3-color-css.bengeendokter.be/
## Install
### Install latest version
```bash
pnpm add github:bengeendokter/m3-color-css
```
### Install specific version
```bash
pnpm add github:bengeendokter/m3-color-css#v0.1.5
```
## Get light/dark/contrast themes CSS
```CSS
/* styles.css */
@import "m3-color-css/theme/palette";
@import "m3-color-css/theme/light";
@import "m3-color-css/theme/dark";
@import "m3-color-css/theme/light-mc";
@import "m3-color-css/theme/dark-mc";
@import "m3-color-css/theme/light-hc";
@import "m3-color-css/theme/dark-hc";
```
## Use helper functions
```TypeScript
// main.ts
import {setTheme, handleLightThemeButtonPressed, enableSystemContrastPreferenceListener, enableSystemColorSchemePreferenceListener} from 'm3-color-css';

setTheme();
enableSystemContrastPreferenceListener();
enableSystemColorSchemePreferenceListener();

lightButton.addEventListener("click", () => {
    handleLightThemeButtonPressed();
});
```
## Older versions
Verions 1.2 and prior can be found on https://github.com/bengeendokter/m3-css-color-token-generator
