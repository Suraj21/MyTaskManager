import { Directive, ElementRef, Input, OnInit, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective implements OnInit{

  @Input("error") error:string;
  @HostBinding("title") title: string;

  constructor(private elementRef: ElementRef, private renderer2 :Renderer2) { }

  divElement: any;
  spanElement: any;
  spanText: any;

  ngOnInit() {
    this.divElement = this.renderer2.createElement("div");
    this.renderer2.setAttribute(this.divElement, "role", "alert");
    this.renderer2.setAttribute(this.divElement, "class","alert alert-danger fade show");
    this.renderer2.setStyle(this.divElement, "transform","transform 0.5s");
    this.spanElement = this.renderer2.createElement("span");
    this.renderer2.setAttribute(this.spanElement, "class","message");

    this.spanText = this.renderer2.createText(this.error);
    this.renderer2.appendChild(this.spanElement,this.spanText);

    this.renderer2.appendChild(this.divElement, this.spanElement);
    this.elementRef.nativeElement.appendChild(this.divElement);

    // this.elementRef.nativeElement.innerHTML = `
    //   <div class="alert alert-danger fade show" role=:alert style="transform:transform 0.5s">
    //       <span>${this.error}</span>
    //   </div>
    // `;

    this.title="Please try again!";
  }

  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event){

    // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.1)";
    this.renderer2.setStyle(this.divElement, "transform","scale(1.1)");
  }

  @HostListener("mouseleave")
  onMuseLeave() {
    // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
    this.renderer2.setStyle(this.divElement, "transform","scale(1)");
  }

}
