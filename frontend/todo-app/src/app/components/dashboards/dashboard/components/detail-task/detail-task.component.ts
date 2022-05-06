import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';

import { Message, TaskList } from 'src/app/interface';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { CommentService } from '../../../service/comment.service';
import { TaskService } from '../../../service/task.service';
import { Task } from './model/detail-task';
@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss'],
})
export class DetailTaskComponent implements OnInit, OnDestroy {
  @Input() taskId!: string;
  @Input() displayDetailTask!: boolean;
  @Output() detailTaskEmitter = new EventEmitter();
  task!: Task;
  content: string = '';
  status: any[] = [
    { statusTask: 'YES', value: true },
    { statusTask: 'NO', value: false },
  ];
  commentArray: any[] = [];
  checked: boolean = true;
  setStatus: any;
  constructor(
    private taskService: TaskService,
    private handleMessageService: HandleMessageService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    if (this.taskId) {
      this.taskService.getTaskDetail(this.taskId).subscribe((data) => {
        this.task = data;
        this.commentArray = this.task.comments;
        this.checked = data.isDone;
      });
    }
  }

  closeTaskDetail() {
    this.detailTaskEmitter.emit(false);
  }

  doneTask(task: Task): void {
    const body = {
      taskId: task.id,
      isDone: !task.isDone,
    };
    let message: Message = {
      detail: 'Updated successfully',
      key: 'toast',
      severity: 'success',
      summary: 'Success',
    };
    this.taskService.doneTask(body).then(() => {
      task.isDone = body.isDone;
      this.handleMessageService.setMessage(message);
    });
  }
  saveDetailTask() {
    let body = {
      taskId: this.taskId,
      name: this.task.name,
      description: this.task.description,
      isDone: this.checked,
    };
    this.taskService.updateTaskDetail(body).subscribe((res) => {
      console.log(res);
    });
    this.displayDetailTask = false;
    location.reload();
  }
  comment() {
    let body = {
      content: this.content,
      taskId: this.taskId,
    };
    this.commentService.comment(body).subscribe((res) => {
      location.reload();
    });
  }
  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.detailTaskEmitter.unsubscribe();
  }
}
