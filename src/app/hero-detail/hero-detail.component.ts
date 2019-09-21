import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { PowersService } from '../powers.service';
import { Power } from '../power';

import { from } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  powers: Power[];
  heroPowers : Power[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService: PowersService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPowers();
    this.getHeroPowers();
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


  addPowerToHero(power: Power): void {
    console.log("clicked in add power func")
    const id = +this.route.snapshot.paramMap.get('id');
    const data = {
      power_id : power.id,
      hero_id : id
    }
    // console.log("Hero id is " + id);
    // console.log("Power id is " + power.id)
    if (!power) { 
      console.log("no power given")
      return; }
    this.powerService.addPowerToHero(data)
      .subscribe(power => {
        console.log("power is" + power)
     
      });
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
}