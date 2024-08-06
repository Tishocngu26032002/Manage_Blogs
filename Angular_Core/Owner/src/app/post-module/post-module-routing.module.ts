import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerPostComponent } from './manager-post/manager-post.component';
import { CreatPostComponent } from './creat-post/creat-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  { path: 'manage-post', component: ManagerPostComponent },
  { path: 'create-post', component: CreatPostComponent },
  { path: 'update/:id', component: UpdatePostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostModuleRoutingModule { }
