import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

const routes: Routes = [
  { path: 'upload', component: UploadfileComponent },
  { path: 'auth', loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule) },
  { path: 'post', loadChildren: () => import('./post-module/post-module.module').then(m => m.PostModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
