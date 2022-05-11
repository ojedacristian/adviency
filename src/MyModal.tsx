import { GiftForm } from './App';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  FormControl,
  Input
} from "@chakra-ui/react"

interface ModalProps {
  handleAdd: () => void,
  formValue: GiftForm,
  cantidad: number,
  handleNumberChange: (e: number) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  idToEdit: number,
  handleEdit: (id:number) => void
}

export const MyModal = ({ handleAdd, formValue, cantidad, handleNumberChange, handleChange, isOpen, onClose, idToEdit, handleEdit }: ModalProps) => {

  console.log(idToEdit)
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                <Input
                  name="destinatario"
                  placeholder="Destinatario"
                  variant='filled'
                  value={formValue.destinatario}
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
            {
              idToEdit
              ? <Button colorScheme='red' onClick={ ()=> handleEdit(idToEdit)}>Editar</Button>
              : <Button colorScheme='blue' onClick={handleAdd}>Agregar</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
