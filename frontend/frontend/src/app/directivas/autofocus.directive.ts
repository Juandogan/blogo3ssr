import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  constructor(private el:ElementRef) {
    if (!el.nativeElement['focus']) {
      throw new Error('Element does not accept focus.');
    }
   }
   ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
    window.scroll(0,0)
  }

}
