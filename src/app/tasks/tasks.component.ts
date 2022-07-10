import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  environmentURl: any;

  constructor() { 
    this.environmentURl = environment.apiUrl;
  }

  ngOnInit(): void {
    console.log(this.environmentURl)
  }

}
