import * as React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouterProps, RouteComponentProps } from "react-router-dom";
import ReduxType from "ReduxType";
import { VerificationCodeInput } from "../components";

import { verifyCode } from "../store/actions/authActions";

interface IProps extends RouteComponentProps, BrowserRouterProps {
  accessToken: string;
  errorMessage?: string;
  verifyCode: (params: any) => any;
}

const CODE_LENGTH: number = 6;
class Verification extends React.Component<IProps> {
  state = {
    isComplete: false,
    inputValue: null,
    submitted: false,
  };

  constructor(props: IProps) {
    super(props);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnComplete = this._handleOnComplete.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleOnFocus = this._handleOnFocus.bind(this);
  }

  render() {
    const { isComplete, submitted } = this.state;

    return (
      <Container className="pt-5">
        <h2 data-cy="verification-title">Enter OTP</h2>
        {
          (this.props.errorMessage && submitted) &&
          <Alert variant="danger" data-cy="verification-alert">
            {this.props.errorMessage}
          </Alert>
        }
        <VerificationCodeInput
          fields={CODE_LENGTH}
          onChange={this._handleOnChange}
          onComplete={this._handleOnComplete}
          type="number"
          required={true}
          autoFocus={true}
          onFocus={this._handleOnFocus}
          id="verification-code-input"
        />
        <div className="mt-5" />
        <Button variant="primary" type="submit" onClick={this._handleSubmit} disabled={!isComplete} data-cy="verification-button-submit">
          Submit
        </Button>
      </Container>
    );
  }

  private _handleOnChange(val: string) {
    this.setState({ isComplete: val.length === CODE_LENGTH });
  }

  private _handleOnComplete(val: string) {
    this.setState({ isComplete: val.length === CODE_LENGTH });
    this.setState({ inputValue: val });
  }

  private _handleSubmit() {
    const { inputValue } = this.state;
    const params = {
      code: inputValue,
    };
    this.props.verifyCode(params);
    this.setState({ submitted: true });
  }

  private _handleOnFocus() {
    this.setState({ submitted: false });
  }

}

const mapStateToProps = (state: ReduxType.State) => ({
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, {
  verifyCode,
})(Verification);
