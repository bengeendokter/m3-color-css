# Material Design 3 CSS custom properties color token generator
## Install
### Install latest version
```bash
pnpm add github:bengeendokter/m3-css-color-token-generator
```
### Install specific version
```bash
pnpm add github:bengeendokter/m3-css-color-token-generator#v0.1.1
```
## Get light/dark/contrast themes CSS
```CSS
/* styles.css */
@import "m3-css-color-token-generator/theme/palette";
@import "m3-css-color-token-generator/theme/light";
@import "m3-css-color-token-generator/theme/dark";
@import "m3-css-color-token-generator/theme/light-mc";
@import "m3-css-color-token-generator/theme/dark-mc";
@import "m3-css-color-token-generator/theme/light-hc";
@import "m3-css-color-token-generator/theme/dark-hc";
```
## Use helper functions
```TypeScript
// main.ts
import {setTheme, handleLightThemeButtonPressed, enableSystemContrastPreferenceListener, enableSystemColorSchemePreferenceListener} from 'm3-css-color-token-generator';

setTheme();
enableSystemContrastPreferenceListener();
enableSystemColorSchemePreferenceListener();

lightButton.addEventListener("click", () => {
    handleLightThemeButtonPressed();
});
```
