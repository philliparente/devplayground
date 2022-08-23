
import AppRoutes from './Routes'


function App() {

  return (
    <div className="row">
        <nav>
        <div className="nav-wrapper teal darken-3">
          <a href="/" className="brand-logo right">DevPlayground</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="/validate-avro-schema">Validate Avro Schema</a></li>
          </ul>
        </div>
      </nav>
      <div className="container">
      <div className="col s12">
        <AppRoutes />
      </div>
        </div>    
    </div>
        
    
  )
}

export default App
