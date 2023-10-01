import {useRef,useEffect} from 'react';
export default function NewsItem({title,description,src1,modevalue,date,author,source}) {
  
  const myRef = useRef(null);
  const sourceRef  = useRef(null);
 
  useEffect(() => {
    const currentRef = myRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(modevalue === 'light'){
          if (entry.isIntersecting) {
            currentRef.style.transition='opacity 2s ease-in-out'
            currentRef.style.boxShadow = '0px 0px 12px 8px grey'
          }else{
            currentRef.style.transition='opacity 2s ease-in-out'
            currentRef.style.boxShadow = '0px 0px 0px 0px grey'
          } 
        }    
        else if(modevalue === 'dark'){
          if (entry.isIntersecting) {
            currentRef.style.transition='opacity 2s ease-in-out'
            currentRef.style.boxShadow = '0px 0px 1px 1px cyan'
          }else{
            currentRef.style.transition='opacity 2s ease-in-out'
            currentRef.style.boxShadow = '0px 0px 0px 0px cyan'
          } 
        }
        },{
          root: null,
          rootMargin: '-40px 0px',
          threshold: 0.7
        }
    );

    if (currentRef) {
      observer.observe(currentRef);
      
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [myRef,modevalue]);

  return (
    <>
    <div  ref={myRef} onMouseLeave={()=>{sourceRef.current.style.opacity = 1;}} onMouseEnter={()=>{sourceRef.current.style.opacity = 0;}} className={`${modevalue}card card`} style={{ width:"18rem" , position:"relative"}}>
  <img  src={src1} className="card-img-top img1" alt="..."/>
  <p ref={sourceRef} id='paraSource' style={{background:"red",width:"140px",padding:"1px 4px",borderRadius:"4px",position:"absolute",top:"0vh",left:"9.2rem"}}>{source}</p>
  <div className="card-body">
    <p>Published at : {date.slice(0,10)}</p>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p><b>{author!=null?"Author : "+author.slice(0,20):""}</b></p>
    <button  className="btn btn-primary">Read more</button>
  </div>
</div>
    </>
  )
}
