import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  dataSets: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  getDatasets() {
    this.dataSets = this.db.list('/');
    return this.dataSets;
  }
}
