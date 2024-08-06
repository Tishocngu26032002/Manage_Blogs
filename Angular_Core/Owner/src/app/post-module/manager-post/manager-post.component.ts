import { Component, OnInit } from '@angular/core';
import { posts } from '../post_service/post.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


interface Category {
  title: string;
}

interface PostCategory {
  category_id: number;
  category: Category;
}

interface ContentPost {
  id: number;
  title: string;
  content: string;
}

interface Item {
  id: number;
  status: string;
  deleted: boolean;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  contentposts: ContentPost[];
  post_category: PostCategory;
}

interface Result {
  title: string;
  content: string;
}

@Component({
  selector: 'app-manager-post',
  templateUrl: './manager-post.component.html',
  styleUrls: ['./manager-post.component.css']
})

export class ManagerPostComponent implements OnInit {
  // font awesome
  search = faSearch;
  edit = faEdit;
  trash = faTrash;
  detail = faInfoCircle;
  // get data for show
  id = localStorage.getItem("id");
  user_id = this.id !== null ? parseInt(this.id) : 0;
  data = { userId: this.user_id };
  lists: Item[] = [];

  // data for detail
  show = false;
  currentTab = "vn";
  category = "";
  titleVN = "";
  contentVN = "";
  titleEN = "";
  contentEN = "";
  titleCN = "";
  contentCN = "";
  status = true;

  constructor(private post: posts, private router: Router) { }

  ngOnInit() {
    this.post.getAll(this.data.userId)
      .subscribe(
        res => {
          console.log('Response Data:', res.data);
          this.lists = res.data;
        },
        error => console.log(error)
      );
  }

  getFirstNonEmptyTitle(contentposts: any[]): string {
    for (const post of contentposts) {
      if (post.title) {
        return post.title;
      }
    }
    return 'No Title';
  }

  getFirstNonEmptyContent(contentposts: any[]): string {
    for (const post of contentposts) {
      if (post.content) {
        return post.content;
      }
    }
    return 'No Content';
  }

  update(id: any) {
    console.log('Update method called with id:', id);
    this.router.navigate(['/post/update', id]);
  }

  detailFunction(id: any) {
    this.show = true;
    console.log('Detail method called with id:', id);
    this.post.getItembyId(id).subscribe(
      res => {
        console.log('Response Data:', res.data);
        this.status = res.data.status;
        this.category = res.data.post_category.category.title;
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

  closeModal() {
    this.show = false;
  }
}
