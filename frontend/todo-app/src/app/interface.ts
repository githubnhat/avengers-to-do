export interface Item {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface TaskList {
  id: string;
  title: string;
  listTask: Task[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface BoardUser {
  id: string;
  userId: string;
  listDashboard: Dashboard[];
}

export interface Message {
  key: 'toast',
  severity: 'warn' | 'success' | 'info' | 'error' | "null",
  summary: 'Warning' | 'Success' | 'Information' | 'Error',
  detail: string
}
