import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BlogPostHelper } from '../../../../core/helpers/blog-post-helper';
import { BlogPostService } from '../../../post/services/blog-post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  blogPostService = inject(BlogPostService);
  blogPosts = toSignal(this.blogPostService.getAllBlogPosts());

  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;
}
