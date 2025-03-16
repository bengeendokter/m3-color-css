// src/theme.ts
var COLOR_SCHEME = {
  LIGHT: "light",
  DARK: "dark"
};
function isColorScheme(value) {
  const colorSchemeValues = Object.values(COLOR_SCHEME);
  return colorSchemeValues.includes(value);
}
var CONTRAST = {
  STANDARD: "standard",
  MEDIUM_CONTRAST: "mc",
  HIGH_CONTRAST: "hc"
};
function isContrast(value) {
  const contrastValues = Object.values(CONTRAST);
  return contrastValues.includes(value);
}
var THEME_CLASS = {
  LIGHT: "light",
  LIGHT_MEDIUM_CONTRAST: "light-medium-contrast",
  LIGHT_HIGH_CONTRAST: "light-high-contrast",
  DARK: "dark",
  DARK_MEDIUM_CONTRAST: "dark-medium-contrast",
  DARK_HIGH_CONTRAST: "dark-high-contrast"
};
var lightContrastMap = {
  [CONTRAST.STANDARD]: THEME_CLASS.LIGHT,
  [CONTRAST.MEDIUM_CONTRAST]: THEME_CLASS.LIGHT_MEDIUM_CONTRAST,
  [CONTRAST.HIGH_CONTRAST]: THEME_CLASS.LIGHT_HIGH_CONTRAST
};
var darkContrastMap = {
  [CONTRAST.STANDARD]: THEME_CLASS.DARK,
  [CONTRAST.MEDIUM_CONTRAST]: THEME_CLASS.DARK_MEDIUM_CONTRAST,
  [CONTRAST.HIGH_CONTRAST]: THEME_CLASS.DARK_HIGH_CONTRAST
};
var colorSchemeMap = {
  [COLOR_SCHEME.LIGHT]: lightContrastMap,
  [COLOR_SCHEME.DARK]: darkContrastMap
};
var OS_PREFERENCE = "os";
var MEDIA_QUERY = {
  PREFERS_COLOR_SCHEME_DARK: "(prefers-color-scheme: dark)",
  PREFERS_CONTRAST_MORE: "(prefers-contrast: more)"
};
var LOCAL_STORAGE = {
  COLOR_SCHEME: "colorScheme",
  CONTRAST: "contrast"
};
function setMetaThemeColor(color) {
  if (!color) {
    const surfaceContainerColor = getComputedStyle(document.documentElement).getPropertyValue("--md-sys-color-surface-container");
    color = surfaceContainerColor;
  }
  const metaTag = document.querySelector('meta[name="theme-color"]');
  if (!metaTag) {
    const newMetaTag = document.createElement("meta");
    newMetaTag.setAttribute("name", "theme-color");
    newMetaTag.setAttribute("content", color);
    document.head.appendChild(newMetaTag);
    return;
  }
  metaTag.setAttribute("content", color);
}
function setTheme({ colorScheme, contrast, updateMetaThemeColor = true }) {
  Object.values(THEME_CLASS).forEach((themeClass2) => {
    document.documentElement.classList.remove(themeClass2);
  });
  const themeColorScheme = colorScheme ?? getColorSchemePreference();
  const themeContrast = contrast ?? getContrastPreference();
  const themeClass = colorSchemeMap[themeColorScheme][themeContrast];
  document.documentElement.classList.add(themeClass);
  if (updateMetaThemeColor) {
    setMetaThemeColor();
  }
}
function setDarkTheme(updateMetaThemeColor = true) {
  setTheme({ colorScheme: COLOR_SCHEME.DARK, updateMetaThemeColor });
}
function setDarkThemePreference() {
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, COLOR_SCHEME.DARK);
}
function setLightTheme(updateMetaThemeColor = true) {
  setTheme({ colorScheme: COLOR_SCHEME.LIGHT, updateMetaThemeColor });
}
function setLightThemePreference() {
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, COLOR_SCHEME.LIGHT);
}
function setOsColorSchemePreference() {
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, OS_PREFERENCE);
}
function setStandardContrastTheme(updateMetaThemeColor = true) {
  setTheme({ contrast: CONTRAST.STANDARD, updateMetaThemeColor });
}
function setStandardContrastThemePreference() {
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.STANDARD);
}
function setMediumContrastTheme(updateMetaThemeColor = true) {
  setTheme({ contrast: CONTRAST.MEDIUM_CONTRAST, updateMetaThemeColor });
}
function setMediumContrastThemePreference() {
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.MEDIUM_CONTRAST);
}
function setHighContrastTheme(updateMetaThemeColor = true) {
  setTheme({ contrast: CONTRAST.HIGH_CONTRAST, updateMetaThemeColor });
}
function setHighContrastThemePreference() {
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.HIGH_CONTRAST);
}
function setOsContrastPreference() {
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, OS_PREFERENCE);
}
function getColorSchemePreference() {
  const storedPreferenceColorScheme = localStorage.getItem(LOCAL_STORAGE.COLOR_SCHEME) ?? OS_PREFERENCE;
  const osColorScheme = window.matchMedia(MEDIA_QUERY.PREFERS_COLOR_SCHEME_DARK).matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT;
  if (!isColorScheme(storedPreferenceColorScheme)) {
    return osColorScheme;
  }
  return storedPreferenceColorScheme;
}
function enableSystemColorSchemePreferenceListener() {
  window.matchMedia(MEDIA_QUERY.PREFERS_COLOR_SCHEME_DARK).addEventListener("change", (event) => {
    const storedPreferenceColorScheme = localStorage.getItem(LOCAL_STORAGE.COLOR_SCHEME) ?? OS_PREFERENCE;
    if (isColorScheme(storedPreferenceColorScheme)) {
      return;
    }
    const newColorScheme = event.matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT;
    if (newColorScheme === COLOR_SCHEME.DARK) {
      setDarkTheme();
      return;
    }
    if (newColorScheme === COLOR_SCHEME.LIGHT) {
      setLightTheme();
      return;
    }
  });
}
function getContrastPreference() {
  const storedPreferenceContrast = localStorage.getItem(LOCAL_STORAGE.CONTRAST) ?? OS_PREFERENCE;
  const osContrast = window.matchMedia(MEDIA_QUERY.PREFERS_CONTRAST_MORE).matches ? CONTRAST.HIGH_CONTRAST : CONTRAST.STANDARD;
  if (!isContrast(storedPreferenceContrast)) {
    return osContrast;
  }
  return storedPreferenceContrast;
}
function enableSystemContrastPreferenceListener() {
  window.matchMedia(MEDIA_QUERY.PREFERS_CONTRAST_MORE).addEventListener("change", (event) => {
    const storedPreferenceContrast = localStorage.getItem(LOCAL_STORAGE.CONTRAST) ?? OS_PREFERENCE;
    if (isContrast(storedPreferenceContrast)) {
      return;
    }
    const newContrast = event.matches ? CONTRAST.HIGH_CONTRAST : CONTRAST.STANDARD;
    if (newContrast === CONTRAST.HIGH_CONTRAST) {
      setHighContrastTheme();
      return;
    }
    if (newContrast === CONTRAST.STANDARD) {
      setStandardContrastTheme();
      return;
    }
  });
}
export {
  COLOR_SCHEME,
  CONTRAST,
  THEME_CLASS,
  colorSchemeMap,
  enableSystemColorSchemePreferenceListener,
  enableSystemContrastPreferenceListener,
  getColorSchemePreference,
  getContrastPreference,
  isColorScheme,
  isContrast,
  setDarkTheme,
  setDarkThemePreference,
  setHighContrastTheme,
  setHighContrastThemePreference,
  setLightTheme,
  setLightThemePreference,
  setMediumContrastTheme,
  setMediumContrastThemePreference,
  setMetaThemeColor,
  setOsColorSchemePreference,
  setOsContrastPreference,
  setStandardContrastTheme,
  setStandardContrastThemePreference,
  setTheme
};
