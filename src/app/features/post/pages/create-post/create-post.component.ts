import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getDownloadURL } from '@firebase/storage';
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
  router = inject(Router);

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
      nonNullable: true,
      validators: [Validators.required],
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

    this.blogPostService.createBlogPost(
      this.createPostForm.getRawValue().title,
      this.createPostForm.getRawValue().content,
      this.createPostForm.getRawValue().coverImageUrl
    );

    this.createPostForm.reset();

    this.router.navigate(['/dashboard']);
  }

  onContentChange() {
    this.contentData.set(this.createPostForm.getRawValue().content);
  }

  onCoverImageSelected(input: HTMLInputElement) {
    if (!input.files || input.files.length <= 0) {
      return;
    }

    const file: File = input.files[0];

    this.imageService
      .uploadImage(file.name, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            this.createPostForm.patchValue({
              coverImageUrl: downloadURL,
            });
          })
          .catch((error) => {
            console.error('Error getting download url image:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }
}
