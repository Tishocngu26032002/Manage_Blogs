import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  selectedFile: File | null = null;
  message: string | null = null;
  url: string | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('http://localhost:3000/upload', formData)
        .subscribe((response: any) => {
          this.message = response.message;
          this.url = response.url;
        }, (error) => {
          this.message = 'Upload thất bại!';
        });
    } else {
      this.message = 'Vui lòng chọn file!';
    }
  }
}
