import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { Router } from 'express';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { userDataReducer } from './common/userData/userData.reducer';
import { currentUserReducer, loginValueReducer } from './common/loginData/loginData.reducer';
import { modalReducer } from './common/modal/modal.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), provideStore(), provideState({ name: "UserList", reducer: userDataReducer }), provideState({ name: "loginValue", reducer: loginValueReducer }),
  provideState({ name: "currentUser", reducer: currentUserReducer }), provideState({ name: "modal", reducer: modalReducer })]
};
