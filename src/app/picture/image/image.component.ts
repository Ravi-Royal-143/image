import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() img: any
  @Output() deleteImgId = new EventEmitter<string>()
  @ViewChild('imgElement', { static: false }) selectedImage: ElementRef<HTMLImageElement>;

  copyToClipboard() {
    const imgData: any = this.selectedImage.nativeElement;
    imgData.crossOrigin = 'anonymous';
    imgData.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imgData.width;
      canvas.height = imgData.height;
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(imgData, 0, 0);
      canvas.toBlob((blob: any) => {
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      }, imgData.type);
    };
  }

  deleteImg(img: string) {
    this.deleteImgId.emit(img)
  }

}
