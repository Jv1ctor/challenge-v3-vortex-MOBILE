
export type MachineByFactDto = {
  factory_id: number,
  factory_name: string,
  factory_created_at: string,
  data: MachinesDto[]
}

export type MachineByFactResDto = {
  id: number;
  name: string;
  created_at: string;
  data: MachinesDto[];
};
export type MachinesDto = {
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
