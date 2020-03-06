import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-owner',
  templateUrl: './car-owner.component.html',
  styleUrls: ['./car-owner.component.css']
})
export class CarOwnerComponent implements OnInit {

  @Input() ownerDni: string;

  owner: any = {};

  sub: Subscription;

  constructor(private serviceCar: CarService, private ownerService: OwnerService) { }

  ngOnInit() {
    console.log(this.ownerDni);
    if (!(this.ownerDni.length === 0)) {
      this.ownerService.get(this.ownerDni).subscribe((car: any) => {
        if (car) {
          this.owner = car._embedded.owners[0];
        } else {
          console.log(`Car with id '${this.ownerDni}' not found, returning to list`);
          this.owner.name = 'No existe un owner registrado';
          this.owner.dni = "desconocido";
          this.owner.profession = "desconocido";
        }
      }
      );
    } else {
      this.owner.name = 'desconocido';
      this.owner.dni = "desconocido";
      this.owner.profession = "desconocido";
    }

  }

}
