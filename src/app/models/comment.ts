import {Post} from "./post";


export class Comment{
  idComment: number;
  contenu: string;
  datePublication: Date;
  post: {
    id_post: number;
    employeeId: number;
    description: string;
    datePublication: Date;
    listCommentaire: Comment[];
  };

}
