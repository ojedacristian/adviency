import { Box, Button, FormControl, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from "@chakra-ui/react"
import { GiftForm } from './App';

interface ModalProps {
  handleAdd: ()=> void,
  formValue: GiftForm,
  cantidad: number,
  handleNumberChange: (e: number)=> void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}

export const Modal = ( { handleAdd, formValue, cantidad, handleNumberChange, handleChange}: ModalProps ) => {
  return (
    <Box
    w='full' position='fixed' 
    top={0}
    bottom={0}
    right={0}
    left={0}
    backgroundColor='gray.700'
    >

    <VStack >
      <FormControl>
        <Input name="name" placeholder="Nuevo regalo" variant='filled' value={formValue.name} onChange={(e) => handleChange(e)} />
      </FormControl>
      <FormControl>
        <Input name="image" placeholder="Link de la imagen" value={formValue.image} variant='filled' onChange={(e) => handleChange(e)} />
      </FormControl>
      <NumberInput name="numberinput"
        value={cantidad}
        defaultValue={1}
        onChange={(e) => handleNumberChange(Number(e))} min={1} max={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={handleAdd}>Agregar</Button>
    </VStack>
    </Box>
  )
}
