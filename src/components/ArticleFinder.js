import React, {useState, useEffect} from 'react'
import { fetchArticles } from '../articles';

const ArticleFinder = ({closeFinder}) => {
    const initialLength = Math.floor(Math.pow(window.innerWidth,1.5)/35)
    const [articles, setArticles] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [articleLength, setArticleLength] = useState(initialLength)

    //update article length when screensize changes
    useEffect(() => {
        function handleResize () {
            const newLength = Math.floor(Math.pow(window.innerWidth,1.5)/35)
            setArticleLength(newLength)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    //close form when escape key is pressed
    useEffect(()=> {
        function handleKeypress(e) {
            if(e.key === 'Escape') closeFinder()
        }
        window.addEventListener('keydown', handleKeypress)

        return () => {
            window.removeEventListener('keydown', handleKeypress)
        }
    }, [])

    //fetch articles from server whenever search text changes
    useEffect(() => {
        async function updateArticles () {
            const newArticles = await fetchArticles(searchText) 
            setArticles(newArticles)
        }
        updateArticles()
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