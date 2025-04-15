import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Timestamp } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../../../post/services/blog-post.service';
import { DashboardStatisticsComponent } from '../../components/dashboard-statistics/dashboard-statistics.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatisticsComponent, RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  blogPostService = inject(BlogPostService);

  blogPosts = toSignal(this.blogPostService.getAllBlogPostsByUser());
  totalBlogPosts = computed(() => this.blogPosts()?.length);

  convertTimestampToDate(timestamp?: Timestamp): Date | string {

    return timestamp ? timestamp.toDate() : 'N/A';
  }
}
