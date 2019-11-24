import { TestBed, async } from '@angular/core/testing';
import { AppComponent, SafeHtmlPipe } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BudgetKeyCommonModule, THEME_ID_TOKEN, LANG_TOKEN } from 'budgetkey-ng2-components';
import { getAuthServiceConfigProvider } from 'budgetkey-ng2-auth';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BudgetKeyCommonModule,
      ],
      declarations: [
        AppComponent,
        SafeHtmlPipe
      ],
      providers: [
        {provide: THEME_ID_TOKEN, useValue: 'budgetkey'},
        {provide: LANG_TOKEN, useValue: 'he'},
        getAuthServiceConfigProvider('https://next.obudget.org')
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
