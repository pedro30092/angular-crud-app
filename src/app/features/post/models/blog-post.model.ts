import { Timestamp } from '@angular/fire/firestore';

export interface BlogPost {
  title: string;
  content: string;
  coverImageUrl: string;
  publishedOn: Timestamp;
  slug: string;
  userId: string;
}
