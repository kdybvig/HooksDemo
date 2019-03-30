import React, {Component} from 'react'


function withOnKeyPress(chosenKey, callback) {
    return (WrappedComponent) => {
        return class extends Component {
        
            handleKeyPress = this.handleKeyPress.bind(this)
    
            handleKeyPress (e) {
                if(e.key === chosenKey) {
                    callback()
                }
            }
    
            componentDidMount() {
                if(typeof callback === 'string') {
                    callback = this.props[callback]
                }
                window.addEventListener('keydown', this.handleKeyPress)
            }
            
            componentWillUnmount() {
                window.removeEventListener('keydown', this.handleKeyPress)
            }
    
            render() {
                return <WrappedComponent {...this.props} />
            }
        }
    }
}

export default withOnKeyPress