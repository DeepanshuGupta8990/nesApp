import NewsItem from "./NewsItem";
import {useEffect, useRef, useState} from 'react';
import Spinner from './Spinner.js'

export default function News({modeVal , newsCatg}){

    const [state, setstate] = useState({
      articles : [],
      loading : true
    });
    
    const [propNews,setPropNews] = useState(newsCatg);

    const pageSize = useRef(24);

    // const [url,setUrl] = useState('https://newsapi.org/v2/top-headlines?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current));
    const [url,setUrl] = useState('https://serverfornewsapp.tanujagupta.repl.co/?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current));
    const [scrolled, setScrolled] = useState(1);

    const [pageNumber, setPageNumber] = useState(1);

    const loader = useRef(null);

    const [spinner1, setSpinner1] = useState(true);

    const newsCount = useRef(null);
    
    useEffect(()=>{
    setPageNumber(prevstate=>1);
      if(propNews!==newsCatg){
           
      setPropNews(prev=>newsCatg)

      // setUrl(prev=>'https://newsapi.org/v2/top-headlines?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current))
      setUrl(prev=>'https://serverfornewsapp.tanujagupta.repl.co/?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current))

      // fetch('http://localhost:4500/?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current))
      // fetch('https://newsapi.org/v2/top-headlines?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current))
      fetch('https://serverfornewsapp.tanujagupta.repl.co/?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page=1&pageSize='+(pageSize.current)).then((response)=>{
        return (response.json())
    }).then((response)=>{
      // console.log(response)
      response = JSON.parse(response)
      newsCount.current = response.totalResults;
      setstate({articles: response.articles});
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }).catch((err)=>{
      console.log("Err arrived"+err);
    })
      }
      if(propNews===newsCatg){

      fetch(url).then((response)=>{
        console.log(response.status);
         let aaaa =response.json()
          return (aaaa)
      }).then((response)=>{
        newsCount.current = response.totalResults;
        response = JSON.parse(response)
        setstate({articles: response.articles});
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }).catch((err)=>{
        console.log("Err arrived"+err);
      })
    
      }
      return ()=>{
        setstate({
        articles:[],
        loading:true
        })
        setSpinner1(true);
        console.log("Cleanup function is running")
      }
    
    },[newsCatg])

  useEffect(() => {

    const handleScroll = () => {
    
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const twentyPercentHeight = viewportHeight * 0.2; // 20% of the viewport height
      if (scrollPosition > twentyPercentHeight) {
        setScrolled(2);
        
      } else {
        setScrolled(1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

 
  const fetchItems = () => {
   let newArticles;
  //  fetch('https://newsapi.org/v2/top-headlines?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page='+pageNumber+'&pageSize='+(pageSize.current))
   fetch('https://serverfornewsapp.tanujagupta.repl.co/?country=in&category='+newsCatg+'&apiKey=73c894da83aa4023961bbdf0c4de30a1&page='+pageNumber+'&pageSize='+(pageSize.current)).then((response)=>{
    return (response.json())
}).then((response)=>{
  response = JSON.parse(response)
   newArticles = response.articles;
   if(newArticles.length>0){
     setstate(prevState => ({ 
      articles: [...prevState.articles, ...newArticles] 
    }));
    
   }
   if(state.articles.length===newsCount.current){
    setSpinner1(false);
   }
}).catch((err)=>{
  console.log("Err arrived");
})

  }
  useEffect(() => {
    if(state.articles.length <= newsCount.current){
    if(pageNumber>1){
      fetchItems();
      console.log("ObsreverFunc")

    }
  }
  return ()=>{
    if(propNews!==newsCatg){
      setstate({
        articles:[],
        loading:true
        })
    }
  }
  }, [pageNumber]);


  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && pageNumber<=Math.ceil(newsCount.current/pageSize.current+1)){
      if(spinner1){
        setPageNumber((pageNumber) => pageNumber + 1);
      }
    }
 
  }

   
  return(
    <>
    <div id="news" className={modeVal}>
      {state.loading&&<Spinner/>}
     {state.articles.map((el)=>{
          return(
            <a  key={el.urlToImage!==null?el.urlToImage:el.url} href={el.url}>
            <div className="nn">
            <NewsItem modevalue={modeVal} title={el.title===null?el.title:(el.title.slice(0,40)+"...")} description={el.description===null?el.description:(el.description.slice(0,65)+"...")} src1={el.urlToImage!==null?el.urlToImage:"https://www.shutterstock.com/image-vector/latest-news-megaphone-label-600w-737889223.jpg"} url1={el.url} date={el.publishedAt} author={el.author} source={el.source.name}/>
            </div>
            </a>
          );
        })}
        </div>


    <div ref={loader} >{spinner1?"Fetching More News":"Fetched All News"}</div>
 
       {spinner1 && <div  style={{width:"100vw",display:"flex",justifyContent:'center'}}><Spinner/></div>}
        <footer  id="footer1" className={`${modeVal}`}>
       
  


         {(scrolled === 2) && <button id="btn3" onClick={()=>{
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}>&uarr;</button>}
          {(scrolled === 1)&& <button id="btn4" onClick={()=>{
            window.scrollTo({top: document.documentElement.scrollHeight, left: 0, behavior: 'smooth' })
          }}>&darr;</button>}
        </footer>

    </>
  );
}




// https://serverfornewsapp.tanujagupta.repl.co
// http://localhost:4500/