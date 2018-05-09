import { Injectable } from '@angular/core';

// custom
import { PeriodicTableModel } from './periodic-table-model';

@Injectable()
export class PeriodicDataModelService {

  constructor() { }

  public getPeridocTableDataModel(): PeriodicTableModel {
    return new PeriodicTableModel();
  }
}
