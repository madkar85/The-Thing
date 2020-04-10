import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/Service/calculation.service';
import { CalculationInput } from 'src/app/model/calculation-input';


@Component({
  selector: 'app-aktiebolag',
  templateUrl: './aktiebolag.component.html',
  styleUrls: ['./aktiebolag.component.css']
})
export class AktiebolagComponent implements OnInit {

  constructor(private calculationService: CalculationService) { }

  public calculationInput: CalculationInput = CalculationInput.empty();

  ngOnInit() {
  }

  public startCalculation(){
    this.calculationService.getAktieBolag(this.calculationInput).subscribe((res) => {

      console.info(res);

    });
  }

}
