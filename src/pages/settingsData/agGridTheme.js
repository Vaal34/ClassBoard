import { themeQuartz } from 'ag-grid-community'

export const myTheme = themeQuartz.withParams({
  // Couleurs principales - style doux et moderne
  accentColor: 'var(--primary)',
  backgroundColor: '#fff',
  foregroundColor: 'var(--foreground)',

  // En-têtes - style épuré
  headerBackgroundColor: 'var(--primary)',
  headerTextColor: 'var(--muted)',
  headerFontSize: 15,
  headerFontWeight: 900,
  headerRowBorder: false,

  // Cellules - espacement généreux
  textColor: 'var(--foreground)',
  cellHorizontalPadding: 24,
  cellVerticalPadding: 16,
  cellTextColor: 'var(--text-foreground)',

  // Lignes - alternance subtile
  oddRowBackgroundColor: 'var(--muted)',
  rowHoverColor: 'var(--secondary)',
  rowBorder: false,
  borderRadius: '7px',

  // Bordures et contours - très arrondis
  columnBorder: false,
  pinnedColumnBorder: false,
  wrapperBorderRadius: '2rem',
  wrapperBorder: "0.5px solid var(--primary)",

  // Sélection - couleur douce
  selectedRowBackgroundColor: 'var(--secondary)',
  selectedRowTextColor: 'var(--primary-foreground)',

  // Pagination - style moderne
  paginationBackgroundColor: 'var(--secondary)',
  paginationTextColor: 'var(--foreground)',

  //Chekcbox
  checkboxIndeterminateBackgroundColor: 'var(--accent)',
  checkboxUncheckedBorderColor: 'var(--primary)',
})
