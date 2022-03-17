import {
  Component,
  OnInit,
  Inject,
  NgModule,
  ModuleWithProviders,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MY_NUM } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const URL = new InjectionToken<string>('URL');

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url: string;
  constructor(@Inject(URL) url: string) {}

  postForm(form: FormGroup, http: HttpClient): Observable<any> {
    return http.post(this.url, form.value);
  }
}

@NgModule({
  providers: [],
})
export class ContactFormModule {
  static forRoot(url: string): ModuleWithProviders<any> {
    return {
      ngModule: ContactFormModule,
      providers: [
        { provide: URL, useValue: new PostService(url) },
        PostService,
      ],
    };
  }
}

@Component({
  selector: 'app-contacto',
  templateUrl: './ContactFormModule.html',
  styleUrls: ['./ContactFormModule.css'],
  providers: [PostService],
})
export class ContactFormComponent implements OnInit {
  maxChars: number;
  form: FormGroup;
  postService: PostService;
  http: HttpClient;
  constructor(
    @Inject(MY_NUM) N: number,
    @Inject(URL) postService: PostService,
    http: HttpClient
  ) {
    this.maxChars = N;
    this.postService = postService;
    this.http = http;
  }

  getMaxChars(): number {
    return this.maxChars;
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-0-9]+$/),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+{1}[0-9]+$/),
      ]),
      mensaje: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.maxChars),
      ]),
    });
    this.form.statusChanges.subscribe((status) => {
      if (status == 'VALID') alert('El formulario ahora es válido');
    });
  }

  submit() {
    if (this.form.status == 'VALID') {
      alert('Se envía el formulario');
      this.postService.postForm(this.form, this.http).subscribe((data) => {
        console.log(data);
      });
    } else alert('Hay campos inválidos, por favor revise los campos con nota');
    /* console.log(
      this.getMaxChars(),
      this.form.get('mensaje').value.length,
      this.form.get('mensaje').valid,
      this.form.get('mensaje').validator
    ); */
  }
}
