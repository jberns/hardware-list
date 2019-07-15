import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';

const PermissionsPage = (props): JSX.Element => (
  <PleaseSignIn>
    <Permissions />
  </PleaseSignIn>
);

export default PermissionsPage;
