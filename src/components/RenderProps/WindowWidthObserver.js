import {Component} from 'react'

class WindowWidthObserver extends Component {
    
    state = { 
        width: window.innerWidth
    }

    handleResize = this.handleResize.bind(this)

    handleResize () {
        this.setState({width: window.innerWidth})
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        return this.props.render(this.state.width)
    }
}

export default WindowWidthObserver