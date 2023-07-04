import {Post} from "./post";
import {Employee} from "./employee";

export class Comment{
  idComment: number;
  contenu: string;
  datePublication: Date;
  employee: Employee;
  post: Post;

}
