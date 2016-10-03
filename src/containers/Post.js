import React from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'

class Po extends React.Component {

  constructor(props) {

    super(props)

  }

  static async fetchData(props) {
    let {params} = props
    let pps = Object.keys(params)
    let {query} = props.location
    let req = pps.reduce((prev, prop) => {
      if(prop.indexOf('cat') > -1) return prev
      prev[prop] = params[prop]
      return prev
    }, {})
    await props.getPosts(req, 'set_post', (res) => {
      props.setProp({
        type: types.set_title
        ,data: res.result[0].title
      })
    })
  }

  componentDidMount() {
    if (!window.h5.state.posts) {
      Po.fetchData(this.props)
    } else delete window.h5.state.posts
  }

  componentWillReceiveProps(nextProps) {
    if(
      JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params)
      ) {
      Po.fetchData(nextProps)
    }
  }

  render() {

    let {post} = this.props

    return (

        <div className="posts">
          { post && Post(post, 0, true) }
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Po)