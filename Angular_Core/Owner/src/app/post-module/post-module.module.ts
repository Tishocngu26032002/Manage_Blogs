import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostModuleRoutingModule } from './post-module-routing.module';
import { PostModuleComponent } from './post-module.component';
import { ManagerPostComponent } from './manager-post/manager-post.component';
import { CreatPostComponent } from './creat-post/creat-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdatePostComponent } from './update-post/update-post.component';


@NgModule({
  declarations: [
    PostModuleComponent,
    ManagerPostComponent,
    CreatPostComponent,
    SidebarComponent,
    UpdatePostComponent
  ],
  imports: [
    CommonModule,
    PostModuleRoutingModule,
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ]
})
export class PostModuleModule { }
