import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Button, Pane } from 'evergreen-ui';
import User from './User';
import Signout from './Signout';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', (): void => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', (): void => {
  NProgress.done();
});

Router.events.on('routeChangeError', (): void => {
  NProgress.done();
});

const Header = (): JSX.Element => (
  <Pane display="flex" padding={16} background="tint2" alignItems="center">
    <Pane flex={1}>
      <Link href="/">
        <Button appearance="minimal">
          <a>QUADBLOCS BUILDER</a>
        </Button>
      </Link>
    </Pane>
    <User>
      {({ data: { me } }): JSX.Element => (
        <Pane>
          <Link href="/items">
            <Button appearance="minimal">
              <a>Shop</a>
            </Button>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <Button appearance="minimal">
                  <a>Sell</a>
                </Button>
              </Link>
              <Button appearance="minimal">
                <a>Orders</a>
              </Button>
              <Link href="/me">
                <Button appearance="minimal">
                  <a>Profile</a>
                </Button>
              </Link>
              <Signout />
            </>
          )}
          {!me && (
            <Link href="/signup">
              <Button appearance="minimal">
                <a>Sign In</a>
              </Button>
            </Link>
          )}
        </Pane>
      )}
    </User>
  </Pane>
);

export default Header;
