import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invitation } from 'src/app/interface';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { DashboardService } from '../dashboards/service/dashboard.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []
  public listInvitations: Invitation[] = []
  public tableHeaders = [
    {
      field: 'inviter',
      header: 'Inviter',
      className: 'inviter',
      show: true,
    },
    {
      field: 'invitationTime',
      header: 'Invitation Time',
      className: 'invitationTime',
      show: true,
    },
    {
      field: 'boardName',
      header: 'Board Name',
      className: 'boardName',
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
    private handleMessageService: HandleMessageService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(_x => {
      _x.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.fetchInvitations()
  }

  fetchInvitations() {
    this.subscriptions.push(
      this.dashBoardService.getInvitationsOfUser().subscribe(_invitations => {
        console.log('invite', _invitations)
        // this.listInvitations = _invitations.filter((item) => item?.status == 'PENDING')
        this.listInvitations = _invitations
      })
    )
  }

  acceptInvitation(invitation: Invitation): void {

    const body = {
      invitationId: invitation.invitationId,
      status: 'APPROVED'
    }

    this.dashBoardService.updateInvitation(body).then(() => {
      this.handleMessageService.setMessage({
        key: 'toast',
        severity: 'success',
        summary: 'Success',
        detail: 'Accepted successfully',
      });
      this.fetchInvitations()
    })
  }

  rejectInvitation(invitation: Invitation): void {
    const body = {
      invitationId: invitation.invitationId,
      status: 'REJECTED'
    }
    this.dashBoardService.updateInvitation(body).then(() => {
      this.handleMessageService.setMessage({
        key: 'toast',
        severity: 'success',
        summary: 'Success',
        detail: 'The invitation has been rejected',
      });
      this.fetchInvitations()
    })

  }


}
