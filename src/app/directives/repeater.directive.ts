import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeater]'
})
export class RepeaterDirective {

  @Input("appRepeater") n:number;
  //ViewContainerRef - Represents the reference of child view
  //TemplateRef - Represents the reference of Template View
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {
    this.viewContainerRef.clear();
  }

  ngOnInit() {
    for(let i=0; i<this.n; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {$implicit: i});
    }
  }

}
