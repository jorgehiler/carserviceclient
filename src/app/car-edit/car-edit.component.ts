import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  
  car: any = {};
  owner: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private ownerService: OwnerService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.car = {name: "Carrito"}
    this.owner = {dni: "5555", name: "nameOwner", profession: "Profession"}
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            console.log("giphy", this.car.href)
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
            this.ownerService.get(car.ownerDni).subscribe((owner: any) => { 
              console.log("kjsfsfdsfsd")
              console.log(owner);
              this.owner = owner;
              this.owner = this.owner._embedded.owners[0];
              console.log("kjes")
              console.log(this.owner);
            })
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);  
  }

  save(form: any) {
    let car = {name: form.nameCar, ownerDni: form.dni, href: form.href};
    let owner = {dni: form.dni, profession: form.proffesion, name: form.nameOwner}
    this.carService.save(car).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
    this.ownerService.save(owner).subscribe( result => {
      
    })
  }

  //remover auto con href
  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

