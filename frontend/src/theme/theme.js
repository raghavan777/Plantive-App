import colors from './colors';

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

export const lightTheme = {
    ...colors,
    isDark: false,
};

export const darkTheme = {
    ...colors,
    background: "#121212",
    surface: "#1E1E1E",
    text: "#F5F5F5",
    textSecondary: "#BDBDBD",
    isDark: true,
};

