import logo from './logo.svg';
import MyRoutes from './routes';
import './App.css';
import { ProvideAuth } from './components/Hooks/useAuth';
function App() {
  return (
    <ProvideAuth>
      <MyRoutes></MyRoutes>
    </ProvideAuth>
  );
}

export default App;
