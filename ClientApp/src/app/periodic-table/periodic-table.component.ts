import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// custom
import { PeriodicTableModel } from './periodic-table-model';
import { ElementModel } from './element-model';
// services
import { PeriodicDataModelService } from './periodic-data-model.service';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements AfterViewInit, OnDestroy {
  // json model for the periodic table
  private model: PeriodicTableModel;
  // logical display list for the periodic table
  // this is what we use to figure out which element 
  // we are interacting with on screen
  private elementDisplayList: ElementModel[] = [];
  // make a ref variable for the active route subscriber so we can
  // destroy it in ngOnDestroy
  private routeSubscription: any;
  // reference to the html canvas element
  @ViewChild('canvas') public canvas: ElementRef;
  // the CanvasRenderingContext2D reference
  private ctx: CanvasRenderingContext2D;
  // ctor
  constructor(private periodicDataModelService: PeriodicDataModelService, private route: ActivatedRoute, private router: Router) { }

  public ngAfterViewInit() {
    // set the periodic data model
    this.model = this.periodicDataModelService.getPeridocTableDataModel();



    // set the canvas rendering context
    this.setCanvasRenderingContext2D();

    // set up canvas width and height
    this.initializeCanvasWidthAndHeight();

    // fill the canvas with black
    this.fillBackGround();
    
    // initialize the logical display list
    this.initializeElements();
    // subscribe to changes in the route
    this.routeSubscription = this.route.params.subscribe(params => {
      this.onRouteChanged(params.id);
    });
  }
  // set the canvas rendering context 2d for this component instance
  private setCanvasRenderingContext2D(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  // initialize the canvas width and heigth off the browser window
  private initializeCanvasWidthAndHeight(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    const width = canvasElement.width = window.innerWidth;
    const height = canvasElement.height = window.innerHeight;
  }
  // fill the canvas with a color : black by default
  private fillBackGround(width: number = window.innerWidth, height: number = window.innerHeight): void {
    this.ctx.fillRect(0, 0, width, height);
  }
  // the function to call when the route is changed
  private onRouteChanged(elementId: string): void {
    // look up element via elementId parameter
    const element = this.elementDisplayList.find((e: ElementModel) => {
      return e.elementModel.name === elementId;
    });
    // set the selected element
    this.setSelectedElement(element);
    // use onMouseAction to handle everything else
    // by passing in the x and y values from the element directly
    // shift the x value in by 10 and the y down by 10 plus
    // the offset top since we do not need to
    // account for the mouse y offset when calling onMouseAction
    // in this way
    this.onMouseAction((element.x + 10), (element.y + 10 + this.canvas.nativeElement.offsetTop), true);
  }
  // a function to initialize the logical display list for the
  // periodic table
  private initializeElements(): void {
    // get the elements array from the PeriodicTableModel
    const elements = this.model.elements;
    for (let j = 0; j < elements.length; j++) {
      // for each element create a new instance of the ElementModel
      // and pass in the CanvasRenderingContext2D
      const element = new ElementModel(elements[j], this.ctx);
      // draw this elements graphics
      element.drawGraphics();
      // draw this elements text
      element.drawText();
      // add the element to the logical display list
      this.elementDisplayList.push(element);
    }
  }
  // a function to set the selected element
  private setSelectedElement(element: ElementModel): void {
    let j = -1;
    // loop through the whole list and set is selected to 
    // false for the current isSelected element
    while (++j < this.elementDisplayList.length) {
      const e = this.elementDisplayList[j];
      if (e.isSelected) {
        e.isSelected = false;
      }
    }
    // set the new selected element's isSelected 
    // property to true
    element.isSelected = true;
  }
  // handle onMouseMove for hover effect
  // and onClick from selecting an element
  private onMouseAction(pageX: number, pageY: number, navigate: boolean): void {
    let x = pageX;
    let y = pageY;
    // subtract any left or top offset when the mouse clicks
    // currently the canvas is full screen so this would 
    // come into use if the canvas where within some
    // other larger frame
    x -= this.canvas.nativeElement.offsetLeft;
    y -= this.canvas.nativeElement.offsetTop;
    let j = -1;
    while (++j < this.elementDisplayList.length) {
      const element = this.elementDisplayList[j];
      // perform a hit test within the area of the element
      if ((y >= element.y) && (y <= element.y + element.height) && (x >= element.x) && (x <= element.x + element.width)) {
        // use the navigate flag to short circuit the statement 
        // in the case of a click
        // otherwise use the isWithinElementBounds check to
        // drive the selected element behavior
        if (navigate || element.isWithinElementBounds === false) {
          // track the mouse when it isWithinElementBounds
          // to prevent more than one rendering pass from happening
          element.isWithinElementBounds = true;
          // if the user clicked we navigate
          if (navigate) {
            // so set the selected element
            this.setSelectedElement(element);
            // and update the route via the element's name
            this.router.navigate([`/${element.elementModel.name}`]);
          }
          // clear and re render graphics and text 
          element.clear();
          element.drawGraphics();
          element.drawText();
        }

      } else {
        // if the mouse is within element bounds and
        // the element is not selected re render 
        // the graphics and text when on mouse out
        if (element.isWithinElementBounds && !element.isSelected) {
          element.isWithinElementBounds = false;
          element.clear();
          element.drawGraphics();
          element.drawText();
        }
      }
    }
  }
  // on click handler for the canvas
  public onClick(eventObject: MouseEvent): void {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, true);
  }
  // on mouse move handler for the canvas
  public onMouseMove(eventObject: MouseEvent) {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, false);
  }
  // destroy the route subscription on ngOnDestroy
  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}