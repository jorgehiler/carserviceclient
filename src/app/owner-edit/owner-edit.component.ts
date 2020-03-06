import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owener: any = {href: "no"};


  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
            ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ownerService.get(id).subscribe((car: any) => {
          console.log(`id: ${id}`)
          if (car) {
            this.owener = car._embedded.owners[0];
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }

          this.owener = car._embedded.owners[0];
          console.log("owner", this.owener);
          console.log("name", this.owener.name)
          console.log("href",this.owener._links.self.href )

        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: any) {
    let owner;
    
    if(!this.owener.href){
      owner = {dni: form.dni, name: form.name, profession: form.profession, href: this.owener._links.self.href}
    } else {
      owner = {dni: form.dni, name: form.name, profession: form.profession}

    }
    console.log("Guardadndo owner edit")
    console.log(owner);
    this.ownerService.save(owner).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
