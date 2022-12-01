import react, { useState } from 'react'
import './App.css';
import UserLogin from './component/userLogin';
import UserManagement from './component/UserManagement';
function App() {
  const [isLogin, setisLogin] = useState(false);
  return (
    <div>
      {
        isLogin ? <UserManagement /> : <UserLogin setisLogin={setisLogin} />
      }
    </div>
  );
}

export default App;
