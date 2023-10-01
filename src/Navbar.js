export default function Navbar({ modeVal, comingFunc }) {
  function FunctionToSet(info) {
    comingFunc(info)
  }
  return (
    <nav className={`navbar fixed-top navbar-expand-lg navbar-${modeVal} bg-${modeVal}`}>
      <div className="container-fluid cnt">
        <a className="navbar-brand" href="/">NewsApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Link</a>
            </li>
          
           
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Action</a></li>
                <li><a className="dropdown-item" href="/">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Something else here</a></li>
              </ul>
            </li>
              <button onClick={()=>{
                FunctionToSet('general')
                }} className="catgItem1">General</button>

              <button onClick={()=>{
                FunctionToSet('entertainment')       
                }} className="catgItem1">Entertainment</button>

              <button onClick={()=>{
                FunctionToSet('health')        
                }} className="catgItem1">Health</button>

              <button onClick={()=>{
                FunctionToSet('sports')
                }} className="catgItem1">Sports</button>

              <button onClick={()=>{
                FunctionToSet('business')
                }} className="catgItem1">Business</button>

              <button onClick={()=>{
                FunctionToSet('science')       
                }} className="catgItem1">Science</button>

              <button onClick={()=>{
                FunctionToSet('technology')
                }} className="catgItem1">Technology</button>
           
            
            
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>


    </nav>
  );
}