import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { GroupApi } from './api/group/group-api.service';
import { GroupDefaultApi } from './api/group/group-default-api.service';
import { MicroserviceApi } from './api/microservice/microservice-api.service';
import { MicroserviceDefaultApi } from './api/microservice/microservice-default-api.service';
import { RoleApi } from './api/role/role-api.service';
import { RoleDefaultApi } from './api/role/role-default-api.service';
import { UserApi } from './api/user/user-api.service';
import { UserDefaultApi } from './api/user/user-default-api.service';
import { KypoUserAndGroupApiConfig } from './other/kypo-user-and-group-api-config';
import { KypoUserAndGroupContext } from './other/kypo-user-and-group.context.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    KypoUserAndGroupContext,
    { provide: UserApi, useClass: UserDefaultApi },
    { provide: GroupApi, useClass: GroupDefaultApi },
    { provide: MicroserviceApi, useClass: MicroserviceDefaultApi },
    { provide: RoleApi, useClass: RoleDefaultApi },
  ],
})
export class KypoUserAndGroupApiModule {
  constructor(@Optional() @SkipSelf() parentModule: KypoUserAndGroupApiModule) {
    if (parentModule) {
      throw new Error('KypoUserAndGroupApiModule is already loaded. Import it only once in single module hierarchy.');
    }
  }

  static forRoot(config: KypoUserAndGroupApiConfig): ModuleWithProviders<KypoUserAndGroupApiModule> {
    return {
      ngModule: KypoUserAndGroupApiModule,
      providers: [{ provide: KypoUserAndGroupApiConfig, useValue: config }],
    };
  }
}
