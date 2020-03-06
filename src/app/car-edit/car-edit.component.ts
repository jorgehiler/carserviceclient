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
  owner: any = { dni: "", name: "", profession: "" };

  sub: Subscription;
  avalibleField: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private ownerService: OwnerService,
    private giphyService: GiphyService) {
    this.owner = { dni: "", name: "", profession: "" };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            console.log("giphy", this.car.href)
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
            console.log(car)
            console.log("consultando owner con dni ", car.ownerDni)
            this.ownerService.get(car.ownerDni).subscribe((owner: any) => {
              if (owner._embedded.owners[0]) {
                this.owner = owner;
                this.owner = this.owner._embedded.owners[0];
                this.avalibleField = true;
              } else {
                this.owner = { dni: "", name: "", profession: "" };
              }
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
    let car = { name: form.nameCar, ownerDni: form.dni, href: form.href };
    let owner = { dni: form.dni, profession: form.proffesion, name: form.nameOwner }
    this.carService.save(car).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
    if(!this.avalibleField){
      this.ownerService.save(owner).subscribe(result => {
      })
    }

  }

  //remover auto con href
  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }


  onSearchOwner(searchValue: string): void {
    console.log(searchValue);
    this.ownerService.get(searchValue).subscribe((owner: any) => {
      if (owner._embedded.owners[0]) {
        let an = owner._embedded.owners[0];
        this.owner.name = an.name;
        this.owner.profession = an.profession;
        this.avalibleField = true;
      } else {
        this.avalibleField = false;
        this.owner.name = "";
        this.owner.profession ="";
        console.log("no ha")
      }
    })
  }
}
