import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './RecipeInterface';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  defaultRecipe(): Recipe {
    return({title: '', ingredients: ['']});
  }
  getAllRecipes() {
    return(this.http.get<Recipe[]>('/api'));
  }

  getRecommendRecipe() {
    return(this.http.get<Recipe[]>('/api/recommend'));
  }
  getOneRecipe(id: string) {
    return(this.http.get<Recipe>(`/api/${id}`));
  }

  saveRecipe(newRecipe: any) {
    return(this.http.post<Recipe>('/api', newRecipe));
  }

  updateRecipe(newRecipe: any, id: string) {
    return(this.http.put(`/api/${id}`, newRecipe));
  }

  deleteRecipe(id: string) {
    return(this.http.delete(`/api/${id}`));
  }

  searchRecipe(value: string) {
    return(this.http.get<Recipe[]>(`/api/search/${value}`));
  }
}
