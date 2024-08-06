import { FileLoader } from '@ckeditor/ckeditor5-upload';
import { HttpClient } from '@angular/common/http';

export class CustomUploadAdapter {
    loader: FileLoader;
    http: HttpClient;
    url: string;

    constructor(loader: FileLoader, http: HttpClient, url: string) {
        this.loader = loader;
        this.http = http;
        this.url = url;
    }

    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            if (file) {
                const data = new FormData();
                data.append('file', file);

                this.http.post(this.url, data).subscribe({
                    next: (response: any) => {
                        resolve({
                            default: response.url
                        });
                    },
                    error: (err) => {
                        reject(err);
                    }
                });
            } else {
                reject('No file to upload');
            }
        }));
    }
    abort() { }
}