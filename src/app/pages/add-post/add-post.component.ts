import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import axios from 'axios';
import {CommentService} from "../../services/comment.service";


@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.css']
})
export class AddPostComponent implements OnInit {
  /*  posts: Post[];

selectedPost: Post = null;
  updatedDescription: string;
  newPostDescription: string;
  newPost: Post = {
    id_post: 0, // Remplacez la valeur 0 par l'ID du post
    description: '',
    datePublication: new Date(),
    listCommentaire: [] };*/
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



  constructor(private postService: PostService ,private commentService:CommentService) { }

  ngOnInit() {
    this.getAllPosts();
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

  /*async addNewPost() {
    this.newPost.datePublication = new Date();
    this.newPost.description = this.newPostDescription;

    this.postService.addPost(this.newPost).subscribe(
      (response: any) => {
        console.log('Post ajouté avec succès', response);
        // Réinitialisez les valeurs ou effectuez d'autres actions après l'ajout du post
        this.newPost = new Post();
        this.newPostDescription = '';
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du post', error);
      }
    );
  }*/

  addNewPost(employeeId: number) {
    this.newPost.datePublication = new Date();

    this.postService.createPost(employeeId, this.newPost).subscribe(
      (response: Post) => {
        console.log('Post ajouté avec succès', response);
        // Réinitialisez les valeurs ou effectuez d'autres actions après l'ajout du post
        this.newPost = {
          id_post: 20,
          description: '',
          datePublication: new Date(),
          listCommentaire: [],
          employeeId: 8// Remplacez la valeur 0 par l'ID de l'employé actuel
        };
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du post', error);
      }
    );
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
