import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css']
})
export class PeriodicTableComponent implements OnInit {
  elementData:PeriodicElement[];
  dataSource = new MatTableDataSource<PeriodicElement>([]);;
  displayedColumns:string[];
  formElement:PeriodicElement; 
  totalElements:number = 0;
  formMode:string = "Create";
  updateIndex:number;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {  
    this.cleanForm();
    
    //static elements object
    this.elementData = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];

    this.totalElements = this.elementData.length;
    this.getTableData();
  }

  cleanForm() {
    this.formElement = {position: 0, name: '', weight: 0, symbol: ''};
    this.formMode = "Create";
  }

  //set table data for angular tables
  getTableData() {
    this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'actions'];
    this.dataSource.data = this.elementData;
  }

  //create a new elements
  addElement() {
    this.totalElements++;
    if(this.formElement.name.length > 0 && this.formElement.weight > 0 && this.formElement.symbol.length > 0) {
      this.elementData.push({
        'position': this.totalElements,
        'name': this.formElement.name,
        'weight': this.formElement.weight,
        'symbol': this.formElement.symbol
      });
      this.cleanForm();
      this.getTableData();
      this.openSnackBar("Element Added.");
    }
  }

  //populate form data in the form right side
  editElement(i:number) {
    this.formMode = "Edit";
    this.formElement = {
      position: this.elementData[i].position, 
      name: this.elementData[i].name, 
      weight: this.elementData[i].weight, 
      symbol: this.elementData[i].symbol
    };
    this.updateIndex = i;
    this.openSnackBar("Element Loaded.");
  }

  //update changed element data
  updateElement() {
    if(this.formElement.name.length > 0 && this.formElement.weight > 0 && this.formElement.symbol.length > 0) {
      this.elementData[this.updateIndex] = {
        'position': this.totalElements,
        'name': this.formElement.name,
        'weight': this.formElement.weight,
        'symbol': this.formElement.symbol
      };
      this.cleanForm();
      this.getTableData();
      this.openSnackBar("Element Updated.");
    }
  }

  //dynamically manage create/edit action
  manageElement() {
    if(this.formMode == "Create") {
      this.addElement();
    } else {
      this.updateElement();
    }
  }

  //delete element from json
  deleteElement(element: any) {
    for(let i = 0; i < this.elementData.length; i++) {
      if(this.elementData[i].position == element.position) {
        this.elementData.splice(i, 1);
      }
    }
    this.getTableData();
    this.openSnackBar("Element Deleted.");
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
