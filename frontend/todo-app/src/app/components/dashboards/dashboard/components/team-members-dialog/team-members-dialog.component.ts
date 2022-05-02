import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member, MemberInBoard } from 'src/app/interface';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-team-members-dialog',
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.scss']
})
export class TeamMembersDialogComponent implements OnInit {
  @Input() displayTeamMembers: boolean = false;
  @Input() dashboardId: string = ''
  @Output() teamMembersEmitter = new EventEmitter()

  private subscriptions: Subscription[] = []
  public displayAddTeamMember: boolean = false;
  public listMembers: MemberInBoard[] = []
  public listMembersCanInvite: Member[] = []
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
  ];

  public tableAddMemberHeaders = [
    {
      field: 'username',
      header: 'Username',
      className: 'username',
      show: true,
    },
    {
      field: 'fullName',
      header: 'Full Name',
      className: 'fullName',
      show: true,
    },
    {
      field: 'action',
      header: '',
      className: 'action',
      show: true,
    },
  ]
  constructor(
    private dashBoardService: DashboardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchMembers()
  }

  onClose(): void {
    this.teamMembersEmitter.emit(false)
  }

  fetchMembers(): void {
    this.subscriptions.push(
      this.dashBoardService.getTeamMembers(this.dashboardId).subscribe(_data => {
        this.listMembers = _data
      })
    )
  }
  showAddNewMemberDialog(): void {
    this.subscriptions.push(
      this.dashBoardService.getMembersCanInvite(this.dashboardId).subscribe(_data => {
        this.listMembersCanInvite = _data
      })
    )
    this.displayAddTeamMember = true;
  }

  onCloseAddTeamMemberDialog(): void {
    this.fetchMembers()
  }


}
