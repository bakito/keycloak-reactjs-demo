import React from "react";
import { observer } from "mobx-react";

class BookBox extends React.Component {
  render() {
    const { keycloak } = this.props.model;
    return (
      <div className="bookBox row">
        <h1>
          Welcome {keycloak.tokenParsed.preferred_username}&nbsp;
          <button className="btn btn-success" onClick={keycloak.logout}>
            Logout
          </button>
        </h1>
        <h1>Best Books ever!</h1>
        <hr />
      </div>
    );
  }
}

export default observer(BookBox);
