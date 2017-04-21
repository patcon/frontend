import React from "react";
import { bool, object } from "prop-types";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import CaseDetails from "../components/CaseDetails";
import ItemFetcher from "./ItemFetcher";

function mapStateToProps({ auth }) {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

export class Case extends React.Component {
  render() {
    return (
      <ItemFetcher
        api={api.fetchCaseById}
        id={Number(this.props.match.params.nodeID)}
        details={CaseDetails}
        {...this.props}
      />
    );
  }
}
Case.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: bool,
  location: object
};

export default connect(mapStateToProps)(injectIntl(Case));