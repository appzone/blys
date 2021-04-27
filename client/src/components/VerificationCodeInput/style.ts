import styled from "../../libs/styled-components";

export const VerificationCodeContainer = styled.div`
  position: relative;
`;

export const InputCode = styled.input`
  border: solid 1px #a8adb7;
  font-family: 'Lato';
  font-size: 20px;
  color: #525461;
  text-align: center;
  box-sizing: border-box;
  border-radius: 0;
  -webkit-appearance: initial;
  width: 58px;
  height: 54px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  &:focus {
    outline: none;
    border: 1px solid #006fff;
    caret-color: #006fff;
  }
  &.error {
    border: 2px solid red;
  }
`;

export const Title = styled.p`
  margin: 0;
  height: 20px;
  padding-bottom: 10px;
`;
