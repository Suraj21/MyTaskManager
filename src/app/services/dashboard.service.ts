import { Injectable } from '@angular/core';

@Injectable()

// providedIn: 'root' - commenting ths to restrict the service availability only to admin module
export class DashboardService {

  getTeamMembersSummary():any[]{
    var TeamMembersSummary =[
      {Region:"East", TeamMembersCount:20, TemporarilyUnavailableMembers:4},
      {Region:"West", TeamMembersCount:15, TemporarilyUnavailableMembers:4},
      {Region:"North", TeamMembersCount:10, TemporarilyUnavailableMembers:4},
      {Region:"South", TeamMembersCount:30, TemporarilyUnavailableMembers:4},
    ];
    return TeamMembersSummary
  }
}
