import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { BlogPostHelper } from '../../../core/helpers/blog-post-helper';
import { UserService } from '../../user/services/user.service';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  firestoreService = inject(Firestore);
  userService = inject(UserService);

  createBlogPost(title: string, content: string, coverImageUrl: string): void {
    // Add a new document with a generated ID
    // const postCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postCollectionReference, {
    //   title: this.createPostForm.value.title,
    //   content: this.createPostForm.value.content,
    //   publishedOn: new Date(),
    // })
    //   .then(() => {
    //     console.log('Post added to Firestore');
    //   })
    //   .catch((error) => {
    //     console.error('Error adding post to Firestore: ', error);
    //   });

    // Set a document with a generated ID
    const blogPostDocumentRef = doc(
      this.firestoreService,
      'blog-posts',
      BlogPostHelper.createSlug(title)
    );

    setDoc(blogPostDocumentRef, {
      title,
      content,
      coverImageUrl,
      publishedOn: new Date(),
      userId: this.userService.currentUser()?.id,
    })
      .then(() => {
        console.log('Post set to Firestore');
      })
      .catch((error) => {
        console.error('Error setting post to Firestore: ', error);
      });
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    const blogPostCollectionRef = collection(
      this.firestoreService,
      'blog-posts'
    );

    return collectionData(blogPostCollectionRef, {
      idField: 'slug',
    }) as Observable<BlogPost[]>;
  }

  getAllBlogPostsByUser(): Observable<BlogPost[]> {
    console.log(this.userService.currentUser()?.id);

    const blogPostCollectionRef = collection(
      this.firestoreService,
      'blog-posts'
    );

    const queryFilter = query(
      blogPostCollectionRef,
      where('userId', '==', this.userService.currentUser()?.id)
    );

    return collectionData(queryFilter, {
      idField: 'slug',
    }) as Observable<BlogPost[]>;
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost> {
    const blogPostCollectionRef = doc(
      this.firestoreService,
      'blog-posts',
      slug
    );

    return docData(blogPostCollectionRef, {
      idField: 'slug',
    }) as Observable<BlogPost>;
  }

  updateBlogPost(
    slug: string,
    title: string,
    content: string,
    coverImageUrl: string
  ): void {
    const blogPostCollectionRef = doc(
      this.firestoreService,
      'blog-posts',
      slug
    );

    setDoc(blogPostCollectionRef, {
      title,
      content,
      publishedOn: new Date(),
      coverImageUrl,
      userId: this.userService.currentUser()?.id,
    });
  }

  deleteBlogPost(slug: string): Observable<void> {
    const blogPostCollectionRef = doc(
      this.firestoreService,
      'blog-posts',
      slug
    );

    const deletePromise = deleteDoc(blogPostCollectionRef);

    return from(deletePromise);
  }
}
