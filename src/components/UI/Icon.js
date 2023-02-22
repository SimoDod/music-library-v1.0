import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = (props) => {
  return <FontAwesomeIcon icon={props.icon} className={props.className} />;
}

export default Icon;