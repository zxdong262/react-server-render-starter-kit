import React from 'react'
import CatLink from './CatLink'
import { name } from '../common/constants'
import { Link, browserHistory } from 'react-router'
import { types } from '../reducers'

export default class Nav extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			title: this.props.location.query.title || ''
		}
	}

	onChange = (e) => {
		this.setState({
			title: e.target.value
		})
	}

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      this.setState({
				title: nextProps.location.query.title || ''
			})
    }
  }

	onSearch = (e) => {
		e.preventDefault()
		browserHistory.push(`/s?title=${this.state.title}`)
	}

	render () {

		let {query} = this.props.location

		return (

			<div id="nav" className="col-sm-4 col-md-4 col-lg-3">

				<div className="hidden-sm-up clearfix p-y-1">
					<Link to="/">{name}</Link>
					<button className="navbar-toggler pull-xs-right" type="button" data-toggle="collapse" data-target="#menus">&#9776;</button>
				</div>

				<nav id="menus" className="collapse">
					<div className="p-y-1" />
					<div className="lists text-sm-right">
						<div className="hidden-sm-down">
							<Link to="/" className="font-weight-bold form-control-lg">{name}</Link>
							<hr />
						</div>

						<form action={'/s'} onSubmit={this.onSearch}>
							<div className="form-group">
								<div className="input-group">
									<input className="form-control" name="title" type="search" value={this.state.title} onChange={this.onChange} />
									<span className="input-group-btn">
										<button className="btn btn-secondary" type="submit">search</button>
									</span>
								</div>
							</div>
						</form>

						{(this.props.cats || []).map((c, i) => CatLink(c, i, false))}

					</div>
					
					<div className="p-y-1 hidden-sm-up" />
				</nav>

			</div>

		)
	}
}