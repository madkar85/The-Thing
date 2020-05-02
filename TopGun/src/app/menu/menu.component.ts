import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  public pathItem: string[] = ['/mainView/aktiebolag', '/mainView/enskildfirma', '/mainView/Banana'];

  ngOnInit() {
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
