import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../RecipeInterface';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    picture: [''],
    time: [''],
    ingredients: this.formBuilder.array([ this.formBuilder.control('') ]),
    url: ['']
  });

  get Ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {  }

  addIngredient() {
    this.Ingredients.push( this.formBuilder.control('')  );
  }

  onSubmit() {
    const data: Recipe = {
      title: this.recipeForm.get('title').value,
      time: this.recipeForm.get('time').value,
      description: this.recipeForm.get('description').value,
      ingredients: this.recipeForm.get('ingredients').value,
      url: this.recipeForm.get('url').value
    };
    console.log(data);
    this.recipeService.saveRecipe(data).subscribe(
      () => {},
      (error: any) => console.log(error)
    )
    .add(() =>  this.router.navigate(['/home']));
  }
}
