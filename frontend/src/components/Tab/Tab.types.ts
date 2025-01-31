interface Filter {
  label: string;
  value: string;
}

export type TabListType = Filter[] | readonly Filter[];
