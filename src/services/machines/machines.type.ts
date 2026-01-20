

export type ResponseMachinesByFactory = {
  id: number,
  name: string,
  created_at: string,
  data: Machines[]
}

export type Machines = {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  description: string;
  created_at: string;
  updated_at: string;
  total_registries: number;
  total_value: number;
  last_registry_at: string;
};