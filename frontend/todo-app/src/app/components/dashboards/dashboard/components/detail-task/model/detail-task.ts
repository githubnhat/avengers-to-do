export class Task {
  id!: number;
  name!: string;
  description!: string;
  comments!: [{ fullName: string; content: string; createdDate: string }];
  isDone!: boolean;
}
