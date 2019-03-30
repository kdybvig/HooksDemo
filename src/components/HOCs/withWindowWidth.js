import React, {Component} from 'react';

function withWindowWidth (WrappedComponent) {
    return class extends Component {

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
            return <WrappedComponent windowWidth={this.state.width} {...this.props}/>
        }
    }
} 

export default withWindowWidth