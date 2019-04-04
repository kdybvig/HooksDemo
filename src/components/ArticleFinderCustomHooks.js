import React, {useState, useEffect} from 'react'
import { fetchArticles } from '../articles';
import useOnKeyPress from './hooks/useOnKeyPress'
import useWindowWidth from './hooks/useWindowWidth';

const ArticleFinder = ({closeFinder}) => {
    const [articles, setArticles] = useState([]);
    const [searchText, setSearchText] = useState('');
    
    //update article length when screensize changes
    const windowWidth = useWindowWidth()
    const articleLength = Math.floor(Math.pow(windowWidth,1.5)/35)

    //close form when escape key is pressed
    useOnKeyPress('Escape', closeFinder)

    //fetch articles from server whenever search text changes
    useEffect(() => {
        let didCancel = false
        async function updateArticles () {
            const newArticles = await fetchArticles(searchText) 
            if(didCancel) return
            setArticles(newArticles)
        }
        updateArticles()
        
        return () => { 
            //avoid state changes when component is unmounted or searchText has changed
            didCancel = true
        }
    }, [searchText])

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
                value={searchText} 
                onChange={e=> setSearchText(e.target.value)}/>
            </h3>
            {!articles.length && <p>No results for {searchText}</p>}
            {articles.map((article, index) => {
                return (
                    <article key={'article-' + index}>
                        <h1>{article.title}</h1>
                        <p>{article.body.slice(0, articleLength) + ' ...'}</p>
                    </article>
                )
            }
            )}
        </div>
    )
   
}

export default ArticleFinder;