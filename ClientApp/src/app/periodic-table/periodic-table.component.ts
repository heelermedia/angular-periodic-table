import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
//custom 
import { PeriodicTableModel } from './periodic-table-model';
import { ElementModel } from './element-model';

//observables
import { Observable } from 'rxjs/Rx';
import { fromEvent } from 'rxjs/Observable/fromEvent';

import { EventEmitter } from 'events';


@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent {

  private model: PeriodicTableModel = new PeriodicTableModel();
  private elementDisplayList: ElementModel[] = [];

  @ViewChild('canvas') public canvas: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) { }

  private ctx: CanvasRenderingContext2D;

  public ngAfterViewInit() {

    // get the context
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;

    this.ctx = canvasElement.getContext('2d');

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    this.ctx.fillRect(0, 0, 1920, 1080);

    this.router.navigate(['/He', {}]);

    this.initializeElements();

    this.registerEventHandlers(canvasElement);
  }

  private initializeElements(): void {
    let elements = this.model.elements;
    for (let j = 0; j < elements.length; j++) {
      let elementModel = new ElementModel(elements[j], this.ctx);
      elementModel.drawGraphics();
      elementModel.drawText();
      this.elementDisplayList.push(elementModel);
    }
  }

  private registerEventHandlers(canvasElement: HTMLCanvasElement): void {
    this.renderer.listen(canvasElement, 'mousemove', this.onMouseMove);
  }
  @HostListener('mousemove', ['$event'])


  public onMouseMove(eventObject: MouseEvent): void {
    console.log(eventObject);
    let x = eventObject.pageX;
    let y = eventObject.pageY;
    x -= this.canvas.nativeElement.offsetLeft;
    y -= this.canvas.nativeElement.offsetTop;

    let j = -1;
    while (++j < this.elementDisplayList.length) {
      const element = this.elementDisplayList[j];

    }
  }

  public ngOnDestroy() {
    //TODO: unregister event handlers?
  }
}
