export class BlogPostHelper {
  static createSlug(title: string): string {
    const slurg = title.toLowerCase().replace(/\s+/g, '-');
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${slurg}-${randomNumber}`;
  }
}
