import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent {
  @ViewChild('selectedImage', { static: false }) selectedImage: ElementRef<HTMLImageElement>;
  
  imageSrc: string;

  constructor(private renderer: Renderer2, private clipboard: Clipboard) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

  copyImage() {
    const img: any = this.selectedImage.nativeElement;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0);
      canvas.toBlob((blob: any) => {
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      }, img.type);
    };
    img.src = this.imageSrc;
  }
  
}
