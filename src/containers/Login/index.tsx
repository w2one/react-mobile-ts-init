/**
 * login
 */
import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";
import { Toast, Button, Input } from "@components";
import { createForm } from "rc-form";
import Style from "./style";

function Login(props: { token?: any; form?: any; loginAction?: any; location?: any; }) {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

  React.useEffect(() => {
    const { token } = props;
    token && setRedirectToReferrer(true);
  }, [props]);

  /**
   * login
   */
  const fnLogin = async () => {
    const {
      form: { validateFields }
    } = props;
    validateFields(async (err, value) => {
      if (!err) {
        console.log(value);
        // validate
        await props.loginAction(value, () => setRedirectToReferrer(true));
      } else {
        console.log(err[Object.keys(err)[0]].errors[0].message);
        Toast.fail(err[Object.keys(err)[0]].errors[0].message);
      }
    });
  };

  if (redirectToReferrer) {
    const { from } = props.location.state || {
      from: { pathname: "/" } // default site
    };
    return <Redirect to={from} />;
  }

  const {
    form: { getFieldDecorator }
  } = props;

  return (
    <>
      <div className={Style.login}>
        <div className={Style.logo}>
          <img src={require("@static/images/react.svg")} />
        </div>
        <div className={Style.form}>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入用户名"
              }
            ]
          })(<Input placeholder={"用户名"} maxLength={11} />)}

          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码"
              }
            ]
          })(<Input type="password" placeholder={"密码"} />)}

          <Button type="primary" onClick={fnLogin} style={{ width: "100%" }}>
            登录
          </Button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = (dispatch: any) => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Login));
