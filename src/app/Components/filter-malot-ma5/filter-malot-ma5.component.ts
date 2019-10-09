import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-malot-ma5',
  templateUrl: './filter-malot-ma5.component.html',
  styleUrls: ['./filter-malot-ma5.component.css']
})
export class FilterMalotMa5Component implements OnInit {

  @Input() dataSet: any;
  @Input() searchText: string;  
  @Input() maxLen: number;
  @Output() typeahead: EventEmitter<any> = new EventEmitter();
  filterSet: any;
  isVisible: boolean;
  isCursorOverFilterSet: boolean;
  isArryDataSet: boolean; 
  constructor() { 
    this.dataSet = this.dataSet || [];
    this.searchText = this.searchText || '';
    this.maxLen = this.maxLen || 5;
    this.filterSet = [];
    this.isVisible = false;

  }
  ngOnInit() {
  }
  onSearch(event: any) {  
      if(this.searchText.length > 0) {
        this.filterSet = this.dataSet.filter((item) => {        
            return item
                  .toLowerCase()
                  .indexOf(this.searchText.toLowerCase()) > -1        
        });
  
        this.filterSet = this.filterSet.slice(0, this.maxLen);
        this.showList();
      } else {
        this.filterSet = [];
      } 
  }

  hideList() {
    if(this.isCursorOverFilterSet != true) {
      this.isVisible = false;
    }    
  }

  showList() {
      if(this.searchText.length > 0){
        this.isVisible = true;
      }
  }

  cursorOverSet() {
    this.showList();
    this.isCursorOverFilterSet = true;
  }

  setValue(value: any) {
    this.searchText = value;
    this.filterSet = [];    
    this.filterSet.push(value);
    this.isCursorOverFilterSet = false;
    this.hideList();
    this.typeahead.emit(this.searchText);
  }
  save(event: any){
    this.searchText=this.filterSet[0];
    this.isCursorOverFilterSet = false;
    this.hideList();
    this.typeahead.emit(this.searchText);
  }
}
