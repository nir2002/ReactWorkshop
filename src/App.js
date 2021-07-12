import './App.css';
import { FireBaseProvider } from "./lib/Firebase/context";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Route,{AuthRoute} from "./components/Route";
import { HOME_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE } from "./lib/Routes";
import WithAuth from "./lib/Firebase/WithAuth";

function App() {
  const ProtectedRoute = WithAuth(Route);
  return (
    <FireBaseProvider>
      <div className="App">
        <AuthRoute value={HOME_PAGE}>
            <ChatPage />
        </AuthRoute>
        <Route value={SIGN_UP_PAGE}>
          <SignUpPage />
        </Route>
        <Route value={SIGN_IN_PAGE}>
          <SignInPage />
        </Route>
      </div>
    </FireBaseProvider>
  );
}

export default App;
