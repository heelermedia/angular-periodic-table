import { Component,HostBinding } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  @HostBinding('attr.class') class = 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4';
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
