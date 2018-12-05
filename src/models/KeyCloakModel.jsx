import { observable, action, decorate } from "mobx";

class keyCloakModel {
  keycloak = null;

  authenticated = keycloak => {
    this.keycloak = keycloak;
  };
}

decorate(keyCloakModel, {
  keycloak: observable,
  authenticated: action
});

const KeyCloakModel = new keyCloakModel();

export default KeyCloakModel;
