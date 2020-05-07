import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../RecipeInterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  data: Recipe = this.recipeService.defaultRecipe();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = params.get('id'));
    this.recipeService.getOneRecipe(this.id).subscribe(
      (value: any) => { this.data = value; },
      error => console.log(error)
    );
  }

  delete(id: string): void {
    this.recipeService.deleteRecipe(id).subscribe(
      (error) => { console.log(error); }
    ).add(() => this.router.navigate(['home']) );
  }

  add() {
    this.data.recommend = false;
    this.recipeService.updateRecipe(this.data, this.id)
      .subscribe(
        (error) => console.log(error)
      )
      .add(() => this.router.navigate(['home']));
  }
}
