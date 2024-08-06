import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { posts } from '../post_service/post.service';
import { CustomUploadAdapter } from '../post_service/upload.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {
  currentTab = "vn";
  id: number = 0;
  EditorVN = ClassicEditor;
  EditorEN = ClassicEditor;
  EditorCN = ClassicEditor;
  category = "";
  titleVN = "";
  contentVN = "";
  titleEN = "";
  contentEN = "";
  titleCN = "";
  contentCN = "";
  status = true;

  postData = {
    postId: this.id,
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

  constructor(private route: ActivatedRoute, private post: posts, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.getData(idParam);
        this.id = +idParam;
        console.log('Update item with id:', this.id);
        // Bạn có thể sử dụng id này để lấy dữ liệu chi tiết từ server hoặc thực hiện các hành động khác
      } else {
        console.log('No id parameter found');
        // Xử lý trường hợp không có id parameter
      }
    });
  }

  getData(id: string) {
    console.log("lấy id", id)
    this.post.getItembyId(id).subscribe(
      res => {
        console.log('Response Data:', res.data);
        this.status = res.data.status;
        this.category = res.data.post_category.category_id;
        for (let i = 0; i < res.data.contentposts.length; i++) {
          if (res.data.contentposts[i].language_id === 1) {
            this.titleVN = res.data.contentposts[i].title;
            this.contentVN = res.data.contentposts[i].content;
          } else if (res.data.contentposts[i].language_id === 2) {
            this.titleEN = res.data.contentposts[i].title;
            this.contentEN = res.data.contentposts[i].content;
          } else if (res.data.contentposts[i].language_id === 3) {
            this.titleCN = res.data.contentposts[i].title;
            this.contentCN = res.data.contentposts[i].content;
          }
        }
      },
      error => console.log(error)
    )
  }

  updatePost() {
    this.postData.postId = this.id;
    this.postData.category = this.category;
    this.postData.status = this.status;
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

    console.log("data", this.postData)

    this.post.updatePost(this.postData).subscribe(
      res => {
        console.log('Response Data:', res);
      },
      error => {
        console.log(error);
      }
    )
  }

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };

}
