import { TaskListService } from './../../task-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addTaskFormGroup!: FormGroup;
  addSubTaskFormGroup!: FormGroup;
  id: any;
  addTaskBtn: any = true;
  taskListData: any = [];
  taskDataById: any = [];

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private taskService: TaskListService,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.intializedForm()
    this.queryParams()
  }

  //if query pass then it will get the details of that id
  queryParams() {
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.addTaskBtn = params['addTaskBtn'];
        if (params['id']) {
          this.intializedSubTasksForm()
          this.id = params['id'];
          this.taskService.getById(this.id).subscribe((res) => {
            this.taskDataById = res
            this.addTaskFormGroup.patchValue(this.taskDataById)
          });
        }
      });
    }
  }


  //get the data of task from db.json
  taskList() {
    this.taskService.task().subscribe((response) => {
      this.taskListData = response;
    }, (error => {

    }));
  }


  //intialized add task form
  intializedForm() {
    this.addTaskFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      subTasks: []
    })
  }

  //intialized add subTask form
  intializedSubTasksForm() {
    this.addSubTaskFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

  }

  //genrate unique id
  uniqueID() {
    return Math.random().toString().slice(5);
  };

  //add new task in db.json 
  addTask() {
    this.addTaskFormGroup.markAllAsTouched();
    if (this.addTaskFormGroup.invalid) {
      return;
    }
    const formValue = this.addTaskFormGroup.value

    const newTask: any = {
      id: this.uniqueID(),
      name: formValue.name,
      description: formValue.description,
      date: formValue.date,
      status: 'pending',
      subTasks: [],
    }
    if(!this.id){
    this.taskService.create(newTask).subscribe((res) => {
      this.taskListData = res
      this.router.navigateByUrl('')
      this.snackbar.open('Task Added Successfully', 'Undo', {
        duration: 3000
      });
    }, (error => {
    }));}
    else{
      this.taskService.update(this.id, formValue).subscribe((res) => {
        this.taskListData = res
        this.router.navigateByUrl('')
        this.snackbar.open('Task Updated Successfully', 'Undo', {
          duration: 3000
        });
      }, (error => {
      }));
    }
  }

  //add new subTask in db.json 
  addSubTask() {
    this.addSubTaskFormGroup.markAllAsTouched();
    if (this.addSubTaskFormGroup.invalid) {
      return;
    }
    const formValue = this.addSubTaskFormGroup.value

    const newSubTask: any = {
      id: this.uniqueID(),
      name: formValue.name,
      description: formValue.description,
      date: formValue.date,
    }
    if (this.id) {
      this.taskService.getById(this.id).subscribe((res) => {
        this.taskDataById = res;
        this.taskDataById.subTasks.push(newSubTask)
        this.taskService.update(this.id, this.taskDataById).subscribe((item) =>
          this.taskListData = item)
        this.router.navigateByUrl('')
        this.snackbar.open('SubTask Added Successfully', 'Undo', {
          duration: 3000
        });
      });
    }
  }


}
