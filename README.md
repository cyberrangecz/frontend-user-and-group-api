# KYPO User and Group API

This library contains Angular API services of backend [KYPO User and Group service](https://gitlab.ics.muni.cz/kypo-crp/backend-java/kypo2-user-and-group).
It contains default implementation and mapping from DTOs to internal frontend model imported from [kypo-user-and-group-model](https://gitlab.ics.muni.cz/kypo-crp/frontend-angular/models/kypo-user-and-group-model).
You can override existing services by implementing the related abstract class and provide it in module.

## Prerequisites

* NPM with access to [KYPO registry](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)

## Usage

To use kypo-user-and-group-api in your application, follow these steps:

1. Run `npm install @cyberrangecz-platform/user-and-group-api`
2. Install peer dependencies
3. Create an instance of `KypoUserAndGroupApiConfig`
4. Import `KypoUserAndGroupApiModule` with config passed to `forRoot()` method

This will provide all API services with default implementation. If you want to override the default implementation, extend an API service

```
@Injectable()
export class MyUserApi extends UserApi {
    ...
}
```

and provide your implementation in the module

```
@NgModule({
    imports: [
       ...
    ],
    providers: [
        { provide: UserApi, useClass: MyUserApi }
    ]
})
export class MyModule {
}

```


