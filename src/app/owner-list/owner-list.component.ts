import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      let eje =this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/'), this.owners[0]._links.self.href)
      console.log(eje);
      console.log(this.owners[0]._links.self.href.slice(this.owners[0]._links.self.href.lastIndexOf('/')).substring(1,3));
      console.log(this.owners);
    });
  }
}
