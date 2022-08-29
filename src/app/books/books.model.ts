export interface Book {
  id: number;
  title: string;
  authorId: number;
}
export interface Author {
  id: number;
  name: string;
}

export interface BookWithAuthor {
  titleBook: string;
  authorName: string;
}

export function isAuthor(object: any): object is Author {
  return 'name' in object;
}

export function isBook(object: any): object is Book {
  return 'title' in object;
}