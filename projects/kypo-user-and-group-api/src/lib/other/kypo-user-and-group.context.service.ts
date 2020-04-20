import { Injectable } from '@angular/core';
import { KypoUserAndGroupApiConfig } from './kypo-user-and-group-api-config';

@Injectable()
export class KypoUserAndGroupContext {
  private readonly _config: KypoUserAndGroupApiConfig;

  get config(): KypoUserAndGroupApiConfig {
    return this._config;
  }

  constructor(config: KypoUserAndGroupApiConfig) {
    this._config = config;
  }
}
