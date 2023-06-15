import MyRoutes from './routes/routes.js';
import './App.css';
import { ProvideAuth } from './hooks/useAuth.js';
function App() {
  return (
    <ProvideAuth>
      <MyRoutes></MyRoutes>
    </ProvideAuth>
  );
}

export default App;
