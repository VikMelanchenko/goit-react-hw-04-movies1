import { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
// закомментированы статические импорты
// import NotFoundView from './pages/NotFoundView/NotFoundView';
// import MoviesView from './pages/MoviesView/MoviesView';
// import HomeView from './pages/HomeView/HomeView';
// import MovieDetailsView from './pages/MovieDetailsView/MovieDetailsView';

// Разделение кода /динамические страницы/
const HomeView = lazy(() =>
  import(`./pages/HomeView/HomeView` /* webpackChunkName: "home-view" */)
);
const MoviesView = lazy(() =>
  import(`./pages/MoviesView/MoviesView` /* webpackChunkName: "movies-view" */)
);
const NotFoundView = lazy(() =>
  import(
    `./pages/NotFoundView/NotFoundView` /* webpackChunkName: "not-found-page-view" */
  )
);
const MovieDetailsView = lazy(() =>
  import(
    `./pages/MovieDetailsView/MovieDetailsView` /* webpackChunkName: "movie-details-view" */
  )
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
