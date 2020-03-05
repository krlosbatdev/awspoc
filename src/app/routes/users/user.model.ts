export class User {
  officerId: string;
  fullName: string;
  roleId: number;
  role: Role;
}

export class Role{
  roleId: number;
  roleName: string;
}

export class Employee {
  officerId: string;
  fullName: string;
}

export class UserAccessForm {
  user: User;
  roles: Array<Role> = [];
}
