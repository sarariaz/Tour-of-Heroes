import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { PowersService } from '../powers.service';
import { CostumesService } from '../costumes.service';
import { Power } from '../power';

import { from } from 'rxjs';
import { Costume } from '../costume';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  powers: Power[];
  heroPowers : Power[];
  costumes : Power[];
  heroCostume : Costume[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService: PowersService,
    private costumesService: CostumesService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPowers();
    this.getHeroPowers();
    this.getCostumes();
    this.getHeroCostume();
    
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getPowers(): void {
    this.powerService.getPowers()
      .subscribe(powers => this.powers = powers);
  }
// HERO POWER
  getHeroPowers() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.powerService.getHeroPowers(id)
      .subscribe(heroPowers => this.heroPowers = heroPowers);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  addPower(power){
const data = {

       pId: power.id,
       heroId :this.hero.id
   }
    console.log(data);

    if (!power) { 
      console.log("no power given")
      return; }
    this.powerService.addPowerToHero(data)
      .subscribe(power => {
        console.log("power is" + power);
        this.getPowers();
        this.getHeroPowers();
     
      });
    
  }

  deletePowerFromHeroPower(heroPower : any)
  {
    //console.log(heroPower);
    if(!heroPower){
      console.log("No power selected to be deleted");
    }
    this.powerService.deletePowerFromHeroPower(heroPower.hp_id)
    .subscribe( heroPower => {
      this.getPowers();
      this.getHeroPowers();
    });

  }
  //==========================================================================
// To get all costumes
getCostumes(): void {
  this.costumesService.getCostumes()
    .subscribe(costumes => this.costumes = costumes);
}

// To get Costume of a Particular Hero
  getHeroCostume() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costumesService.getHeroCostume(id)
      .subscribe(heroCostume => this.heroCostume = heroCostume);
  }
  delHeroCostume(): void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costumesService.delHeroCostume(id)
      .subscribe(() => this.getHeroCostume());
  }
  
  addCostumeToHero(costume){
    const data = {
    
           cId: costume.id,
           heroId :this.hero.id
       }
        console.log(data);
    
        if (!costume) { 
          console.log("no costume given")
          return; }
        this.costumesService.addCostumeToHero(data)
          .subscribe(costume => {
          //  console.log("costume is" + power);
            this.getCostumes();
            this.getHeroCostume();
         
          });
        
      }
  




}