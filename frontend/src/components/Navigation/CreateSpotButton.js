import { useHistory } from "react-router-dom";

const CreateSpotButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/spots");
  };
  return <button onClick={handleClick}>Become A host</button>;
};

export default CreateSpotButton;
