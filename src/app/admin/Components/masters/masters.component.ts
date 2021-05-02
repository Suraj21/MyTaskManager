import { ComponentLoaderDirective } from './../../../directives/component-loader.directive';
import { Component, ComponentFactoryResolver, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  masterMenuItems = [
    { itemName: "Countries", displayName: "Countries", component: CountriesComponent },
    { itemName: "ClientLocations", displayName: "Client Locations", component: ClientLocationsComponent },
    { itemName: "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent },
    { itemName: "TaskStatus", displayName: "Task Status", component: TaskStatusComponent },
  ];

  activeItem:string;
  tabs = [];
  @ViewChildren(ComponentLoaderDirective) componentLoaders: QueryList<ComponentLoaderDirective>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  menuItemClick(clickedMasterMenuItem: any) {
    this.activeItem = clickedMasterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab) => {
      return tab.itemName == clickedMasterMenuItem.itemName
    });

    if(matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex: this.tabs.length,
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName
      });
    }

    setTimeout(()=>{
      var componentLoadersArray = this.componentLoaders.toArray();
      console.log("this.componentLoaders.toArray()", this.componentLoaders.toArray());
      var componentFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMasterMenuItem.component);
      if(viewContainterRef) {

      var viewContainterRef = componentLoadersArray[this.tabs.length - 1].viewContainerRef;

        var componentRef = viewContainterRef.createComponent(componentFactory);

        this.tabs[this.tabs.length - 1].viewContainerRef = viewContainterRef;

        if (clickedMasterMenuItem.component.name == "CountriesComponent")
        {
          var componentInstance = componentRef.instance as CountriesComponent;
          // componentInstance.message = "Hello to Countries";
        }
      }

      console.log(componentLoadersArray);
    },1000)

  }

  onCloseClick(clickedTab: any)
  {
    clickedTab.viewContainerRef.remove();
    this.tabs.splice(this.tabs.indexOf(clickedTab), 1);
    if (this.tabs.length > 0)
    {
      this.activeItem = this.tabs[0].itemName;
    }
  }

}
