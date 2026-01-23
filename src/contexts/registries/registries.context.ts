import { RegistriesDto } from "@/services/machines/dtos/registries.dto";
import { createContext } from "react";


type RegistriesGetterType = {
  data: RegistriesDto[] | null
  loading: boolean
  isError: boolean
  fetch: (token?: string | null, machineId?: number | null,) => Promise<void>
}

type RegistriesSetterType = {
  loading: boolean
  isError: boolean
  insert: (value: number, token?: string | null, machineId?: number | null) => Promise<void>
}

export type RegistriesContextData = {
  registriesGetter: RegistriesGetterType
  registriesSetter: RegistriesSetterType
}


export const RegistriesContext = createContext<RegistriesContextData>({} as RegistriesContextData)