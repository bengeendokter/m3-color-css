type ColorScheme = 'light' | 'dark';
declare const COLOR_SCHEME: Readonly<{
    [Key in Uppercase<ColorScheme>]: Lowercase<Key> & ColorScheme;
}>;
declare function isColorScheme(value: string): value is ColorScheme;
type Contrast = 'standard' | 'mc' | 'hc';
type ContrastToFullName<OriginalType extends Contrast> = OriginalType extends 'mc' ? 'medium-contrast' : OriginalType extends 'hc' ? 'high-contrast' : OriginalType;
type ContrastFullNameToContrast<FullName extends string> = FullName extends 'medium-contrast' ? 'mc' : FullName extends 'high-contrast' ? 'hc' : FullName;
type ContrastKey<OriginalType extends ContrastToFullName<Contrast>> = OriginalType extends `${infer ContrastLevel}-contrast` ? Uppercase<`${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ContrastValue<Key extends ContrastKey<ContrastToFullName<Contrast>>> = Key extends `${infer ContrastLevel}_CONTRAST` ? ContrastFullNameToContrast<`${Lowercase<ContrastLevel>}-contrast`> : Lowercase<Key>;
declare const CONTRAST: Readonly<{
    [Key in ContrastKey<ContrastToFullName<Contrast>>]: ContrastValue<Key> & Contrast;
}>;
declare function isContrast(value: string): value is Contrast;
type ThemeClass = `${ColorScheme}` | `${ColorScheme}-${ContrastToFullName<Exclude<Contrast, 'standard'>>}`;
type ThemeClassKey<OriginalType extends ThemeClass> = OriginalType extends `${infer ColorScheme}-${infer ContrastLevel}-contrast` ? Uppercase<`${ColorScheme}_${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ThemeClassValue<Key extends ThemeClassKey<ThemeClass>> = Key extends `${infer ColorScheme}_${infer ContrastLevel}_CONTRAST` ? `${Lowercase<ColorScheme>}-${Lowercase<ContrastLevel>}-contrast` : Lowercase<Key>;
declare const THEME_CLASS: Readonly<{
    [Key in ThemeClassKey<ThemeClass>]: ThemeClassValue<Key> & ThemeClass;
}>;
declare const colorSchemeMap: Readonly<Record<ColorScheme, Record<Contrast, ThemeClass>>>;
/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The css color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
 */
declare function setMetaThemeColor(color?: string): void;
/**
 * Sets the theme by applying the appropriate CSS classes to the root element.
 *
 * @param {Object} params - The parameters for setting the theme.
 * @param {ColorScheme} [params.colorScheme] - The color scheme to set. If not provided, the preferred color scheme will be used.
 * @param {Contrast} [params.contrast] - The contrast level to set. If not provided, the preferred contrast level will be used.
 * @param {boolean} [params.updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setTheme({ colorScheme, contrast, updateMetaThemeColor }: Partial<{
    colorScheme: ColorScheme;
    contrast: Contrast;
    updateMetaThemeColor: boolean;
}>): void;
/**
 * Sets the color scheme to a dark theme.
 *
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setDarkTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setDarkThemePreference(): void;
/**
 * Sets the color scheme to a light theme.
 *
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
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
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setStandardContrastTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the contrast preference to standard.
 */
declare function setStandardContrastThemePreference(): void;
/**
 * Sets the theme contrast to a medium.
 *
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
declare function setMediumContrastTheme(updateMetaThemeColor?: boolean): void;
/**
 * Sets the contrast preference to medium.
 */
declare function setMediumContrastThemePreference(): void;
/**
 * Sets the theme contrast to high.
 *
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
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

export { COLOR_SCHEME, CONTRAST, type ColorScheme, type Contrast, THEME_CLASS, type ThemeClass, colorSchemeMap, enableSystemColorSchemePreferenceListener, enableSystemContrastPreferenceListener, getColorSchemePreference, getContrastPreference, isColorScheme, isContrast, setDarkTheme, setDarkThemePreference, setHighContrastTheme, setHighContrastThemePreference, setLightTheme, setLightThemePreference, setMediumContrastTheme, setMediumContrastThemePreference, setMetaThemeColor, setOsColorSchemePreference, setOsContrastPreference, setStandardContrastTheme, setStandardContrastThemePreference, setTheme };
