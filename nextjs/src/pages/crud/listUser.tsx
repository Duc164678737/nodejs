import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

interface DataType {
  key: string;
  name: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a color="geekblue">Invite {record.name}</a>
        <a color="volcano">Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    email: "abc@gmail.com",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "abc@gmail.com",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "abc@gmail.com",
  },
];

const App: React.FC = ({ users }: any): any => (
  <Table columns={columns} dataSource={users} />
);

export default App;

export async function getStaticProps() {
  const res = await axios.get("http://localhost:4000/users", );
  const users = await res.json(); 
  console.log(users);

  return {
    props: {
      users,
    },
  };
}
