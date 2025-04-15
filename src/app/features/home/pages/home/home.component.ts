
import { Component, computed, inject } from '@angular/core';
import { BlogPostHelper } from '../../../../core/helpers/blog-post-helper';
import { BlogPostService } from '../../../post/services/blog-post.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogPostService = inject(BlogPostService);
  blogPosts = toSignal(this.blogPostService.getAllBlogPosts());

  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;
}
