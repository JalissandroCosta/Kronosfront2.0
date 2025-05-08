'use client'
<<<<<<< HEAD
import { useVisitanteData } from "@/hooks/visitante/useVisitanteData";
import { TableClient } from "./_componentes/table-client";
=======
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
>>>>>>> 63c34134e335e46450efb2574a2030a43a74df09


export default function PageVisitas() {

<<<<<<< HEAD
     const { data } = useVisitanteData()
      // const [open, setOpen] = useState(false)
=======
const VisitorManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<Visitor | null>(null);
  const [searchText, setSearchText] = useState('');

  // handlers
  const openForm = () => setIsModalVisible(true);
  const closeForm = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish: FormProps<Visitor>['onFinish'] = (values) => {
    const newVisitor: Visitor = {
      ...values,
      id: Date.now().toString(),
      visitDate: moment(values.visitDate).toISOString(),
      status: 'pending',
    };
    setVisitors((prev) => [...prev, newVisitor]);
    closeForm();
    notification.success({ message: 'Visitante registrado com sucesso' });
  };

  const handleApprove = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v))
    );
    notification.success({ message: 'Visita aprovada' });
  };

  const handleReject = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v))
    );
    notification.error({ message: 'Visita rejeitada' });
  };

  const showDetails = (visitor: Visitor) => {
    setCurrentVisitor(visitor);
    notification.info({ message: 'Exibindo detalhes do visitante' });
  };

  const filteredData = useMemo(() => {
    return visitors.filter((v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase()) ||
      v.prisonerName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [visitors, searchText]);

  const columns = [
    {
      title: 'Nome Visitante',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Visitor, b: Visitor) => a.name.localeCompare(b.name),
    },
    {
      title: 'Nome Preso',
      dataIndex: 'prisonerName',
      key: 'prisonerName',
      sorter: (a: Visitor, b: Visitor) => a.prisonerName.localeCompare(b.prisonerName),
    },
    {
      title: 'Data Visita',
      dataIndex: 'visitDate',
      key: 'visitDate',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
      sorter: (a: Visitor, b: Visitor) =>
        moment(a.visitDate).unix() - moment(b.visitDate).unix(),
    },
    {
      title: 'Tipo',
      key: 'type',
      filters: [
        { text: 'Advogado', value: 'lawyer' },
        { text: 'Familiar', value: 'relative' },
      ],
      onFilter: (value: string | boolean | React.Key, record: Visitor) =>
        (value === 'lawyer' && record.isLawyer) ||
        (value === 'relative' && record.isRelative),
      render: (_: any, record: Visitor) => (
        <>
          {record.isLawyer && <Tag color="blue">Advogado</Tag>}
          {record.isRelative && (
            <Tag color="green">Familiar ({record.relationship})</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pendente', value: 'pending' },
        { text: 'Aprovado', value: 'approved' },
        { text: 'Rejeitado', value: 'rejected' },
      ],
      onFilter: (value: string | boolean | React.Key, record: Visitor) => record.status === value,
      render: (status: string) => {
        const color =
          status === 'approved'
            ? 'green'
            : status === 'rejected'
            ? 'red'
            : 'orange';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Visitor) => (
        <Space>
          <Button type="link" onClick={() => showDetails(record)}>
            Detalhes
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="link"
                onClick={() => handleApprove(record.id)}
              >
                Aprovar
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleReject(record.id)}
              >
                Rejeitar
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];
>>>>>>> 63c34134e335e46450efb2574a2030a43a74df09

  return (
     <section className="flex w-full flex-col items-center justify-center gap-3 p-4">
          <div className="flex w-full">
            <h2 className="text-2xl font-bold uppercase">Lista de Visitantes</h2>
          </div>
          <TableClient data={data} />
        </section>

  )
}