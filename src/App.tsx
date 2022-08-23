
import AppRoutes from './Routes'


function App() {

  return (
    <div className="row">
        <nav>
        <div className="nav-wrapper teal darken-3">
          <a href="/devplayground" className="brand-logo right">DevPlayground</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="/devplayground/validate-avro-schema">Validate Avro Schema</a></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <AppRoutes />
      </div>    
    </div>
        
    
  )
}

export default App
