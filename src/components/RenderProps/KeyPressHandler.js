import {Component} from 'react'

class KeyPressHandler extends Component {
    
    handleKeyPress = this.handleKeyPress.bind(this)

    handleKeyPress (e) {
        if(e.key === this.props.chosenKey) {
            this.props.callback()
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress)
    }

    render() {
        return this.props.render()
    }
}

export default KeyPressHandler
