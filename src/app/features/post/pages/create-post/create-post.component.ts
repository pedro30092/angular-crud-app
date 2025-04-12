import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
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

    this.blogPostService.blogPost(
      this.createPostForm.getRawValue().title,
      this.createPostForm.getRawValue().content
    );
  }

  onContentChange() {
    this.contentData.set(this.createPostForm.getRawValue().content);
  }
}
