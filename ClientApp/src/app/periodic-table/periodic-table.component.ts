import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// custom
import { PeriodicTableModel } from './periodic-table-model';
import { ElementModel } from './element-model';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements AfterViewInit, OnDestroy {
  // todo to sevice
  private model: PeriodicTableModel = new PeriodicTableModel();
  private elementDisplayList: ElementModel[] = [];
  // make a ref variable for the active route subscriber so we can
  // destroy it in ngOnDestroy
  private routeSubscription: any;
  @ViewChild('canvas') public canvas: ElementRef;

  private ctx: CanvasRenderingContext2D;

  constructor(private route: ActivatedRoute, private router: Router) { }

  public ngAfterViewInit() {

    // get the context
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;

    this.ctx = canvasElement.getContext('2d');

    

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    //this.ctx.translate(canvasElement.width / 2, canvasElement.height / 2);
    this.fillBackGround(window.innerWidth, window.innerHeight);

    this.initializeElements();

    this.routeSubscription = this.route.params.subscribe(params => {
        this.onRouteChanged(params.id);
   });
  }

  private fillBackGround(width: number, height: number): void {
    this.ctx.fillRect(0, 0, width, height);
  }

  private onRouteChanged(elementId: string): void {
    // look up element via elementId parameter
    const element = this.elementDisplayList.find((e: ElementModel) => {
      return e.elementModel.name === elementId;
    });
    this.setSelectedElement(element);
    // use onMouseAction to handle everything else
    // by passing in the x and y values from the element directly
    // shift the x value in by 10 and the y down by 10 plus
    // the offset top since we do not need to
    // account for the mouse y offset
    this.onMouseAction((element.x + 10), (element.y + 10 + this.canvas.nativeElement.offsetTop), true);
  }

  private initializeElements(): void {
    const elements = this.model.elements;
    for (let j = 0; j < elements.length; j++) {
      const element = new ElementModel(elements[j], this.ctx);
      element.drawGraphics();
      element.drawText();
      this.elementDisplayList.push(element);
    }
  }

  private setSelectedElement(element: ElementModel): void {
    let j = -1;
    while (++j < this.elementDisplayList.length) {
      const e = this.elementDisplayList[j];
      if (e.isSelected) {
        e.isSelected = false;
      }
    }
    element.isSelected = true;
  }

  private onMouseAction(pageX: number, pageY: number, navigate: boolean): void {
    let x = pageX;
    let y = pageY;
    x -= this.canvas.nativeElement.offsetLeft;
    y -= this.canvas.nativeElement.offsetTop;
    let j = -1;
    while (++j < this.elementDisplayList.length) {
      const element = this.elementDisplayList[j];
      // perform a hit test withing the area of the element
      if ((y >= element.y) && (y <= element.y + element.height) && (x >= element.x) && (x <= element.x + element.width)) {
        // use the navigate flag to short circuit the statement in the
        // case of a click
        // otherwise use the isWithinElementBounds check to
        // drive the selected element behavior
        if (navigate || element.isWithinElementBounds === false) {
          element.isWithinElementBounds = true;
          if (navigate) {
            this.setSelectedElement(element);
            this.router.navigate([`/${element.elementModel.name}`]);
          }
          element.clear();
          element.drawGraphics();
          element.drawText();
        }

      } else {
        // if the mouse if within element bounds and
        // the element is not selected re render the graphics and text
        if (element.isWithinElementBounds && !element.isSelected) {
          element.isWithinElementBounds = false;
          element.clear();
          element.drawGraphics();
          element.drawText();
        }
      }
    }
  }

  public onClick(eventObject: MouseEvent): void {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, true);
  }

  public onMouseMove(eventObject: MouseEvent) {
   this.onMouseAction(eventObject.pageX, eventObject.pageY, false);
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}