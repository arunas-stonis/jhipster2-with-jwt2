import * as angular from 'angular';

import './account/account.module';
import './admin/admin.module';
import './entities/entity.module';

import { upgradeAdapter } from './upgrade_adapter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from "./app.constants";

import { TranslationConfig } from './blocks/config/translation.config';
import { TranslationStorageProvider } from './blocks/config/translation-storage.provider';

import { CompileServiceConfig } from './blocks/config/compile.config';
import { HttpConfig } from './blocks/config/http.config';
import { PagerConfig } from './blocks/config/uib-pager.config';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { HomeComponent } from './home';
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent } from './layouts';

import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';

import { JhiLoginModalComponent } from "./shared";

angular
    .module('myappApp.app', [
        'tmh.dynamicLocale',
        'ngResource',
        'ngCookies',
        'ngAria',
        'ngCacheBuster',
        'ngFileUpload',
        'ui.bootstrap',
        'infinite-scroll',
        'angular-loading-bar',
        // jhipster-needle-angularjs-add-module JHipster will add new module here
        'myappApp.account',
        'myappApp.admin',
        'myappApp.entity'
    ])
    .config(CompileServiceConfig)
    .config(HttpConfig)
    .config(PagerConfig)
    .config(PaginationConfig)
    .directive('jhiLoginModal', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiLoginModalComponent))
    .directive('home', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(HomeComponent))
    .directive('navbar', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(NavbarComponent))
    .directive('footer', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(FooterComponent))
    .directive('jhiMain', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiMainComponent))
    .factory('ErrorHandlerInterceptor', ErrorHandlerInterceptor)
    .factory('NotificationInterceptor', NotificationInterceptor)
    .factory('TranslationStorageProvider', TranslationStorageProvider)
    .config(TranslationConfig)
    .directive('pageRibbon',  <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(PageRibbonComponent))
    .run(run);

run.$inject = ['$rootScope'];

function run($rootScope) {
    $rootScope.VERSION = VERSION;
}
