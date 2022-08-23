import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ValidationPage from './pages/ValidationPage';


const AppRoutes = () => {
    return (        
        <Router>
            <Routes>
                <Route path="/validate-avro-schema" element={<ValidationPage />}></Route>
                <Route path="/" element={<IndexPage />}></Route>
            </Routes>
        </Router>
        
    )
}

export default AppRoutes;