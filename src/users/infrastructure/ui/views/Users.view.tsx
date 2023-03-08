import { Button, Space, Table } from "antd";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ArrowClockwise, PencilSquare, Trash } from "react-bootstrap-icons";
import { useContextGlobal } from "../../../../commons/infrastructure/ui/hooks/context-global.hook";
import { IUsersDomain } from "../../../domain/users.domain";
import { UsersForm } from "../components/UsersForm.component";
import { UsersViewModel } from "../view-models/users.view-model";

export const UsersView = observer(() => {
  const { globalStore } = useContextGlobal();
  const model = globalStore.container.get<UsersViewModel>("UsersViewModel");

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_: any, row: IUsersDomain) => (
        <>
          {row.firstName} {row.lastName}
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "address",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<PencilSquare />}
            onClick={() => handlerUpdateById(record.id)}
          />
          <Button
            type="default"
            danger
            icon={<Trash />}
            onClick={() => handlerDeleteById(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handlerDeleteById = (id: string) => {
    model.deleteById(id);
  };

  const handlerRefresh = () => {
    model.findAll();
  };

  const handlerUpdateById = async (id: string) => {
    model.toggleForm();
    model.modeEditForm = id;
  };

  useEffect(() => {
    model.findAll();
  }, []);

  return (
    <>
      <Title style={{ textAlign: "center" }} level={2}>
        Users
      </Title>
      <Space style={{ paddingBottom: "10px" }}>
        <UsersForm />
        <Button
          type="default"
          icon={<ArrowClockwise />}
          onClick={handlerRefresh}
          loading={model.loading}
        />
      </Space>
      <Table
        dataSource={model.data}
        columns={columns}
        rowKey="id"
        loading={model.loading}
      />
    </>
  );
});
