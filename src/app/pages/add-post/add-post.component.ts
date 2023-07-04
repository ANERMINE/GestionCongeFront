import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post";
import axios from 'axios';

@Component({
  selector: 'app-add-post',
  templateUrl: 'add-post.component.html',
  styleUrls: ['add-post.component.css']
})
export class AddPostComponent implements OnInit {
  posts: Post[];
  newPost: Post;
  selectedPost: Post;
  constructor(private postService: PostService) { }

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

  newPostDescription: string;
  async addNewPost() {
    const newPost= {

      description:this.newPostDescription,
      datePublication: new Date(),
      listCommentaire: []
    };

    this.postService.addPost(newPost).subscribe(
      (response: any) => {
        console.log('Post ajouté avec succès', response);
        // Réinitialisez les valeurs ou effectuez d'autres actions après l'ajout du post
        this.newPostDescription = '';   },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du post', error);
      }
    );
  }

}
