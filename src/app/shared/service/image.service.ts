import { inject, Injectable } from '@angular/core';
import {
  ref,
  Storage,
  uploadBytesResumable,
  UploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  firebaseStorageService = inject(Storage);

  uploadImage(imageName: string, image: File): UploadTask {
    const storageRef = ref(this.firebaseStorageService, `images/${imageName}`);
    return uploadBytesResumable(storageRef, image);
  }
}
