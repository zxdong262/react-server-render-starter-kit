import React from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'
import Pager from '../components/Pager'

class S extends React.Component {

  constructor(props) {

    super(props)

  }

  static async fetchData(props) {
    let {params} = props
    let {query} = props.location
    await props.getPosts({
      ...query
    }, 'set_posts', () => {
      props.setProp({
        type: types.set_title
        ,data: 'search "' + query.title + '"'
      })
    })
  }

  componentDidMount() {
    if (!window.h5.state.posts) {
      S.fetchData(this.props)
    } else delete window.h5.state.posts
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      S.fetchData(nextProps)
    }
  }

  render() {

    let posts = this.props.posts || []
    let {query} = this.props.location
    return (

        <div className="posts">
          {
            posts.length
            ?posts.map((post, index) => Post(post, index, false))
            :<p>can not find any post with keyword: <b className="text-danger">{query.title}</b></p>
          }
          <Pager {...this.props} />
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(S)