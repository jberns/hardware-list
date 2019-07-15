import Reset from '../components/Reset';

const ResetPage = (props): JSX.Element => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;
