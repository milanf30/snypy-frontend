import { Component, OnInit } from '@angular/core';
import { TeamResource, Team } from '../../services/resources/team.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamModalComponent } from '../../modals/team-modal/team-modal.component';
import { ActiveScopeService } from "../../services/navigation/activeScope.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: ResourceModel<Team>[] = [];

  constructor(private teamResource: TeamResource,
              private modalService: NgbModal,
              private activeScopeService: ActiveScopeService,) {
  }

  ngOnInit() {
    this.teamResource.query({}, {}).$promise
      .then((data) => {
        this.teams = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addTeam() {
    const modalRef = this.modalService.open(TeamModalComponent, {size: 'sm'});

    modalRef.result.then((result) => {
      this.teams.push(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  loadTeam(team: ResourceModel<Team>) {
    console.log("Loading team!");
    this.activeScopeService.updateScope({
      area: 'team',
      value: team,
    });
  }

}
