import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  @Input() index: string;

  constructor() { }

  public test2: any;

  ngOnInit(): void {



  }

  public ngOnDestroy() {

  }


  test() {
 
  }

}
