// 'use client'
// import React, { useState, useMemo } from 'react'
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   Checkbox,
//   Card,
//   Table,
//   Modal,
//   Tag,
//   Space,
//   Row,
//   Col,
//   DatePicker,
//   notification
// } from 'antd'
// import type { FormProps } from 'antd'
// import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
// import moment from 'moment'

// type Visitor = {
//   id: string
//   name: string
//   document: string
//   prisonerName: string
//   prisonerId: string
//   isLawyer: boolean
//   isRelative: boolean
//   relationship?: string
//   visitDate: string
//   status: 'pending' | 'approved' | 'rejected'
// }

// const { Option } = Select

// const VisitorManagement: React.FC = () => {
//   const [form] = Form.useForm()
//   const [visitors, setVisitors] = useState<Visitor[]>([])
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [currentVisitor, setCurrentVisitor] = useState<Visitor | null>(null)
//   const [searchText, setSearchText] = useState('')

//   // handlers
//   const openForm = () => setIsModalVisible(true)
//   const closeForm = () => {
//     form.resetFields()
//     setIsModalVisible(false)
//   }

//   const onFinish: FormProps<Visitor>['onFinish'] = (values) => {
//     const newVisitor: Visitor = {
//       ...values,
//       id: Date.now().toString(),
//       visitDate: moment(values.visitDate).toISOString(),
//       status: 'pending'
//     }
//     setVisitors((prev) => [...prev, newVisitor])
//     closeForm()
//     notification.success({ message: 'Visitante registrado com sucesso' })
//   }

//   const handleApprove = (id: string) => {
//     setVisitors((prev) =>
//       prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v))
//     )
//     notification.success({ message: 'Visita aprovada' })
//   }

//   const handleReject = (id: string) => {
//     setVisitors((prev) =>
//       prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v))
//     )
//     notification.error({ message: 'Visita rejeitada' })
//   }

//   const showDetails = (visitor: Visitor) => {
//     setCurrentVisitor(visitor)
//     notification.info({ message: 'Exibindo detalhes do visitante' })
//   }

//   const filteredData = useMemo(() => {
//     return visitors.filter(
//       (v) =>
//         v.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         v.prisonerName.toLowerCase().includes(searchText.toLowerCase())
//     )
//   }, [visitors, searchText])

//   const columns = [
//     {
//       title: 'Nome Visitante',
//       dataIndex: 'name',
//       key: 'name',
//       sorter: (a: Visitor, b: Visitor) => a.name.localeCompare(b.name)
//     },
//     {
//       title: 'Nome Preso',
//       dataIndex: 'prisonerName',
//       key: 'prisonerName',
//       sorter: (a: Visitor, b: Visitor) =>
//         a.prisonerName.localeCompare(b.prisonerName)
//     },
//     {
//       title: 'Data Visita',
//       dataIndex: 'visitDate',
//       key: 'visitDate',
//       render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
//       sorter: (a: Visitor, b: Visitor) =>
//         moment(a.visitDate).unix() - moment(b.visitDate).unix()
//     },
//     {
//       title: 'Tipo',
//       key: 'type',
//       filters: [
//         { text: 'Advogado', value: 'lawyer' },
//         { text: 'Familiar', value: 'relative' }
//       ],
//       onFilter: (
//         value: string | number | boolean | React.Key,
//         record: Visitor
//       ) =>
//         (value === 'lawyer' && record.isLawyer) ||
//         (value === 'relative' && record.isRelative),
//       render: (_: any, record: Visitor) => (
//         <>
//           {record.isLawyer && <Tag color="blue">Advogado</Tag>}
//           {record.isRelative && (
//             <Tag color="green">Familiar ({record.relationship})</Tag>
//           )}
//         </>
//       )
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       filters: [
//         { text: 'Pendente', value: 'pending' },
//         { text: 'Aprovado', value: 'approved' },
//         { text: 'Rejeitado', value: 'rejected' }
//       ],
//       onFilter: (value: string | number | boolean, record: Visitor) =>
//         record.status === value,
//       render: (status: string) => {
//         const color =
//           status === 'approved'
//             ? 'green'
//             : status === 'rejected'
//               ? 'red'
//               : 'orange'
//         return <Tag color={color}>{status.toUpperCase()}</Tag>
//       }
//     },
//     {
//       title: 'Ações',
//       key: 'actions',
//       render: (_: any, record: Visitor) => (
//         <Space>
//           <Button type="link" onClick={() => showDetails(record)}>
//             Detalhes
//           </Button>
//           {record.status === 'pending' && (
//             <>
//               <Button type="link" onClick={() => handleApprove(record.id)}>
//                 Aprovar
//               </Button>
//               <Button
//                 type="link"
//                 danger
//                 onClick={() => handleReject(record.id)}
//               >
//                 Rejeitar
//               </Button>
//             </>
//           )}
//         </Space>
//       )
//     }
//   ]

//   return (
//     <div className="visitor-management">
//       <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
//         <Col>
//           <Input
//             placeholder="Buscar visitante ou preso"
//             prefix={<SearchOutlined />}
//             allowClear
//             onChange={(e) => setSearchText(e.target.value)}
//             style={{ width: 300 }}
//           />
//         </Col>
//         <Col>
//           <Button type="primary" icon={<PlusOutlined />} onClick={openForm}>
//             Novo Registro
//           </Button>
//         </Col>
//       </Row>
//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         rowKey="id"
//         pagination={{ pageSize: 5 }}
//         scroll={{ x: 'max-content' }}
//         onRow={(record) => ({
//           onClick: () => showDetails(record)
//         })}
//       />

//       <Modal
//         title="Registrar Visitante"
//         open={isModalVisible && !currentVisitor}
//         onCancel={closeForm}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           initialValues={{ isLawyer: false, isRelative: false }}
//         >
//           <Form.Item
//             label="Nome do Visitante"
//             name="name"
//             rules={[{ required: true, message: 'Insira o nome do visitante' }]}
//           >
//             <Input placeholder="Nome completo" />
//           </Form.Item>

//           <Form.Item
//             label="Documento"
//             name="document"
//             rules={[{ required: true, message: 'Insira o documento' }]}
//           >
//             <Input placeholder="CPF ou RG" />
//           </Form.Item>

//           <Form.Item
//             label="Nome do Preso"
//             name="prisonerName"
//             rules={[{ required: true, message: 'Insira o nome do preso' }]}
//           >
//             <Input placeholder="Nome completo" />
//           </Form.Item>

//           <Form.Item
//             label="ID do Preso"
//             name="prisonerId"
//             rules={[{ required: true, message: 'Insira o ID do preso' }]}
//           >
//             <Input placeholder="Número de registro" />
//           </Form.Item>

//           <Form.Item
//             label="Data e Hora da Visita"
//             name="visitDate"
//             rules={[{ required: true, message: 'Selecione data e hora' }]}
//           >
//             <DatePicker showTime style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item name="isLawyer" valuePropName="checked">
//             <Checkbox>Advogado</Checkbox>
//           </Form.Item>

//           <Form.Item name="isRelative" valuePropName="checked">
//             <Checkbox>Familiar</Checkbox>
//           </Form.Item>

//           <Form.Item
//             noStyle
//             shouldUpdate={(prev, curr) => prev.isRelative !== curr.isRelative}
//           >
//             {({ getFieldValue }) =>
//               getFieldValue('isRelative') ? (
//                 <Form.Item
//                   label="Grau Parentesco"
//                   name="relationship"
//                   rules={[
//                     { required: true, message: 'Especifique o parentesco' }
//                   ]}
//                 >
//                   <Select placeholder="Selecione">
//                     <Option value="pai/mãe">Pai/Mãe</Option>
//                     <Option value="filho(a)">Filho(a)</Option>
//                     <Option value="irmão(ã)">Irmão(ã)</Option>
//                     <Option value="cônjuge">Cônjuge</Option>
//                     <Option value="outro">Outro</Option>
//                   </Select>
//                 </Form.Item>
//               ) : null
//             }
//           </Form.Item>

//           <Form.Item>
//             <Button block type="primary" htmlType="submit">
//               Salvar
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="Detalhes do Visitante"
//         open={!!currentVisitor}
//         onCancel={() => setCurrentVisitor(null)}
//         footer={null}
//       >
//         {currentVisitor && (
//           <Card variant="outlined">
//             <p>
//               <strong>Nome:</strong> {currentVisitor.name}
//             </p>
//             <p>
//               <strong>Documento:</strong> {currentVisitor.document}
//             </p>
//             <p>
//               <strong>Preso:</strong> {currentVisitor.prisonerName}
//             </p>
//             <p>
//               <strong>ID Preso:</strong> {currentVisitor.prisonerId}
//             </p>
//             <p>
//               <strong>Data Visita:</strong>{' '}
//               {moment(currentVisitor.visitDate).format('DD/MM/YYYY HH:mm')}
//             </p>
//             <p>
//               <strong>Status:</strong>{' '}
//               <Tag
//                 color={
//                   currentVisitor.status === 'approved'
//                     ? 'green'
//                     : currentVisitor.status === 'rejected'
//                       ? 'red'
//                       : 'orange'
//                 }
//               >
//                 {currentVisitor.status.toUpperCase()}
//               </Tag>
//             </p>
//           </Card>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default VisitorManagement



export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1>Pagina de Visitas ou Visitantes em desenvolvimentos</h1>
    </div>
  );
}
