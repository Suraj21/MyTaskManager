import { ClientLocation } from "./client-location";

export class Project {
  projectID:number;
  projectName:string;
  dateOfStart: string;
  teamSize:number;
  active: boolean;
  status: string;
  clientLocationID: number;
  clientLocation: ClientLocation;

  constructor() {
    this.projectID = 0;
    this.projectName = null;
    this.dateOfStart = null;
    this.teamSize = 0;
    this.active = true;
    this.status = null;
    this.clientLocationID = null;
    this.clientLocation = new ClientLocation();
  }

}
