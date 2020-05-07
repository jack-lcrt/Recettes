import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { ModifyComponent } from './modify/modify.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeService } from './recipe.service';

const routes: Routes = [
  { path: 'home', component: BoardComponent },
  {path: 'new', component: NewComponent },
  {path: 'home/:id', component: DetailsComponent},
  {path: 'home/modify/:id', component: ModifyComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NewComponent,
    DetailsComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
