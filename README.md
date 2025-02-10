# CyberRangeᶜᶻ Platform User and Group API

This library contains Angular API services of backend [User and Group service](https://github.com/cyberrangecz/backend-user-and-group).
It contains default implementation and mapping from DTOs to internal frontend model imported from [User and Group model](LINK-HERE).
You can override existing services by implementing the related abstract class and provide it in module.

## Usage

To use user-and-group-api in your application, follow these steps:

1. Run `npm install @cyberrangecz-platform/user-and-group-api`
2. Install peer dependencies
3. Create an instance of `UserAndGroupApiConfig`
4. Import `UserAndGroupApiModule` with config passed to `forRoot()` method

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


