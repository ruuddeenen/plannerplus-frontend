export interface Employee {
    uuid: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    gender: number;
    place: string;
    bio: string;
    role: Role;
}

export enum Role {
  EMPLOYEE,
  MANAGER
}
