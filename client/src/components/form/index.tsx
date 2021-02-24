import React from 'react'
import './form.sass'
import {Button, Form, Input} from "antd";
import {loginUser, registerUser} from "../../actions/user";
import {useDispatch} from "react-redux"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const FormRegOrLog = ({type}: {type: string}) => {

    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        console.log('Success:', values)

        type === "login" ? loginUser(values, dispatch) : registerUser(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div className="form">
                <div className="form__title">
                    {type === "login" ?
                        (
                            "Login"
                        )
                        :
                        (
                            "Registration"
                        )
                    }
                </div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {type === "login" ?
                        (
                            ""
                        )
                        :
                        (
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    }

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {type === "login" ?
                                (
                                    "Login"
                                )
                                :
                                (
                                    "Register"
                                )
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormRegOrLog;