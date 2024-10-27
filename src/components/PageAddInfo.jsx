import React from 'react'
import { Button } from 'antd'

function PageAddInfo({title, text, count, btnTitle}) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col">
				<h2 className="font-bold text-[23px] leading-[20px]">{title}</h2>
				<p className="font-medium text-[18px] leading-[18px] pl-[10px] text-[#002530] mt-5">{text} ({count})</p>
			</div>
			<Button size="large" type="primary">{btnTitle}</Button>
		</div>
	)
}

export default PageAddInfo