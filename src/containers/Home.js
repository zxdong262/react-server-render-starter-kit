import React from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { types } from '../reducers'
import Pager from '../components/Pager'

class Home extends React.Component {

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
        ,data: ''
      })
    })
  }

  componentDidMount() {
    Home.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      Home.fetchData(nextProps)
    }
  }

  render() {

    let {posts} = this.props
    return (

        <div>
          <div className="posts">
            {(posts || []).map((post, index) => Post(post, index, false))}
          </div>
          <Pager {...this.props} />
        </div>
        
    )
  }
}

let mapStateToProps = state => state
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)