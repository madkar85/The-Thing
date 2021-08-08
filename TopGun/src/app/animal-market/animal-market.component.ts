import { Component, OnInit } from '@angular/core';
import { AnimalProfileService } from '../Service/animal-profile.service';

@Component({
  selector: 'app-animal-market',
  templateUrl: './animal-market.component.html',
  styleUrls: ['./animal-market.component.css']
})
export class AnimalMarketComponent implements OnInit {
  animales: any;
  constructor(private animalProfileService: AnimalProfileService) { }

  ngOnInit(): void {
    this.animalProfileService.getAllAnimales();
    this.animalProfileService.allCurrentAnimals.subscribe(data => {
      if (data) {
        this.animales = data;
      }
    });
  }

}
