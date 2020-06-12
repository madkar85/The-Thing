import { Component, OnInit } from '@angular/core';
import { DialogBoxService } from 'src/app/Service/dialog-box.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  popUpOpen = false;

  constructor(private dialogBoxService: DialogBoxService) { }


  ngOnInit(): void {
  }


  openPopUp() {
    this.popUpOpen = true;
  }

  deleteOption() {
    this.popUpOpen = false;
  }

  cancelOption() {
    this.dialogBoxService.selectDialog('');
  }

}
