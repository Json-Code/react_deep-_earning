import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'
const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})
@connect(mapState, { login })
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
      ?
      <Redirect to='/admin'/>
      :
      <Card title="Json_Code Login" className="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                disabled={this.props.isLoading}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                disabled={this.props.isLoading}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Login