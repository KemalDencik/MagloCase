export interface IActionGroupItem {
    label: string;
    onClick: (arg?: unknown) => void;
    icon?: JSX.Element;
    show?: boolean;
    loading?: boolean;
  }