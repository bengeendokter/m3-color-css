import { enableSystemColorSchemePreferenceListener, enableSystemContrastPreferenceListener, getLocalStorageColorScheme, getLocalStorageContrast, handleDarkThemeButtonPressed, handleHighContrastButtonPressed, handleLightThemeButtonPressed, handleMediumContrastButtonPressed, handleOsColorSchemeButtonPressed, handleOsContrastButtonPressed, handleStandardContrastButtonPressed, setTheme } from "./theme";

setTheme();
enableSystemContrastPreferenceListener();
enableSystemColorSchemePreferenceListener();

// get the stored preferences and update the UI
// @ts-ignore
const colorScheme: HTMLSpanElement = window["color-scheme"];
colorScheme.innerText = getLocalStorageColorScheme();

// @ts-ignore
const contrast: HTMLSpanElement = window["contrast"];
contrast.innerText = getLocalStorageContrast();

// update the theme color when the color picker value changes
// @ts-ignore
const colorPicker: HTMLInputElement = window["color-picker"];
colorPicker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--theme-base-color", colorPicker.value);
});

// implement the theme buttons
 // @ts-ignore
const lightButton: HTMLButtonElement = window["light-button"];
lightButton.addEventListener("click", () => {
    handleLightThemeButtonPressed();
    colorScheme.innerText = getLocalStorageColorScheme();
});

 // @ts-ignore
 const darkButton: HTMLButtonElement = window["dark-button"];
 darkButton.addEventListener("click", () => {
     handleDarkThemeButtonPressed();
     colorScheme.innerText = getLocalStorageColorScheme();
 });

// @ts-ignore
const osColorScheme: HTMLButtonElement = window["os-color-scheme-button"];
osColorScheme.addEventListener("click", () => {
    handleOsColorSchemeButtonPressed();
    colorScheme.innerText = getLocalStorageColorScheme();
});

// @ts-ignore
const standardContrastButton: HTMLButtonElement = window["standard-contrast-button"];
standardContrastButton.addEventListener("click", () => {
    handleStandardContrastButtonPressed();
    contrast.innerText = getLocalStorageContrast();
});

// @ts-ignore
const mediumContrastButton: HTMLButtonElement = window["medium-contrast-button"];
mediumContrastButton.addEventListener("click", () => {
    handleMediumContrastButtonPressed();
    contrast.innerText = getLocalStorageContrast();
});

// @ts-ignore
const highContrastButton: HTMLButtonElement = window["high-contrast-button"];
highContrastButton.addEventListener("click", () => {
    handleHighContrastButtonPressed();
    contrast.innerText = getLocalStorageContrast();
});

// @ts-ignore
const osContrastButton: HTMLButtonElement = window["os-contrast-button"];
osContrastButton.addEventListener("click", () => {
    handleOsContrastButtonPressed();
    contrast.innerText = getLocalStorageContrast();
});