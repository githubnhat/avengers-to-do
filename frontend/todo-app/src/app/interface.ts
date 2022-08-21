export interface Item {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface Page {
  page: number,
  totalPages: number,
  totalItems: number,
  data: Array<Dashboard>,
}

export interface PageResponse {
  status: string,
  message: string,
  data: Page
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  createdBy: string;
  percentDone: number;
  modifiedBy: string;
  modifiedDate: string;
}

export interface TaskList {
  id: number;
  title: string;
  listTask: Task[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
}

export interface Invitation {
  invitationId: number,
  inviter: string,
  invitationTime: string,
  status: "PENDING" | "APPROVED",
  boardName: string
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

export interface MemberInBoard {
  invitationId: number,
  fullName: string,
  joinDate: string,
  inviteDate: string,
  status: "PENDING" | "APPROVED"
}

export interface Member {
  id: number,
  username: string,
  fullName: string
}

