import {Post} from "./post";
export class Employee {

  id_Emp: number;
  username: string;
  nom: string;
  prenom: string;
  motDePasse: string;
  employeesSupervises: Employee[];
  listCommentaires: Comment[];
  posts: Post[];


}

