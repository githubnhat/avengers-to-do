export interface Item {
  id: string;
  name: string;
  description: string;
  created_date: string;
  create_by: string;
  modified_date: string;
  modified_by: string;
}

export interface Dashboard {
  id: string,
  name: string,
  description: string,
  created_date: string;
  create_by: string;
}


export interface TaskList {
  id: string,
  title: string,
  listTask: Task[]
}

export interface Task {
  id: string,
  name: string,
  description: string,
}
