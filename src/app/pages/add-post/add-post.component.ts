import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import axios from 'axios';
import {CommentService} from "../../services/comment.service";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/Employee";


@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.css']
})
export class AddPostComponent implements OnInit {

  posts: Post[];
  newPost: Post = {
    id_post: 0,
    description: '',
    datePublication: new Date(),
    listCommentaire: [],
    employeeId: 0 // Remplacez la valeur 0 par l'ID de l'employé actuel
  };
  selectedPost: Post = null;
  updatedDescription: string;
  newPostDescription: string;
  newCommentContent: { [postId: number]: string } = {};
  showAddComment: { [postId: number]: boolean } = {};
  showAddPostForm: boolean = false;
  selectedEmployeeId: number;
  employees: Employee[];




  constructor(private postService: PostService ,private commentService:CommentService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllPosts();
    this.getEmployees();
  }

  async getAllPosts() {
    try {
      const response = await axios.get('http://localhost:8081/Test/Post/allPosts');
      this.posts = response.data;
      console.log(this.posts); // Afficher les posts dans la console
      // Récupérer les commentaires associés à chaque post
      for (const post of this.posts) {
        const commentResponse = await axios.get(`http://localhost:8081/Test/Post/Comments/${post.id_post}`);
        post.listCommentaire = commentResponse.data;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
    }
  }

  getEmployees() {
    this.employeeService.getAlEmployee().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des employés:', error);
      }
    );
  }

  addNewPost() {
    if (this.selectedEmployeeId) {
      const selectedEmployee = this.employees.find(employee => employee.id_Emp === this.selectedEmployeeId);

      if (selectedEmployee) {
        const newPost: Post = {
          id_post: 0,
          description: this.newPostDescription,
          datePublication: new Date(),
          listCommentaire: [],
          employeeId: selectedEmployee.id_Emp
        };

        this.postService.createPost(this.selectedEmployeeId, newPost).subscribe(
          (response: Post) => {
            console.log('Post ajouté avec succès', response);
            this.newPostDescription = '';
            this.showAddPostForm = false;
            this.getAllPosts(); // Actualiser la liste des posts
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout du post', error);
          }
        );
      } else {
        console.error('Employé sélectionné non trouvé');
      }
    } else {
      console.error('Aucun employé sélectionné');
    }
  }



  formatDate(milliseconds: Date): string {
    const date = new Date(milliseconds);
    return date.toLocaleDateString(); // Vous pouvez personnaliser le format selon vos besoins
  }
  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(
      () => {
        console.log('Post supprimé avec succès');
        // Réactualiser la liste des posts après la suppression
        this.getAllPosts();
      },
      (error: any) => {
        console.error('Erreur lors de la suppression du post', error);
      }
    );
  }

  updatePost() {
    const updatedPost: Post = {
      id_post: this.selectedPost.id_post,
      description: this.updatedDescription,
      datePublication: this.selectedPost.datePublication,
      listCommentaire: this.selectedPost.listCommentaire,
      employeeId: this.selectedPost.employeeId
    };

    this.postService.updatePost(updatedPost).subscribe(
      (response: Post) => {
        console.log('Post mis à jour avec succès', response);
        // Mettez à jour les données dans votre liste posts
        const index = this.posts.findIndex(post => post.id_post === updatedPost.id_post);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        // Réinitialisez la valeur de selectedPost après la mise à jour
        this.selectedPost = null;
        this.updatedDescription = '';
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du post', error);
      }
    );
  }
  editPost(post: Post) {
    this.selectedPost = post; // Stocker le post sélectionné pour la modification
    this.updatedDescription = post.description; // Initialiser la nouvelle description avec la description actuelle
  }

  addComment(post: Post) {
    const comment: Comment = {
      idComment: 0,
      contenu: this.newCommentContent[post.id_post],
      datePublication: new Date(),
      post: post
    };

    this.commentService.addComment(comment).subscribe(
      (response: Comment) => {
        console.log('Commentaire ajouté avec succès', response);
        post.listCommentaire.push(response);
        this.newCommentContent[post.id_post] = '';
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du commentaire', error);
      }
    );
  }

  deleteComment(post: Post, comment: Comment) {
    this.commentService.deleteComment(comment.idComment).subscribe(
      () => {
        console.log('Commentaire supprimé avec succès');
        const commentIndex = post.listCommentaire.findIndex(c => c.idComment === comment.idComment);
        if (commentIndex !== -1) {
          post.listCommentaire.splice(commentIndex, 1);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la suppression du commentaire', error);
      }
    );
  }

  toggleAddComment(post: Post) {
    this.showAddComment[post.id_post] = !this.showAddComment[post.id_post];
  }


}
