import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Nav from '../components/Nav'
import Title from '../components/Title'
import { name } from '../common/constants'
import Footer from '../components/Footer'

class App extends React.Component {

  constructor(props) {

    super(props)
    this.checkTitle()
  }

  static async fetchData(props) {
    await props.getCats({}, 'set_cats')
  }

  checkNavBar() {
    //collapse button
    if(!$('.navbar-toggler').is(':visible')) $('#menus').addClass('in')
    else $('#menus').removeClass('in')
  }

  checkTitle() {
    let {title} = this.props
    if (typeof document !== 'undefined') document.title = title + (title?' - ':'') + name
  }

  componentDidMount() {
    App.fetchData(this.props)
    $(window).on('resize', this.checkNavBar)
    this.checkNavBar()
  }

  postAction() {
    this.checkNavBar()
    this.checkTitle()
  }

  componentDidUpdate() {
    this.postAction()
  }

  render() {
    return (
      <div id="content" className="container">
        <div className="row">
          <Nav {...this.props} />
          <div id="main" className="col-sm-8 col-md-8 col-lg-9 p-y-2 p-x-3">
            { this.props.onload || this.props.onloadCats || this.props.onloadPosts?<div className="loading">loading...</div>:null }
            { Title(this.props.title) }
            { this.props.children }
            { Footer }
          </div>
        </div>
      </div>
    )
    
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
