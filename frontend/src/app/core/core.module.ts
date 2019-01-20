
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Cache } from '@app-root/core/services/cache.service'

@NgModule({
  declarations: [  ],
  imports: [
    BrowserModule
  ],
  providers: [Cache],
})
export class CoreModule { }
