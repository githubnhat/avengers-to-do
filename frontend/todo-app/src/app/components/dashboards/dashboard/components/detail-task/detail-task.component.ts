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
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

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
    private commentService: CommentService,
    private authService: AuthService
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
    });
    this.displayDetailTask = false;
    location.reload();
  }

  comment() {
    let token = this.authService.httpHeaders;
    let decoded: any = jwt_decode(token);

    let body = {
      fullName: decoded.fullName,
      content: this.content,
      taskId: this.taskId,
    };


    this.commentService.comment(body).subscribe((res) => {
      this.fetchCommentData();
    });
  }
  fetchCommentData() {
    this.taskService.getTaskDetail(this.taskId).subscribe((data) => {
      this.commentArray = data.comments;
    });
  }
  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.detailTaskEmitter.unsubscribe();
  }
}
