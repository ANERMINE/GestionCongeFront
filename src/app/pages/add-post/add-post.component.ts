import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postContent: string;
  constructor(private postService: PostService) { }
  addPost() {
    if (this.postContent) {
      this.postService.addPost(this.postContent)
        .subscribe(
          response => {
            console.log('Le post a été ajouté avec succès:', response);
            // Effectuez les actions supplémentaires souhaitées, comme actualiser la liste des posts, etc.
          },
          error => {
            console.error('Une erreur s\'est produite lors de l\'ajout du post:', error);
            // Gérez les erreurs de manière appropriée
          }
        );
    }
  }
  ngOnInit(): void {
  }

}
