import { HStack, Text, Checkbox, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

const Task = props => {
  const [checked, setChecked] = useState(false);
  return (
    <HStack w="full" borderRadius="md" border="1px solid #ccc" p={3}>
      <Text opacity={checked ? 0.3 : 1}>{props.content}</Text>
      <Spacer />
      <Checkbox isChecked={checked} onChange={() => setChecked(!checked)} />
    </HStack>
  );
};

export default Task;
