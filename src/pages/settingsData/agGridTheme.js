import { themeQuartz } from "ag-grid-community";

export const myTheme = themeQuartz.withParams({
  accentColor: "var(--primary)",
  backgroundColor: "var(--card)",
  browserColorScheme: "light",
  columnBorder: false,
  textColor: "var(--primary)",
  headerTextColor: "var(--foreground)",
  foregroundColor: "var(--foreground)",
  headerBackgroundColor: "var(--card)",
  headerFontSize: 14,
  headerFontWeight: 500,
  headerRowBorder: true,
  cellHorizontalPadding: 25,
  oddRowBackgroundColor: "var(--muted)",
  wrapperBorderRadius: "2.5rem",
  pinnedColumnBorder: false,
  rowHoverColor: "var(--muted)",
  rowBorder: true,
  borderColor: "var(--border)",
});
