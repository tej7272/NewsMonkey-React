import React, {useEffect,useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5dfaf24c15f546a7b263f1fa564edb92&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try{
      let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false);
        props.setProgress(100);
    }
    catch(e){

    }
  };

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page+1);
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5dfaf24c15f546a7b263f1fa564edb92&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

    return (
      <>
        <h1 className="text-center" style={{margin:'40px 0px', marginTop:'80px'}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles?.length} 
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container my-3">
        <div className="row">
        {articles?.length>0? articles.map((element)=>{
           return <div className="col-md-4" key={element.url}> 
                <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        }):<>Unable to load data this time</>}
        </div>
        </div>
        </InfiniteScroll>
      </> 
    )
}

News.defaultProps = {
  country : "In",
  category : "general",
  pageSize : 9
}

News.propTypes ={
  country:PropTypes.string,
  pageSize : PropTypes.number,
  category:PropTypes.string
}

export default News