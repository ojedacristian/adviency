import { AspectRatio, Badge, Box, Button, ButtonGroup, Center, Container, Flex, Heading, Image, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MyModal } from "./MyModal";

interface Regalo {
    name: string,
    id: number,
    cantidad: number,
    image: string,
    destinatario: string
}
export interface GiftForm {
    name: string,
    image: string,
    destinatario: string,
}

export const App = () => {

    const [regalos, setRegalos] = useState<Regalo[]>(() => JSON.parse(localStorage.getItem('regalos') || '[]'))
    const [cantidad, setCantidad] = useState<number>(1)
    const [formValue, setFormValue] = useState<GiftForm>({
        name: '',
        image: '',
        destinatario: ''
    })

    const [idToEdit, setidToEdit] = useState<number>(0);

    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
        const regalosString = JSON.stringify(regalos)
        localStorage.setItem('regalos', regalosString)
    }, [regalos])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormValue(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }
    const handleNumberChange = (e: number): void => {
        setCantidad(e)
    }
    const handleAdd = (): void => {
        setidToEdit(0);
        if (!formValue.name) return;
        const res = regalos.filter(regalo => regalo.name === formValue.name)
        if (res.length) return;
        const id = new Date().getTime()
        setRegalos(prev => [...prev, { ...formValue, id, cantidad }]);
        setFormValue({
            name: '',
            image: '',
            destinatario: ''
        })
        onClose()
    }

    const handleDelete = (id: number): void => {
        setRegalos(prev => prev.filter(regalo => regalo.id !== id))
    }
    const handleEdit = (id: number): void => {
        const newState = regalos.map(regalo => {
            if (regalo.id == id) {
                return { ...formValue, cantidad, id }
            } else {
                return regalo
            }
        })
        setRegalos(newState)
        onClose()
    }


    const setEditModal = (id: number): void => {
        const regaloEdit = regalos.find(regalo => regalo.id === id)
        console.log(regaloEdit)
        setidToEdit(id);
        setFormValue({
            name: regaloEdit?.name || '',
            destinatario: regaloEdit?.destinatario || '',
            image: regaloEdit?.image || ''
        })
        onOpen()
    }
    const openModal = () => {
        setidToEdit(0)
        onOpen()
    }

    const deleteAll = (): void => {
        setRegalos([])
    }
    return (
        <Box
            bg='blue.900'
        >

            <Container
                w='full'
                h='100vh'
                p={5}
                minWidth='container.lg'
                // bg='gray.100'
                backgroundImage='https://i.pinimg.com/originals/1b/09/08/1b0908830cff074ece983942f803ae07.jpg'
                centerContent
            >

                <VStack
                    bg='white'
                    spacing={6}
                    w='lg'
                    borderRadius={10}
                    padding={5}
                >
                    <Heading>
                        Regalos
                    </Heading>
                    {
                        regalos.map(({ id, name, cantidad, image, destinatario }) => (
                            <Flex
                                key={id}
                                justify='space-between'
                                w='md'
                                alignItems='center'>

                                <AspectRatio ratio={1} minW='100px' m={4} >
                                    {
                                        image
                                            ? <Image src={image} />
                                            : <Box minW='100px' bg='gray.100'>
                                                No Image
                                            </Box>
                                    }
                                </AspectRatio>

                                <Text>
                                    {name} {cantidad > 1 && `x ${cantidad}`}
                                    <Badge colorScheme='yellow'>{destinatario}</Badge>
                                </Text>
                                <ButtonGroup>
                                    <Button colorScheme='blue' onClick={() => setEditModal(id)}>Editar</Button>
                                    <Button mx={4} colorScheme='red' onClick={() => handleDelete(id)}>Eliminar</Button>
                                </ButtonGroup>
                            </Flex>
                        )
                        )
                    }
                    {
                        !regalos.length
                        &&
                        <Text>No hay regalos. Agrega algo</Text>
                    }
                </VStack>

                <Button onClick={openModal} colorScheme='blue' w='md' m='3'>
                    Agregar nuevo Regalo
                </Button>

                <Center>
                    <MyModal
                        handleAdd={handleAdd}
                        handleChange={handleChange}
                        handleNumberChange={handleNumberChange}
                        formValue={formValue}
                        cantidad={cantidad}
                        isOpen={isOpen}
                        onClose={onClose}
                        idToEdit={idToEdit}
                        handleEdit={handleEdit}
                    />
                </Center>
                <Center>
                    <Button w='sm' m='2' colorScheme='red' onClick={deleteAll} >Borrar todo</Button>
                </Center>
            </Container >

        </Box>
    )
}
