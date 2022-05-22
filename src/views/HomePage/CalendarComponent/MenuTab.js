import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const MenuTab = props => {
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!isClicked)
  return (
    <Button
      colorScheme={isClicked ? 'purple' : 'gray'}
      size="sm"
      borderRadius="full"
      onClick={handleClick}
    >
      {props.title}
    </Button>
  );
};

export default MenuTab;
