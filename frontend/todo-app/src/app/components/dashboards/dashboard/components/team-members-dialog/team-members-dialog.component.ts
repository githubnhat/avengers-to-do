import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Dashboard, Member, MemberInBoard } from 'src/app/interface';
import { AuthService } from 'src/app/services/auth.service';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { DashboardService } from '../../../service/dashboard.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-team-members-dialog',
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.scss']
})
export class TeamMembersDialogComponent implements OnInit, OnDestroy {
  @Input() displayTeamMembers: boolean = false;
  @Input() dashboardId: string = ''
  @Output() teamMembersEmitter = new EventEmitter()

  private subscriptions: Subscription[] = []
  public isOwner: boolean = false;
  public displayAddTeamMember: boolean = false;
  public listMembers: MemberInBoard[] = []
  public listMembersCanInvite: Member[] = []
  public addTeamMemberForm!: FormGroup;
  public tableHeaders = [
    {
      field: 'fullName',
      header: 'Full Name',
      className: 'fullName',
      show: true,
    },
    {
      field: 'joinDate',
      header: 'Join Date',
      className: 'joinDate',
      show: true,
    },
    {
      field: 'inviteDate',
      header: 'Invite Date',
      className: 'inviteDate',
      show: true,
    },
    {
      field: 'status',
      header: 'Status',
      className: 'status',
      show: true,
    },
    {
      field: 'actions',
      header: '',
      className: 'actions',
      show: true,
    },
  ];

  constructor(
    private dashBoardService: DashboardService,
    private formBuilder: FormBuilder,
    private handleMessageService: HandleMessageService,
    private authService: AuthService
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(_subscription => {
      _subscription.unsubscribe()
    })
  }

  ngOnInit(): void {
    this.fetchMembers()
  }

  onClose(): void {
    this.teamMembersEmitter.emit(false)
  }
  getUserNameFromToken(): string {
    let token = this.authService.httpHeaders;
    let decoded: any = jwt_decode(token);
    return decoded.userName;
  }

  fetchMembers(): void {
    this.subscriptions.push(
      this.dashBoardService.getDashboardById(this.dashboardId).pipe(switchMap(_dashboard => {
        if (_dashboard.createdBy !== this.getUserNameFromToken()) {
          this.isOwner = false;
        }
        return this.dashBoardService.getTeamMembers(this.dashboardId)
      })).subscribe(_data => {
        this.listMembers = _data
      })
    )
  }
  showAddNewMemberDialog(): void {
    this.addTeamMemberForm = this.formBuilder.group({
      userName: ['', Validators.required]
    }
    )
    this.displayAddTeamMember = true;
  }

  inviteMember(): void {
    const body = {
      boardId: this.dashboardId,
      username: this.addTeamMemberForm.value.userName
    }
    this.subscriptions.push(
      this.dashBoardService.addTeamMembers(body).subscribe(_x => {
        this.addTeamMemberForm.reset()
        this.fetchMembers()
        this.handleMessageService.setMessage({ key: "toast", severity: 'success', summary: 'Success', detail: 'Invite successfully' });
      })
    )
  }
  removeMember(member: MemberInBoard): void {
    this.dashBoardService.removeMemberInBoard(member.invitationId).then(() => {
      this.fetchMembers()
      this.handleMessageService.setMessage({ key: "toast", severity: 'success', summary: 'Success', detail: `${member.fullName} has been removed` });
    })
  }

  onCloseAddTeamMemberDialog(): void {
    this.displayAddTeamMember = false;
  }


}
