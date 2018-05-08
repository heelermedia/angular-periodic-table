import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @HostBinding('attr.class') class = 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4';
}
