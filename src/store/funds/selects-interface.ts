export interface Selects {
  organizations: [
    {
      id: string;
      name: string;
    }
  ];
  grants: [
    {
      id: string;
      name: string;
    }
  ];
}

export interface Organizations {
  id: string;
  name: string;
}
export interface Grants {
  id: string;
  name: string;
}
