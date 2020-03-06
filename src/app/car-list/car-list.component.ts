import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owner

  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.cars = [{name: "Jorge Hiler", id: "123456", ownerDni:"000000", giphyUrl:""},{name: "Jorge Hiler", id: "123456", ownerDni:"000000", giphyUrl:""},{name: "Jorge Hiler", id: "123456", ownerDni:"000000", giphyUrl:""},{name: "Jorge Hiler", id: "123456", ownerDni:"000000", giphyUrl:""}]
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }
}
