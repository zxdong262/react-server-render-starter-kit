import React from 'react'
import { Link } from 'react-router'

const CatLink = (cat, index, sep) =>  {

	const url = `/cats/${cat.id}`
	return (
		<span key={cat.id}>
			{index && sep?', ':''}
			<Link
				to={url}
				title={cat.desc || cat.title}
			>{cat.title}</Link>
		</span>
	)

}

export default CatLink