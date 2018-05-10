import { Injectable } from '@angular/core';

// custom
import { PeriodicTableModel } from './periodic-table-model';

@Injectable()
export class PeriodicDataModelService {

  constructor() { }
  // periodic data model service 
  // returns a new instance of PeriodicTableModel
  public getPeridocTableDataModel(): PeriodicTableModel {
    return new PeriodicTableModel();
  }
}
