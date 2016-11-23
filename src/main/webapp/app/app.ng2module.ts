
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule, RootModule } from 'ui-router-ng2';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ng2-webstorage';


import { MyappSharedModule } from './shared';
import { MyappAdminModule } from './admin/admin.ng2module'; //TODO these couldnt be used from barrels due to an error
import { MyappAccountModule } from './account/account.ng2module';

import { appState } from './app.state';
import { HomeComponent, homeState } from './home';
import { JhiRouterConfig } from './blocks/config/router.config';
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent,
    errorState,
    accessdeniedState
} from './layouts';
import { localStorageConfig } from './blocks/config/localstorage.config';
import { HttpInterceptor } from './blocks/interceptor/http.interceptor';
import {AuthExpiredInterceptor} from "./blocks/interceptor/auth-expired.interceptor";
import {Http, XHRBackend, RequestOptions} from "@angular/http";




localStorageConfig();

let routerConfig = {
    configClass: JhiRouterConfig,
    otherwise: '/',
    states: [
        appState,
        homeState,
        errorState,
        accessdeniedState
    ]
};

@NgModule({
    imports: [
        BrowserModule,
        UIRouterModule.forRoot(routerConfig),
        Ng2Webstorage,
        MyappSharedModule,
        MyappAdminModule,
        MyappAccountModule
    ],
    declarations: [
        JhiMainComponent,
        HomeComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                localStorage : LocalStorageService,
                sessionStorage : SessionStorageService,
                injector
            ) => new HttpInterceptor(
                backend,
                defaultOptions,
                [
                    new AuthInterceptor(localStorage, sessionStorage),
                    new AuthExpiredInterceptor(injector)
                    //other intecetpors can be added here
                ]
            ),
            deps: [
                XHRBackend,
                RequestOptions,
                Injector,
                LocalStorageService,
                SessionStorageService
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class MyappAppModule {}
