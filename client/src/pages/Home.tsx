import * as React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouterProps, RouteComponentProps } from "react-router-dom";
import ReduxType from "ReduxType";
import { IUser } from "../interfaces/ICommon";
import { logout } from "../store/actions/authActions";

interface IProps extends RouteComponentProps, BrowserRouterProps {
  user: IUser;
  logout: () => void;
}

class Home extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return (
        <></>
      );
    }

    return (
      <Container className="pt-5" data-cy="home-container">
        <Jumbotron>
          <h1>Hello, {user.name}!</h1>
          <div style={{ marginTop: "30px" }} />
          <Button variant="primary" onClick={this.handleBookNow}>Book Now</Button>
          .<div style={{ marginTop: "70px" }} />
          <Button variant="danger" onClick={this.handleLogout}>Logout</Button>
        </Jumbotron>
      </Container>
    );
  }

  private handleBookNow = () => {
    window.open("https://book.getblys.com.au/", "_blank");
  }

  private handleLogout = () => {
    this.props.logout();
  }

}

const mapStateToProps = (state: ReduxType.State) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  logout,
})(Home);
