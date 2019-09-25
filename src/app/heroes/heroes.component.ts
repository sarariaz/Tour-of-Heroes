import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PowersService } from '../powers.service';
import { Power } from '../power';
import { from } from 'rxjs';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  powers: Power[];

  constructor(private heroService: HeroService,
              private powerService: PowersService
    ) { }

  ngOnInit() {
    this.getHeroes();
  //  this.getPowers();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes; });
    
  }
  //get powers from power service 
  //getPowers(): void {
    //this.powerService.getPowers()
    //.subscribe(powers => {
      //this.powers = powers;
   // });
  //}

  add(name: string, city: string): void {
    name = name.trim();
    if (!name) { return; }
  //  console.log(this.heroes);
    var filterCity = city; //aany wali city hero me aegi
    for(var i=0; i<this.heroes.length; i++){
      if(this.heroes[i].city === filterCity){
        var flag = true;
        console.log("This city is already taken");
        alert("The city you entered is already taken!");
        break;
      }
      
   // console.log(this.heroes[i].city)
    }

    if(flag !== true){  
   // console.log(filterCity);
        this.heroService.addHero({ name, city } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.getHeroes();
      });
    }
  
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}