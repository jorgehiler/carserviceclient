import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { CastExpr } from '@angular/compiler';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>;
  delete: boolean = false;

  selectedOptions: Array<any>;


  constructor(private ownerService: OwnerService, private carServices: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      let eje =this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/'), this.owners[0]._links.self.href)
      console.log(eje);
      console.log(this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/')).substring(1,3));
      console.log(this.owners);
    });
  }

  updateOwners(){
    this.selectedOptions = []
    this.ownerService.getAll().subscribe(data => {
      console.log("Actualizando owners")
      this.owners = data._embedded.owners;
      let eje =this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/'), this.owners[0]._links.self.href)
      console.log(eje);
      console.log(this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/')).substring(1,3));
      console.log(this.owners);
    });  }

  onNgModelChange(event){
    console.log('on ng model change', event);
  }

  deleteOwners(){
    this.selectedOptions.forEach((owner)=> {
      console.log("borrando", owner._links.self.href)
      console.log(owner)
      this.ownerService.remove(owner._links.self.href).subscribe(result => {
        this.updateOwners();
        //Actualizar autos
        this.carServices.getAll().subscribe( cars => {
          console.log("carros")
          console.log(cars)
          let listCars = cars;
          listCars.find((car)=>{
            if(car.ownerDni==owner.dni){
              console.log("removiendo ", car)
              console.log(`https://thawing-chamber-47973.herokuapp.com/cars/${car.id}`)
              this.carServices.remove(`https://thawing-chamber-47973.herokuapp.com/cars/${car.id}`).subscribe((res)=>{}, err => console.log("Error eliminando" + err));
            }
          })
        })
        
      },
      error => {
        console.log(error)
      }
      )
    })
  }

  deleteList(){
    
  }
}
