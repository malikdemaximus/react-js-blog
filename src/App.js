import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Footer from './Footer';
import Missing from './Missing';
import EditPost from './EditPost';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './Hooks/useAxios';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       if (response && response.data) {
  //         setPosts(response.data);
  //       }
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error ${err.message}`);
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  return (
    <div className="App">
      <Header title="React js blog" />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home isLoading={isLoading} fetchError={fetchError} />
        </Route>
        <Route exact path="/post" component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
