import { Box, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure, VStack, FormControl, Input } from "@chakra-ui/react"
import { GiftForm } from './App';

interface ModalProps {
  handleAdd: () => void,
  formValue: GiftForm,
  cantidad: number,
  handleNumberChange: (e: number) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isOpen: boolean,
  onClose: () => void
}

export const MyModal = ({ handleAdd, formValue, cantidad, handleNumberChange, handleChange, isOpen, onClose }: ModalProps) => {


  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar nuevo Regalo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* CONTENT FORM */}
            <VStack >
              <FormControl>
                <Input
                  name="name"
                  placeholder="Nuevo regalo"
                  variant='filled'
                  value={formValue.name}
                  onChange={(e) => handleChange(e)} />
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
            </VStack>
            {/* FIN CONTENT FORM */}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={ handleAdd}>Agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

    // <Box
    // w='full' position='fixed' 
    // top={0}
    // bottom={0}
    // right={0}
    // left={0}
    // backgroundColor='gray.700'
    // >



    // <VStack >
    //   <FormControl>
    //     <Input name="name" placeholder="Nuevo regalo" variant='filled' value={formValue.name} onChange={(e) => handleChange(e)} />
    //   </FormControl>
    //   <FormControl>
    //     <Input name="image" placeholder="Link de la imagen" value={formValue.image} variant='filled' onChange={(e) => handleChange(e)} />
    //   </FormControl>
    //   <NumberInput name="numberinput"
    //     value={cantidad}
    //     defaultValue={1}
    //     onChange={(e) => handleNumberChange(Number(e))} min={1} max={10}>
    //     <NumberInputField />
    //     <NumberInputStepper>
    //       <NumberIncrementStepper />
    //       <NumberDecrementStepper />
    //     </NumberInputStepper>
    //   </NumberInput>
    //   <Button onClick={handleAdd}>Agregar</Button>
    // </VStack>
    // </Box>
  )
}
