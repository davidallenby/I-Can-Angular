export interface IListData {
  title?: string; // Optional list title
  items: IListItem[]; // Items for the list
}

export interface IListItem {
  text: string;
  url?: string;
  external?: boolean;
}
