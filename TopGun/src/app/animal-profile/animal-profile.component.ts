import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Animal } from '../model/animal';
import { AuthenticationService } from '../Service/authentication.service';
import { NgModule } from '@angular/core';
import { AnimalProfileService } from '../Service/animal-profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UploadFilesService } from '../service/upload-files.service';
@Component({
  selector: 'app-animal-profile',
  templateUrl: './animal-profile.component.html',
  styleUrls: ['./animal-profile.component.css']
})
export class AnimalProfileComponent implements OnInit {

  @ViewChild('animalForm', { static: false }) animalForm: NgForm;
  public model: any = Animal.empty();
  public originalAnimal: Animal = Animal.empty();
  public successMessage: string;
  public showSuccessful = true;
  public id: string;
  public ownerSocialSecurityNumber: string;
  type: any;
  selectedFiles: FileList;
  public animalId: any;
  public dogPictureLabel: string;
  public cerficatePictureLabel: string;

  //public model: Animal;

  /*heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];*/
  /*types = [
    {id: '1', type:'Hund'},
    {id: '2', type:'Katt'}
  ];*/
  //type = {id: '1', type:'Hund'};
  /*breed = [
    {id: '1', type:'Tax'},
    {id: '2', type:'Pudel'}
  ];*/
  //types = ['Hund', 'Katt', 'kannin'];

  public types: any
  public breeds: any
  public genders: any
  //sizes = ['Lite', 'Mellan', 'Stor'];
  sizes = [
    { id: '1', value: 'Lite' },
    { id: '2', value: 'Mellan' },
    { id: '4', value: 'Stor' }
  ];

  users = [
    { id:1,socialSecurityNumber: "198805199299", name:"Marco Villegas" },
    { id:2,socialSecurityNumber:"198805199299", name:"Edwin Villegas" }
  ];


  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, 
    private animalProfileService: AnimalProfileService, 
    private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
    //this.type = this.breed[0]; 
    this.dogPictureLabel = "Hundens bild";
    this.cerficatePictureLabel = "Sertifikats bild";

    if (this.animalProfileService.existAnimalId()) {
      //this.animalProfileService.getAnimalTypes();
      this.animalProfileService.currentAnimalId.subscribe(id => 
        {if(id){
          this.animalId = id;
        }});
      //this.animalProfileService.setAnimalId("0");
    }
    /*this.route.paramMap.subscribe(params => {
      this.animalId = params.get('animalId');
    });*/

    if (!this.animalProfileService.exictTypes()) {
      this.animalProfileService.getAnimalTypes();
    }

    this.animalProfileService.currentTypes.subscribe(typesData => {
      if (typesData) {
        this.types = typesData;
      }

    });

    if (!this.animalProfileService.existBreeds()) {
      this.animalProfileService.getAnimalBreeds();
    }
    this.animalProfileService.currentBreeds.subscribe(breedsData => {
      if (breedsData) {
        this.breeds = breedsData;
      }

    });

    if (!this.animalProfileService.existGenders()) {
      this.animalProfileService.getAnimalGenders();
    }
    this.animalProfileService.currentGenders.subscribe(gendersData => {
      if (gendersData) {
        this.genders = gendersData;
      }

    });

    if (this.animalId != 0 && this.animalId != null) {
      this.animalProfileService.currentAnimals.subscribe(animalsData => {

        if (animalsData) {
          this.model = animalsData.find(x => x.id == this.animalId);
        }

      });
    }else{
      this.model.ownerId = Number(this.authenticationService.getDataFromToken('id'));
    }
    
    this.ownerSocialSecurityNumber = this.authenticationService.getDataFromToken('sub');
  }

  saveAnimal() {
    //this.model.ownerId = Number(this.id);
    this.uploadFilesService.saveUpload(this.animalId );
    this.model.ownerSocialSecurityNumber = this.ownerSocialSecurityNumber;
    this.animalProfileService.saveAnimalProfile(this.model).subscribe({
      next: (updatedAnimal: Animal) => {
        this.showSuccessful = false;
        this.successMessage = 'Uppgifter har sparats';
        this.animalForm.form.markAsPristine();
        // reload the profile from server. We are alredy listening for changes in user
        setTimeout(() => {
          this.showSuccessful = true;
          this.successMessage = '';
        }, 6000);
      }
    });
  }

  selectedFileItem(selectFile: FileList) {
    this.selectedFiles = selectFile;
    if (this.selectedFiles.length > 0) {
      let reader = new FileReader();
      let file = this.selectedFiles[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.photo = reader.result
      }
    }
  }

  downloadLink(image: any, nameLabel: string) {

    let documentName = "";

    if(nameLabel == this.dogPictureLabel){
      documentName = "picture_" + this.model.name;
    }
    
    if(nameLabel == this.cerficatePictureLabel){
      documentName = "sertificate_" + this.model.name;
    }

    let photoList = image.split(",");

    let byteCharacters = atob(photoList[1]);

  let byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  let byteArray = new Uint8Array(byteNumbers);

  let blob = new Blob([byteArray], {"type": "image/jpeg"});
  let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = documentName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

  }
    
  selectedCertificateFileItem(selectFile: FileList) {
      this.selectedFiles = selectFile;
      if (this.selectedFiles.length > 0) {
        let reader = new FileReader();
        let file = this.selectedFiles[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.model.certificate = reader.result
        }
      }
  }

}
