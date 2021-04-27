import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
    height: 100%
  }
  h1, h2, h3, h4, h5, p, small, code {
    margin: 0;
    margin-bottom: .5em;
    white-space: pre-wrap;
    line-height: 1.5;
  }
  h1 {
    font-size: 2.75em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.5em;
  }
  h4 {
    font-size: 1.15em;
  }
  h5 {
    font-size: .85em;
  }
  p {
    font-size: 1em;
  }
  small {
    font-size: .5em;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #app {
    height: 100%;
  }
`;

export default GlobalStyle;
