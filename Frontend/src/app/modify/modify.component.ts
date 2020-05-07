import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../RecipeInterface';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  id: string;
  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
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
    private route: ActivatedRoute,
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.id = params.get('id'));
    this.recipeService.getOneRecipe(this.id).subscribe(
      (value: Recipe) => {
        for (let i = 1; i < value[`ingredients`].length; i++) {
          this.addIngredient();
        }
        this.recipeForm.patchValue(value);
      },
      error => console.error(error)
    );

    }

  addIngredient() {
    this.Ingredients.push( this.formBuilder.control('')  );
  }

  onSubmit() {
    const data = {
      title: this.recipeForm.get('title').value,
      time: this.recipeForm.get('time').value,
      description: this.recipeForm.get('description').value,
      ingredients: this.recipeForm.get('ingredients').value,
      url: this.recipeForm.get('url').value
    };
    console.log(data);
    this.recipeService.updateRecipe(data, this.id).subscribe(
      () => {},
      (error) => console.error(error)
    )
    .add(() =>  this.router.navigate(['/home/' + this.id]));

  }

}
