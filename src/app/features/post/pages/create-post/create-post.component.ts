import { Component, inject, signal } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/service/image.service';
import { BlogPostService } from '../../services/blog-post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  contentData = signal<string>('');
  blogPostService = inject(BlogPostService);
  imageService = inject(ImageService);

  createPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(3000)],
    }),
    coverImageUrl: new FormControl<string>('', {
      nonNullable: false,
    }),
  });

  get title() {
    return this.createPostForm.controls.title;
  }

  get content() {
    return this.createPostForm.controls.content;
  }

  onFormSubmit() {
    if (this.createPostForm.invalid) {
      return;
    }

    console.log('enter here');

    this.blogPostService.blogPost(
      this.createPostForm.getRawValue().title,
      this.createPostForm.getRawValue().content
    );

    alert('Post created successfully');

    this.createPostForm.reset();
  }

  onContentChange() {
    this.contentData.set(this.createPostForm.getRawValue().content);
  }

  onCoverImageSelected(input: HTMLInputElement) {
    if (!input.files || input.files.length <= 0) {
      return;
    }

    const file: File = input.files[0];

    console.log(file.name);

    // this.imageService
    //   .uploadImage(file.name, file)
    //   .then((snapshot) => {
    //     getDownloadURL(snapshot.ref)
    //       .then((downloadURL) => {
    //         console.log('Image uploaded successfully:', downloadURL);
    //       })
    //       .catch((error) => {
    //         console.error('Error getting download url image:', error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading image:', error);
    //   });
  }
}
