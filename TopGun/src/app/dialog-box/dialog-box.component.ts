import { Component, OnInit } from '@angular/core';
import { DialogBoxService } from '../Service/dialog-box.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  dialogName: string;

  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit(): void {

    this.dialogBoxService.currentDialogName.subscribe(name => this.dialogName = name);

  }

}
