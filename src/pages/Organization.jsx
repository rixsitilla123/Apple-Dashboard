import React, { useEffect, useState } from 'react'
import PageAddInfo from '../components/PageAddInfo'
import { Input, Select, Switch } from 'antd'
import CustomTable from '../components/CustomTable'
import { HTTP } from '../hook/useEnv';
import axios from 'axios';
import useDebounce from '../hook/useDebounce'
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Organization() {
	const [tBodyData, setTBodyData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)

	const tHeadData = [
		{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: 'Nomi',
			dataIndex: 'name',
		}, {
			title: 'INN',
			dataIndex: 'inn',
		}, {
			title: 'Director',
			dataIndex: 'director',
		}, {
			title: 'Yaratilgan vaqt',
			dataIndex: 'createdAt',
		}, {
			title: 'Manzil',
			dataIndex: 'address',
		}, {
			title: 'Holati',
			dataIndex: 'status',
		}, {
			title: 'Batafsil',
			dataIndex: 'action',
		},
	];

	// search part start 
	const [searchData, setSearchData] = useState("")
	function handleSearchOrganization(e) {
		setIsLoading(true)
		setSearchData(e.target.value.toLowerCase())
		if(!e.target.value) {
			setTimeout(() => setRefresh(!refresh), 1000)
		}
	}

	const searchByName = useDebounce(searchData, 1000)

	useEffect(() => {
		if(searchByName){
			setIsLoading(false)
			const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
			setSearchData(filteredData)
		}
	}, [searchByName])
	// search part end

	// axios get all start
	useEffect(() => {
		axios(`${HTTP}/organization`).then(res => {
			setIsLoading(false)	
			setTBodyData(res.data.map(item => {
				item.action = <div className="flex items-center gap-[22px]">
					<EditOutlined className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-blue-600'/>
					<DeleteOutlined className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-red-600'/>
					<DashOutlined className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-green-600'/>
				</div>
				item.status = <Switch size='small' defaultChecked={JSON.parse(item.status)}/>
				return item
			}))
		})
	}, [refresh])
	// axios get all end

	return (
		<div className='p-6'>
			<PageAddInfo title={"Tashkilotlar"} text={"Tashkilotlar"} count={8} btnTitle={"Qoshish"} />
			<div className="w-[630px] my-5 flex items-center gap-[30px]">
				<Input onChange={handleSearchOrganization} allowClear placeholder='Qidirish...' type='text' size='large' />
				<Select showSearch placeholder="INN Tanlash" optionFilterProp="label" size="large" options={[{value: 'jack', label: 'Jack'}]}/>
			</div>
			<CustomTable isLoading={isLoading} tHead={tHeadData} tBody={tBodyData}/>
		</div>
	)
}

export default Organization