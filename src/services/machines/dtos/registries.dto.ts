


export type GetRegistriesResponseDto = {
  data: RegistriesDto[]
}


export type RegistriesDto = {
  id: number;
  value: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    isAdmin: boolean;
  };
};
