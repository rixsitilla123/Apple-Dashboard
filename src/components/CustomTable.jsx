import React from 'react';
import { Table } from 'antd';
// const onChange = (pagination, filters, sorter, extra) => {console.log('params', pagination, filters, sorter, extra);};
const CustomTable = ({tHead, tBody, isLoading}) => <Table loading={isLoading} className='shadow-lg shadow-[#9fa838] rounded-[15px]' columns={tHead} dataSource={tBody} />;
export default CustomTable;