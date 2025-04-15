import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownModule } from 'ngx-markdown';
import { BlogPostHelper } from '../../../../core/helpers/blog-post-helper';
import { BlogPostService } from '../../services/blog-post.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [DatePipe, MarkdownModule], //Use async pipe for observable approach
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css',
})
export class ViewPostComponent {
  blogPostService = inject(BlogPostService);
  convertTimestampToDate = BlogPostHelper.convertTimestampToDate;
  //Observable approach to get data for a single resource explained
  //1. We added the input function to handle the incoming slug data from outside
  slug = input<string | undefined>(undefined);
  //2. We convert to an observable so we can "observe" and be able to do something with it
  // slug$ = toObservable(this.slug);
  //On slug we do a filter to check if the slug is not undefined
  //Then we use the switchMap operator to call the service and get the blog post by slug filtered (slug is know a proper string)
  //3. We assign the result to a new observable called blogPost$, which is use in the html
  //4. [REVIEW HTML] We use the async pipe to subscribe to the observable and get the data
  // blogPost$ = this.slug$.pipe(
  //   filter((slug) => slug !== undefined),
  //   switchMap((slug) => this.blogPostService.getBlogPostBySlug(slug))
  // );

  //Using signal approach to get data for a single resource explained
  // 1. Instead of using the async pipe, we are using the toSignal function to convert the observable to a signal and
  // assign it to a new variable called blogPost which is handled in HTML
  // blogPost = toSignal(
  //   this.slug$.pipe(
  //     filter((slug) => slug !== undefined),
  //     switchMap((slug) => this.blogPostService.getBlogPostBySlug(slug))
  //   )
  // );

  //Using rxjs resource approach to get data for a single resource explained
  private blogPostResource = rxResource({
    request: () => this.slug(),
    loader: ({ request: slug }) => this.blogPostService.getBlogPostBySlug(slug),
  });

  blogPostData = this.blogPostResource.value;
  isLoading = this.blogPostResource.isLoading;
}
