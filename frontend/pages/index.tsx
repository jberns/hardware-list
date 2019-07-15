import Home from '../components/Home';
import { Button } from 'evergreen-ui';

const HomePage = (props): JSX.Element => (
  <div>
    <Home />
    <Button>
      I am using{' '}
      <span role="img" aria-label="tree">
        🌲
      </span>
      ! and now with typescript!
    </Button>
  </div>
);

export default HomePage;
