import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Editor } from '@ckeditor/ckeditor5-core';
import { CustomUploadAdapter } from '../post_service/upload.service';
import { HttpClient } from '@angular/common/http';
import { posts } from '../post_service/post.service';


@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.css']
})
export class CreatPostComponent implements OnInit {
  EditorVN = ClassicEditor;
  EditorEN = ClassicEditor;
  EditorCN = ClassicEditor;
  currentTab = "vn";
  category = "";
  titleVN = "";
  contentVN = "";
  titleEN = "";
  contentEN = "";
  titleCN = "";
  contentCN = "";
  status = true;

  postData = {
    userid: localStorage.getItem("id"),
    category: this.category,
    status: this.status,
    posts: [
      {
        title: this.titleVN,
        content: this.contentVN,
        languageid: 1
      },
      {
        title: this.titleEN,
        content: this.contentEN,
        languageid: 2
      },
      {
        title: this.titleCN,
        content: this.contentCN,
        languageid: 3
      }
    ]
  }

  constructor(private http: HttpClient, private post: posts) {

  }

  ngOnInit() {
    // Bất kỳ mã khởi tạo nào...
  }

  create() {
    this.postData.posts = [
      {
        title: this.titleVN,
        content: this.contentVN,
        languageid: 1
      },
      {
        title: this.titleEN,
        content: this.contentEN,
        languageid: 2
      },
      {
        title: this.titleCN,
        content: this.contentCN,
        languageid: 3
      }
    ];

    this.postData.category = this.category;
    console.log("categoryL:::::", this.category)
    this.postData.status = this.status;

    this.post.createPost(this.postData).subscribe(
      response => {

        console.log("success", response)
      },
      error => {
        console.error('Error creating post', error);
      }
    );
  }

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };
}
