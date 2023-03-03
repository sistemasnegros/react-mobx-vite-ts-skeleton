import { Button, Drawer, Form, Input, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useContextGlobal } from "../../../../commons/infrastructure/ui/hooks/context-global.hook";
import { UsersViewModel } from "../view-models/users.view-model";

export const UsersForm: React.FC<any> = observer(() => {
  const { globalStore } = useContextGlobal();
  const model = globalStore.container.get<UsersViewModel>("UsersViewModel");
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (model.modeEditForm) {
      return model.updateById(model.modeEditForm, values);
    }

    return model.create(values);
  };

  // detect if fetch is necessary in mode form update
  useEffect(() => {
    if (model.openForm === false) {
      return;
    }

    if (!model.modeEditForm) {
      form.resetFields();
      return;
    }

    model.loadInitialValues().then(() => {
      form.resetFields();
      form.setFieldsValue(model.initialValues);
    });
  }, [model.modeEditForm]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusLg />}
        onClick={() => model.toggleForm()}
      ></Button>
      <Drawer
        title={model.modeEditForm ? "Edit" : "Create"}
        placement="right"
        onClose={() => model.toggleForm()}
        open={model.openForm}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={model.loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
});
