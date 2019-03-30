import React, {Component} from 'react'
import { fetchArticles } from '../articles';
import {compose} from "recompose";
import withOnKeyPress from './HOCs/withOnKeyPress';
import withWindowWidth from './HOCs/withWindowWidth';

class ArticleFinder extends Component{
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            searchText: ''
        }
        //don't forget to bind functions
        this.handleInputChange = this.handleInputChange.bind(this)
        this._isMounted = false;
    }
    
   //fetch articles from server whenever search text changes
    async updateArticles () {
        const newArticles = await fetchArticles(this.state.searchText) 
        if(this._isMounted) this.setState({articles: newArticles})
    }

    //initial fetch of articles
    componentDidMount() {
        this._isMounted = true
        this.updateArticles()
    }

    // update articles when searchText changes
    componentDidUpdate(prevProps, prevState) {
        if(this.state.searchText === prevState.searchText) {
            return
        } else {
            this.updateArticles()
        }
    }

    // avoid setting state when component is unmounted
    componentWillUnmount() {
        this._isMounted = false
    }


    //handle search text input change
    handleInputChange(e) {
        this.setState({ searchText: e.target.value })
    }

    render () {
        return (
            <div>
                <h1>Article Finder</h1>
                <h5 
                    style={{color: 'red'}}>
                    Press Escape At Any Time To Close Article Finder
                </h5>
                <h3>
                    Find me articles about 
                    <input 
                        type='text' 
                        value={this.state.searchText} 
                        onChange={this.handleInputChange}/>
                </h3>
                {this.state.articles.map((article, index) => {
                    return (
                        <article key={'article-' + index}>
                            <h1>{article.title}</h1>
                            <p>{article.body.slice(0, Math.floor(Math.pow(this.props.windowWidth,1.5)/35)) + ' ...'}</p>
                        </article>
                    )
                }
                )}
            </div>
        )
    }
   
}

const enhance = compose(
    withOnKeyPress('Escape', 'closeFinder'),
    withWindowWidth
)

export default enhance(ArticleFinder);