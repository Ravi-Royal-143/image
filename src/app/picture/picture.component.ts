import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const items: DataTransferItem[] = Array.from(clipboardData.items);
    const imageData = items.find(x => /image/i.test(x.type));
    if (imageData) {
      this.saveFile(imageData.getAsFile());
    }
  }

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
        // return {
        //   fullpath: environment.baseURL + '/file/' + singleImg,
        //   imgName: singleImg
        // }
        const extension = singleImg.split('.').pop();
        const count = singleImg.split(`.${extension}`).length;
        const imgName = count === 2 ?
          singleImg.split('-').slice(0, -1).join('-') :
          singleImg.split(`.`).slice(0, -2).join(''); //this is used when we directly upload from postman
        return {
          imagePath: `${environment.baseURL}/file/${singleImg}`,
          imageNamewithExtension: `${imgName}.${extension}`,
          fullpath: environment.baseURL + '/file/' + singleImg,
          imgName: imgName,
          filePath: singleImg
        };
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
