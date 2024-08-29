import React, { useState } from 'react';
import { Table, Select, Input, Button } from 'antd';

const { Option } = Select;
const { Search } = Input;

export const UserTable = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [changedUsers, setChangedUsers] = useState([]);

  const handleSelectChange = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );

    setChangedUsers((prevChangedUsers) => {
      const existingUser = prevChangedUsers.find((u) => u.id === id);
      if (existingUser) {
        return prevChangedUsers.map((u) =>
          u.id === id ? { ...u, [field]: value } : u
        );
      } else {
        return [...prevChangedUsers, { id, [field]: value }];
      }
    });
  };

  const handleSaveChanges = () => {
    console.log('Измененные пользователи:', changedUsers);
    
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastname',
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="Поиск по фамилии"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onSearch={() => confirm()}
            enterButton
          />
        </div>
      ),
      onFilter: (value, record) =>
        record.lastname.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Имя',
      dataIndex: 'firstaname',
    },
    {
      title: 'Отчество',
      dataIndex: 'middlename',
    },
    {
      title: 'Активность карты',
      dataIndex: 'cardActive',
      render: (text, record) => (
        <Select
          value={record.cardActive ? 'true' : 'false'}
          onChange={(value) =>
            handleSelectChange(record.id, 'cardActive', value === 'true')
          }
        >
          <Option value="true">Активна</Option>
          <Option value="false">Неактивна</Option>
        </Select>
      ),
      filters: [
        { text: 'Активна', value: 'true' },
        { text: 'Неактивна', value: 'false' },
      ],
      onFilter: (value, record) =>
        (record.cardActive ? 'true' : 'false') === value,
    },
    {
      title: 'Привилегия',
      dataIndex: 'privilegia',
      render: (text, record) => (
        <Select
          value={record.privilegia}
          onChange={(value) => handleSelectChange(record.id, 'privilegia', value)}
        >
          <Option value="standart">Standart</Option>
          <Option value="advanced">Advanced</Option>
          <Option value="vip">VIP</Option>
        </Select>
      ),
      filters: [
        { text: 'Standart', value: 'standart' },
        { text: 'Advanced', value: 'advanced' },
        { text: 'VIP', value: 'vip' },
      ],
      onFilter: (value, record) => record.privilegia === value,
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={false} />
      <Button type="primary" onClick={handleSaveChanges} style={{ marginTop: 16 }}>
        Сохранить изменения
      </Button>
    </div>
  );
};