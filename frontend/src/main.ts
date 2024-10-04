import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Uvjeri se da je ovdje pravi modul

platformBrowserDynamic().bootstrapModule(AppModule) // Ovdje bootstrapuješ modul
  .catch(err => console.error(err));