import React from 'react'
import { Link } from 'react-router'
import RPager from 'react-pagenav'

export default class Pager extends React.Component {

	constructor (props) {
		super(props)
	}

	unitRender() {

    return (unit, index) => {
      let {query, pathname} = this.props.location
      let span = unit.isPager
                ?<span aria-hidden={true} dangerouslySetInnerHTML={ {__html: unit.html} } />
                :<span dangerouslySetInnerHTML={ {__html: unit.html} } />

      let sr = unit.isPager
              ?<span className="sr-only" dangerouslySetInnerHTML={ {__html: unit.srHtml} } />
              :null

      let url = {
        pathname,
        query: {
          ...query,
          page: (unit.page === 1
                ?undefined
                :unit.page)
        }
      } 
        

      return (
        <li key={index} className={'page-item ' + unit.class}>
          <Link className="page-link" to={url} aria-label={unit.ariaLabel}>
            {span}
            {sr}
          </Link>
        </li>
      )
    }

	}

	render () {

		let {query} = this.props.location
    let {total, post} = this.props
    let pageSize = 20
    let maxLink = 5
    let state = {
      page: parseInt(query.page || 1, 10),
      maxLink,
      pageSize,
      total,
      unitRender: this.unitRender.bind(this)()
    }
		return total > pageSize
      ?<RPager {...state} />
      :null
	}
}