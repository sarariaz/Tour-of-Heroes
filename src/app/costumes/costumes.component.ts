import { Component, OnInit } from '@angular/core';
import { Costume } from '../costume';
import { from } from 'rxjs';
import { CostumesService } from '../costumes.service';

@Component({
  selector: 'app-costumes',
  templateUrl: './costumes.component.html',
  styleUrls: ['./costumes.component.css']
})
export class CostumesComponent implements OnInit {
  
   costumes : Costume[];
  constructor(private costumesService : CostumesService) { }

  ngOnInit() {
     this.getCostumes();
  }

  getCostumes(): void {
    this.costumesService.getCostumes()
    .subscribe(costumes => {
      this.costumes = costumes; });
    
  }

  addNewCostume(name: string){
    this.costumesService.addNewCostume({name } as Costume)
    .subscribe(costume => {
      this.costumes.push(costume);
      this.getCostumes();
    });

  }

  delCostume(costume: Costume): void {
    this.costumes = this.costumes.filter(h => h !== costume);
    this.costumesService.delCostume(costume).subscribe();
  }
  
}
