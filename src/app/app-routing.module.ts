import { TasksComponent } from './tasks/tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './tasks/add/add.component';

const routes: Routes = [
  {path: '', component:TasksComponent},
  {path: 'add', component:AddComponent},
  {path: 'subTask/:id', component:AddComponent},
  {path: 'edit/:id', component:AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
