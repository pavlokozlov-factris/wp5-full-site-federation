import React from "react";
import { FormControl, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setUsername } from './store/login/actions';


const LoginContent = ({username, setUsername}) => {
  const [currentUsername, usernameSet] = React.useState(username);
  const login = () => setUsername(currentUsername);

  return (
    <>
      <Row style={{ paddingTop: "1em" }}>
        <span>Please enter username:</span>
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <FormControl
          type="text"
          placeholder="login username"
          value={currentUsername}
          onChange={(evt) => {
            usernameSet(evt.target.value);
          }}
        />
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <Button onClick={login}>Login</Button>
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <Link to="/" style={{ color: "black" }}>
          home
        </Link>
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <a href="/search" style={{ color: "black" }} onClick={e => e.preventDefault()}>
          search
        </a>
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <Link to="/login/asdasd" style={{ color: "black" }}>
          login subroute
        </Link>
      </Row>
      <Row style={{ paddingTop: "1em" }}>
        <span>current logged in user: {username}</span>
      </Row>
    </>
  );
};

export default connect(
  (state) => state.login,
  (dispatch) => ({
    setUsername: (value) => dispatch(setUsername(value)),
  }),
)(LoginContent);
