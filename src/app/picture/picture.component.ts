import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { PictureService } from './picture.service';
import { environment } from 'src/environments/environment';
import { ImageComponent } from './image/image.component';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  imageSrc: string;
  imagesLists: any[] = []

  constructor(private pictureService: PictureService, private clipboard: Clipboard) { }

  ngOnInit() {
    this.fetchImgs()
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.saveFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

  addFormData(data: any): FormData {
    const postData = new FormData();
    postData.append('image', data);
    return postData;
  }

  fetchImgs() {
    this.pictureService.getImages().subscribe((data: any) => {
      this.imagesLists = data.map((singleImg: string) => {
        return {
          fullpath: environment.baseURL + '/file/' + singleImg,
          imgName: singleImg
        }
      })
    });
  }

  saveFile(data: any): void {
    this.pictureService.addImagesToNode(this.addFormData(data)).subscribe(_ => {
      this.fetchImgs();
    });
  }

  deleteImg(path: string): void {
    this.pictureService.deleteImgFromNode(path).subscribe(_ => {
      this.fetchImgs();
    });
  }

}
