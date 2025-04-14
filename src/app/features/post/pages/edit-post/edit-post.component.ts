import { Component, inject, input, OnInit, signal } from '@angular/core';
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
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  //DI
  blogPostService = inject(BlogPostService);
  imageService = inject(ImageService);
  router = inject(Router);

  //Signals
  slug = input<string | undefined>(undefined);
  contentData = signal<string>('');

  //Initial validations (form validations set up)
  editPostForm = new FormGroup({
    slug: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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

  //Getters for form controls
  get title() {
    return this.editPostForm.controls.title;
  }

  get content() {
    return this.editPostForm.controls.content;
  }

  //Lifecycle Hooks
  ngOnInit(): void {
    this.blogPostService
      .getBlogPostBySlug(this.slug() ?? '')
      .subscribe((post) => {
        this.editPostForm.patchValue({
          slug: post.slug,
          title: post.title,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
        });

        this.contentData.set(post.content);
      });
  }

  //Component Event Handlers
  onFormSubmit() {
    if (this.editPostForm.invalid) {
      return;
    }

    this.blogPostService.updateBlogPost(
      this.editPostForm.getRawValue().slug,
      this.editPostForm.getRawValue().title,
      this.editPostForm.getRawValue().content,
      this.editPostForm.getRawValue().coverImageUrl
    );

    this.router.navigate(['/dashboard']);
  }

  onContentChange() {
    this.contentData.set(this.editPostForm.getRawValue().content);
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
            this.editPostForm.patchValue({
              coverImageUrl: downloadURL,
            });
            alert('Image uploaded successfully');
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
