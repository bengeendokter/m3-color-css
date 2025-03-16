type ColorScheme = 'light' | 'dark';
declare const COLOR_SCHEME: Readonly<{
    [Key in Uppercase<ColorScheme>]: Lowercase<Key> & ColorScheme;
}>;
declare function isColorScheme(value: string): value is ColorScheme;
type Contrast = 'standard' | 'medium-contrast' | 'high-contrast';
type ContrastKey<OriginalType extends Contrast> = OriginalType extends `${infer ContrastLevel}-contrast` ? Uppercase<`${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ContrastValue<Key extends ContrastKey<Contrast>> = Key extends `${infer ContrastLevel}_CONTRAST` ? `${Lowercase<ContrastLevel>}-contrast` : Lowercase<Key>;
declare const CONTRAST: Readonly<{
    [Key in ContrastKey<Contrast>]: ContrastValue<Key> & Contrast;
}>;
declare function isContrast(value: string): value is Contrast;
type ThemeClass = `${ColorScheme}` | `${ColorScheme}-${Exclude<Contrast, 'standard'>}`;
type ThemeClassKey<OriginalType extends ThemeClass> = OriginalType extends `${infer ColorScheme}-${infer ContrastLevel}-contrast` ? Uppercase<`${ColorScheme}_${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ThemeClassValue<Key extends ThemeClassKey<ThemeClass>> = Key extends `${infer ColorScheme}_${infer ContrastLevel}_CONTRAST` ? `${Lowercase<ColorScheme>}-${Lowercase<ContrastLevel>}-contrast` : Lowercase<Key>;
declare const THEME_CLASS: Readonly<{
    [Key in ThemeClassKey<ThemeClass>]: ThemeClassValue<Key> & ThemeClass;
}>;
declare const colorSchemeMap: Readonly<Record<ColorScheme, Record<Contrast, ThemeClass>>>;
declare const OS_PREFERENCE: "os";
/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param color - The css color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
 */
declare function setMetaThemeColor(color?: string): void;
/**
 * Sets the theme by applying the appropriate CSS classes to the root element.
 *
 * @param params - The parameters for setting the theme.
 * @param [params.colorScheme] - The color scheme to set. If not provided, the preferred color scheme will be used.
 * @param [params.contrast] - The contrast level to set. If not provided, the preferred contrast level will be used.
 * @param [params.updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setTheme(params?: Partial<{
    colorScheme: ColorScheme;
    contrast: Contrast;
    updateMetaThemeColor: boolean;
}>): void;
/**
 * Sets the color scheme to a dark theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setDarkTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setDarkThemePreference(): void;
/**
 * Sets the color scheme to a light theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setLightTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setLightThemePreference(): void;
/**
 * Sets the color scheme preference to follow system.
 */
declare function setOsColorSchemePreference(): void;
/**
 * Sets the theme contrast to a standard.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setStandardContrastTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the contrast preference to standard.
 */
declare function setStandardContrastThemePreference(): void;
/**
 * Sets the theme contrast to a medium.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setMediumContrastTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the contrast preference to medium.
 */
declare function setMediumContrastThemePreference(): void;
/**
 * Sets the theme contrast to high.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setHighContrastTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the contrast preference to high.
 */
declare function setHighContrastThemePreference(): void;
/**
 * Sets the contrast preference to follow system.
 */
declare function setOsContrastPreference(): void;
/**
 * Sets the color scheme to the initial theme based on stored preference or system preference.
 */
declare function getColorSchemePreference(): ColorScheme;
/**
 * Enables the color scheme preference listener.
 */
declare function enableSystemColorSchemePreferenceListener(): void;
/**
 * Sets the contrast to the initial contrast on stored preference or system preference.
 */
declare function getContrastPreference(): Contrast;
/**
 * Enables the contrast preference listener.
 */
declare function enableSystemContrastPreferenceListener(): void;
/**
 * Handles the event when the set to dark theme button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleDarkThemeButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to light theme button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleLightThemeButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to os color scheme button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleOsColorSchemeButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to standard contrast button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleStandardContrastButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to medium contrast button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleMediumContrastButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to high contrast button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleHighContrastButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * Handles the event when the set to os contrast button is pressed.
 * It stores the theme preference and updates the current theme.
 *
 * @param [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function handleOsContrastButtonPressed(updateMetaThemeColor?: boolean): void;
/**
 * @returns The contrast from local storage. If not found, returns 'os'.
 */
declare function getLocalStorageColorScheme(): ColorScheme | typeof OS_PREFERENCE;
/**
 * @returns The contrast from local storage. If not found, returns 'os'.
 */
declare function getLocalStorageContrast(): Contrast | typeof OS_PREFERENCE;

export { COLOR_SCHEME, CONTRAST, type ColorScheme, type Contrast, THEME_CLASS, type ThemeClass, colorSchemeMap, enableSystemColorSchemePreferenceListener, enableSystemContrastPreferenceListener, getColorSchemePreference, getContrastPreference, getLocalStorageColorScheme, getLocalStorageContrast, handleDarkThemeButtonPressed, handleHighContrastButtonPressed, handleLightThemeButtonPressed, handleMediumContrastButtonPressed, handleOsColorSchemeButtonPressed, handleOsContrastButtonPressed, handleStandardContrastButtonPressed, isColorScheme, isContrast, setDarkTheme, setDarkThemePreference, setHighContrastTheme, setHighContrastThemePreference, setLightTheme, setLightThemePreference, setMediumContrastTheme, setMediumContrastThemePreference, setMetaThemeColor, setOsColorSchemePreference, setOsContrastPreference, setStandardContrastTheme, setStandardContrastThemePreference, setTheme };
