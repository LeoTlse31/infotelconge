import { Component, OnInit } from '@angular/core';
import { CongeService } from '../services/conge.service';
import { Router } from '@angular/router';
import {Motif} from '../Motif';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  filteredItems: any[];
  pages = 4;
  pageSize = 5;
  pageNumber = 1;
  currentIndex = 1;
  items: any[];
  pagesIndex: Array<number>;
  pageStart = 1;
  inputName = '';
  currentUser: any = {};
  historiqueConge: any;
    motif = new Motif();
  loading = false;
  constructor(private congeService: CongeService, private router: Router) {

   }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllConges();
    this.init();
  }

  
  init() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;
    if (this.filteredItems) {
      this.pageNumber = parseInt('' + (this.filteredItems.length / this.pageSize));
      if (this.filteredItems.length % this.pageSize !== 0) {
        this.pageNumber++;
      }

      if (this.pageNumber < this.pages) {
        this.pages = this.pageNumber;
      }
      this.refreshItems();
    }
  }

  refreshItems() {
    this.filteredItems = this.filteredItems.sort((a: any, b: any) =>
    new Date(a.dateDeb).getTime() - new Date(b.dateDeb).getTime()
  );
    this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }

  fillArray(): any {
    const obj = new Array();
    for (let index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }

  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }

  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

  getAllConges() {
    this.loading = true;

    if (this.congeService.getAll(this.currentUser.id)) {
      this.loading = false;
      this.historiqueConge = this.congeService.getAll(this.currentUser.id);
      this.filteredItems = this.historiqueConge;
    } else {
      this.loading = false;
    }

  }


  updateConge(id: number) {
    console.log(id);
    this.router.navigate(['saisie', { id: id }]);
  }
}
