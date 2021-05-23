import { Redirect, Route } from 'react-router-dom';
import MenuDrawer from './ui/MenuDrawer';
import Quizes from './pages/Quizes';
import Auth from './pages/Auth';
import Quiz from './pages/Quiz';
import QuizCreator from './pages/QuizCreator';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './components/Logout/Logout';
import { useEffect } from 'react';
import { fetchAuthLogin } from './redux/actions/auth';

function App() {
  const { token } = useSelector(({ Auth }) => Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthLogin());
  }, []);
  let routes = (
    <>
      {' '}
      <Route path="/" exact component={Quizes} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Redirect to="/" />
    </>
  );

  if (token) {
    routes = (
      <>
        {' '}
        <Route path="/" exact component={Quizes} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/logout" component={Logout} />
        <Route path="/quiz/:id" component={Quiz} />
        <Redirect to="/" />
      </>
    );
  }

  return (
    <>
      <MenuDrawer token={token} />

      <div className="content">{routes}</div>
    </>
  );
}

export default App;
