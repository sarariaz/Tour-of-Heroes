import { Component, OnInit } from '@angular/core';
import { PowersService } from "../powers.service";
import { Power } from '../power';
import { from } from 'rxjs';

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.css']
})
export class PowersComponent implements OnInit {

   powers : Power[];
  constructor(private powersService : PowersService) { }

  ngOnInit() {
    this.getPowers();
  }

  getPowers(): void {
    this.powersService.getPowers()
    .subscribe(powers => {
      this.powers = powers; });
    
  }
 
 addPower(name: string){
   this.powersService.addPower({name} as Power)
   .subscribe(power => {
    this.powers.push(power);
    this.getPowers();
  });
 }

};
