import './App.css';
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUp";
import Route from "./components/Route";
import {HOME_PAGE,SIGN_IN_PAGE,SIGN_UP_PAGE} from "./lib/Routes";
import { FireBaseProvider } from "./lib/Firebase/context";

function App() {
  return (
    <FireBaseProvider>
      <div className="App">
        <Route value={HOME_PAGE}>
          <ChatPage />
        </Route>
        <Route value={SIGN_UP_PAGE}>
          <SignUpPage />
        </Route>
      </div>
    </FireBaseProvider>
  );
}

export default App;
