import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskListService } from './../../task-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
export interface TaskElement {
  name: any
  description: any
  date: any
  status: any
  subTasks: []
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {

  taskListData: any = [];
  addTaskBtn!: any;
  taskDataById: any = [];
  dataSource: any = [];

  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay = ['No','name', 'description', 'date', 'status','action'];
  subTaskColumnsToDisplay = ['name', 'description', 'date','action'];
  expandedElement!: TaskElement | null;
  constructor(private router: Router, private taskService: TaskListService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskList()
  }

  taskList() {
    return this.taskService.task().subscribe(res => {
      this.taskListData = res,
      this.dataSource = res
    });
  }

  subTask(id: any) {
    console.log(id)
    const queryParams = {
      addTaskBtn: false,
      id: id
    };
    this.router.navigate(['/subTask/id'], { queryParams: queryParams, skipLocationChange: true });
  }

  edit(id: any) {
    const queryParams = {
      addTaskBtn: true,
      id: id
    };
    this.router.navigate(['/edit/id'], { queryParams: queryParams, skipLocationChange: true });
  }

  //add Task
  addTask() {
    const queryParams = {
      addTaskBtn: true,
    };
    this.router.navigate(['add'], { queryParams: queryParams });
  }

  //delete Task
  deleteTask(id: any) {
    this.taskService.getById(id).subscribe((res) => {
      this.taskDataById = res;
      console.log(this.taskDataById.status)
      this.taskDataById.status = 'inactive';
      console.log(this.taskDataById.status)
      this.taskService.update(id, this.taskDataById).subscribe
        (() => this.taskList())
        this.snackbar.open('Task Inactive Successfully', 'Undo', {
          duration: 3000
        });
    }, (error => {
    }));
  }

  //delete subTask 
  deleteSubTask(parent: any, index: number) {
    parent.subTasks.splice(index, 1)
    this.taskService.update(parent.id, parent).subscribe(() => this.taskList())
    this.snackbar.open('SubTask Deleted Successfully', 'Undo', {
      duration: 3000
    });
  }


  completeTask(id: any) {
    this.taskService.getById(id).subscribe((res) => {
      this.taskDataById = res;
      console.log(this.taskDataById.status)
      this.taskDataById.status = 'complete';
      console.log(this.taskDataById.status)
      this.taskService.update(id, this.taskDataById).subscribe
        (() => this.taskList())
        this.snackbar.open('Task Completed Successfully', 'Undo', {
          duration: 3000
        });
    }, (error => {
    }));
  }

}
