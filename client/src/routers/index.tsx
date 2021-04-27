import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { Route , Router } from "react-router-dom";
import ReduxType from "ReduxType";
import Home from "../pages/Home";
import Verification from "../pages/Verification";
import history from "./history";

// tslint:disable-next-line:no-empty-interface
interface IProps {

}

const Routers = (props: IProps) => {
  return (
    <Router history={history}>
      <div className="h-100">
        <LoadingBar style={{ backgroundColor: "red", height: "2px", position: "fixed", top: 0, left: 0, right: 0 }} />
        <Container className="h-100">
          <Row className="h-100 justify-content-center">
            <Col lg="6">
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/verify" component={Verification} />
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: ReduxType.State) => ({});
export default connect(mapStateToProps)(Routers);
