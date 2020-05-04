import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { BoardComponent } from './board/board.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { ModifyComponent } from './modify/modify.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AppComponent },
  {path: 'new', component: NewComponent },
  {path: 'modify', component: ModifyComponent},
  {path: '**', component: AppComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    BoardComponent,
    NewComponent,
    DetailsComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
