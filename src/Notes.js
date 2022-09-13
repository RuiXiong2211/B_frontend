import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Popconfirm, Button, Form, Input } from "antd";

const { Search } = Input;

const dataUrl =
  "http://notetaking-env.eba-cfpxsytp.ap-southeast-1.elasticbeanstalk.com/api/note";

const fetchData = async () => {
  const res = await axios({
    method: "GET",
    url: dataUrl,
  });
  return res.data;
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 5,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Notes = () => {
  const [form] = Form.useForm();
  const [notes, setNotes] = useState([]);

  const handleAdd = async (note) => {
    // add to api
    const response = await axios({
      method: "POST",
      url: dataUrl,
      data: {
        description: note,
      },
    });

    // add to state
    const newNote = response.data;

    setNotes([...notes, newNote]);
  };

  const handleDelete = (id) => {
    // delete in state
    const newData = notes.filter((item) => item._id !== id);
    setNotes(newData);

    // delete at api
    return axios({
      method: "DELETE",
      url: dataUrl + "/" + id,
    });
  };

  const handleUpdate = async (id, note) => {
    const response = await axios({
      method: "PUT",
      url: dataUrl + "/" + id,
      data: {
        description: note,
      },
    });
    const newNote = response.data;
    const updatedNotes = notes.map(note => note._id === id ? newNote : note)
    setNotes(updatedNotes)
  };

  const onFinish = (values) => {
    handleAdd(values.note);
  };

  const onSearch = (value, recordID) => {
    handleUpdate(recordID, value)
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created At",
      dataIndex: "noteDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_id, record) => (
        <Space size="middle">
          <Search
            placeholder="update note"
            onSearch={(value) => onSearch(value, record._id,)}
            style={{
              width: 200,
            }}
          />
          <>
            {notes.length >= 1 ? (
              <Popconfirm
                title={`Confirm Deletion of note with ID:${record._id}?`}
                onConfirm={() => handleDelete(record._id)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null}
          </>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function fetch() {
      const response = await fetchData();
      setNotes(response);
    }
    fetch();
  }, []);

  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter Note here" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={notes}
      />
    </div>
  );
};

export default Notes;
