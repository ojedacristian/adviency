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
  setFormValue: any,
  cantidad: number,
  handleNumberChange: (e: number) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  idToEdit: number,
  handleEdit: (id:number) => void
}

const regalosAleatorios: GiftForm[] = [
  {
      name: 'pantalon',
      image: 'data:image/png;base64,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',
      destinatario: 'Pablo',
      precio: 2000
  },
  {
      name: 'Campera',
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMrJzDaVRl2Czw6QVYzBUBR16nd-zpL4IwPCUVe4ge4MwuZxQd9QWl6WqelLTZ2cVk5YqH-AXh8rA&usqp=CAc',
      destinatario: 'Pedro',
      precio: 4000
  },
  {
      name: 'Smartwatch',
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSkA49ZdRXABo1Nedrir6R68pUjS3l-uNDF99ugNgNTi-YfEe4eDbotNY5gEoyCNST6Z80Mhwf1cg&usqp=CAc',
      destinatario: 'Javier',
      precio: 7000
  }
]
export const MyModal = ({ handleAdd, formValue, setFormValue, cantidad, handleNumberChange, handleChange, isOpen, onClose, idToEdit, handleEdit }: ModalProps) => {

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
              <Button colorScheme='green' onClick={()=>{
                const aleatorio = Math.floor(Math.random() * regalosAleatorios.length)
                setFormValue(regalosAleatorios[aleatorio])
              }}>
                Regalo Sorpresa
              </Button>
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
                <Input
                  name="precio"
                  placeholder="precio"
                  variant='filled'
                  value={formValue.precio}
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
