import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare var $: any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {
    date: Date = new Date();


    constructor() { }

    ngOnInit() {

    }
}
