import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Recipe } from '../RecipeInterface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  recipeList: Recipe[];

  recipesRecommend: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      route.params.subscribe(val => {
        this.ngOnInit();
    });
    }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(
      (value: Recipe[]) => {
        this.recipeList = value;
      },
      (error) => console.error(error)
    );
    this.recipeService.getRecommendRecipe().subscribe(
      (value) => { this.recipesRecommend = value; },
      (error) => console.error(error)
    );
    }
  isActive(recipe: object) {
    if (recipe === this.recipesRecommend[0]) {
      return 'active';
    }
    return '';
  }

  detail(id: string) {
    this.router.navigate([`detail/${id}`]);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const query = form.value.search;
    this.recipeService.searchRecipe(query).subscribe(
      (value: Recipe[]) => {
        this.recipeList = value;
        console.log(value); },
      (error) => {
        console.error(error);
        this.ngOnInit(); }
    );
  }

}
