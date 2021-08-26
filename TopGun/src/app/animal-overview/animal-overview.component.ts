import { Component, OnInit } from '@angular/core';
import { AnimalProfileService } from '../Service/animal-profile.service';
import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-overview',
  templateUrl: './animal-overview.component.html',
  styleUrls: ['./animal-overview.component.css']
})
export class AnimalOverviewComponent implements OnInit {
  animales: any;
  ownerId: number;
  constructor(private router: Router, private animalProfileService: AnimalProfileService, private authenticationService: AuthenticationService,) { }
  //animales = this.animalProfileService.getAnimales();
  ngOnInit(): void {
    this.ownerId = this.authenticationService.getDataFromToken('id');
    console.info(this.authenticationService.getToken());
    this.animalProfileService.getAnimales(this.ownerId);


    this.animalProfileService.currentAnimals.subscribe(data => {

      if (data) {
        this.animales = data;
      }

    });

   /*  this.animalProfileService.currentAnimals.subscribe(data => {
      if (data) {
        this.animales = data;
      }
    });  */
  }

  DeleteAnimal(id:number) {
    this.animalProfileService.DeleteAnimal(id);
  }

  EditAnimal(id:string) {
    this.animalProfileService.setAnimalId(id);
    this.router.navigate(['/mainView/animalProfile'])
    //this.router.navigate(['/login']);
  }

}
