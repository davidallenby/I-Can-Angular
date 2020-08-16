export interface Owner {
  name: string;
  gender: string;
  age: number;
  pets: IPet[];
}

export interface IPet {
  name: string;
  type: string;
}
