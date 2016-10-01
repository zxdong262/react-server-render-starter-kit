import React from 'react'
import catLink from './CatLink'
import { createUrl, host, publicRoute } from '../common/constants'
import { Link } from 'react-router'

const Post = (post, index, isSingle = false) => {

	const url = `/${post.cat.id}/${post.id}`
	let title = isSingle
		?null
		:<h2>
			<Link to={url}>
				{post.title}
			</Link>
		</h2>

	return (
		<div className="post p-y-2" key={post.id}>
			{title}
			<hr />
			<p className="time">
				{'at '}
				<span className="text-muted">{post.date}</span>
				{', in '}
				{
					[post.cat].map(catLink)
				}
			</p>
			<div className="p-y-1" />
			<div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
		</div>
	)

}

export default Post