import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  private dialogNameSource = new BehaviorSubject('');
  currentDialogName = this.dialogNameSource.asObservable();

  constructor() { }

  selectDialog(item: string) {
    this.dialogNameSource.next(item);
  }
}
