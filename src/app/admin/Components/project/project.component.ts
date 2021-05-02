import { Project } from './../../../models/project';
import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;


  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  MySubscription: Subscription;

  hideDetails: boolean = false;

  constructor(public projectsService: ProjectsService) { }

  ngOnInit(): void {
    // this.projectsService.MyObservable.subscribe((hide) => {
    //    this.hideDetails = hide;
    // })
    this.MySubscription = this.projectsService.MySubject.subscribe((hide => {
      this.hideDetails = hide;
    }))
  }

  onEditClick(event, i)
  {
    this.editClick.emit({ event, i });
  }

  onDeleteClick(event, i)
  {
    this.deleteClick.emit({ event, i });
  }

  toggleDetails() {
    this.hideDetails = !this.hideDetails;
  }
  @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent>;
  @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent;
  isAllCheckedChange(b: boolean)
  {
    if(b)
      this.selectionBox.check();
    else
      this.selectionBox.unCheck();
    // if (b)
    // {
    //   for (let i = 0; i < selectionBox.length; i++)
    //   {
    //     selectionBox[i].check();
    //   }
    // }
    // else
    // {
    //   for (let i = 0; i < selectionBox.length; i++)
    //   {
    //     selectionBox[i].unCheck();
    //   }
    // }
  }


  ngOnDestroy() {
    this.MySubscription.unsubscribe();
  }
}
