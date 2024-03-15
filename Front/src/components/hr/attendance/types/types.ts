import ColumnProps from 'pages/hr/salary/types/types';

interface MyButtonProps {
  variant: 'text' | 'contained' | 'outlined' | undefined;
  color: string;
  onClick: any;
  className: string;
  inputText: string;
}
export default MyButtonProps;

interface ButtonInfo {
  variant: 'text' | 'contained' | 'outlined' | undefined;
  color: string;
  onClick: any;
  className: string;
  inputText: string;
}

export interface ButtonsProps {
  buttonsInfo: ButtonInfo[];
}

export interface MyAppBarProps {
  position: 'static' | 'fixed' | 'absolute' | 'sticky' | 'relative' | undefined;
  value: any;
  onChange: any;
  label: string[];
}

export interface MyMgtTableBodyProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MyMgtTableBodyRowProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MySocialInsureTableBodyProps {
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  //rowData: any;
  values: string[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MySocialInsureTableCellsProps {
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  row: any;
  values: string[];
}

export interface MyTableBodyProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MyTableBodyRowProps {
  rowData: any;
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MyTableHeadProps {
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MyTableHeadRowProps {
  columns: ColumnProps[];
  //{ id: string; label: string; minWidth: number; align: string }[];
}

export interface MyTabsProps {
  value: any;
  onChange: any;
  label: string[];
}

export interface SelectProps {
  name: { label: string; id?: number; value?: string }[];
  selectonChange?: (event: React.SyntheticEvent, value: any) => void;
}
