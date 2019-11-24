import { Component, Pipe, PipeTransform, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as showdown from 'showdown';
import { THEME_ID_TOKEN } from 'budgetkey-ng2-components';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  converter: showdown.Converter;
  private html = null;

  constructor(@Inject(THEME_ID_TOKEN) private themeId: string,
              private http: HttpClient) {
    this.converter = new showdown.Converter({
      customizedHeaderId: true,
      openLinksInNewWindow: true,
    });
  }

  md(themeId) {
    if (this.html) {
      return of(this.html);
    }
    const tid = themeId || this.themeId || 'budgetkey';
    return this.http.get(`assets/abouts/${tid}.md`, {responseType: 'text'})
        .pipe(
          map((text) => {
            this.html = this.converter.makeHtml(text);
            return this.html;
          })
        );
  }
}
