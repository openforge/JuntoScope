import { async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigureFn, configureTests } from '../test/jest-test.helper';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          imports: [RouterTestingModule],
          declarations: [AppComponent],
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it(
    'should create the app',
    async(() => {
      const app = component;
      expect(app).toBeTruthy();
    })
  );

  it('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });
});
