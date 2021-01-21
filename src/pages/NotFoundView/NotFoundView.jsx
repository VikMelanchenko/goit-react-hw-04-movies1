import { useHistory, useLocation } from 'react-router-dom';

export default function NotFoundView() {
  const history = useHistory();
  const location = useLocation();

  const goToHomeView = () => {
    console.log(history);
    console.log(location);

    history.push('/');
  };
  goToHomeView();

  return <h1>404 Page not found :( </h1>;
}

// маршрут рендерится на все маршруты, короторые не объявлены в приложении
