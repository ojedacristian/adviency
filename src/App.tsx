import { AspectRatio, Button, Center, Container, Flex, Heading, Image, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MyModal } from './MyModal'
import './index.css'


interface Regalo {
    name: string,
    id: number,
    cantidad: number,
    image: string
}
export interface GiftForm {
    name: string,
    image: string
}

export const App = () => {

    const [regalos, setRegalos] = useState<Regalo[]>(() => JSON.parse(localStorage.getItem('regalos') || '[]'))
    const [cantidad, setCantidad] = useState<number>(1)
    const [formValue, setFormValue] = useState<GiftForm>({
        name: '',
        image: ''
    })

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
        if (!formValue.name) return;
        const res = regalos.filter(regalo => regalo.name === formValue.name)
        if (res.length) return;
        const id = new Date().getTime()
        setRegalos(prev => [...prev, { ...formValue, id, cantidad }]);
        setFormValue({
            name: '',
            image: ''
        })
        onClose()
    }

    const handleDelete = (id: number): void => {
        setRegalos(prev => prev.filter(regalo => regalo.id !== id))
    }

    const deleteAll = (): void => {
        setRegalos([])
    }
    return (
        <Container bg='gray.300' w='full' h='100vh' minWidth='container.lg'
        >
            <VStack>
                <Heading>
                    Regalos
                </Heading>
                {
                    regalos.map( ({id, name, cantidad, image}) => (
                        <Flex key={id} justifyContent='flex-end' w='md' alignItems='center'>
                            {
                             image &&
                             <AspectRatio ratio={1} minW='100px' m={4} >
                                 <Image src={image} />
                             </AspectRatio>   
                            }
                            <Text>
                                {name} {cantidad > 1 && `x ${cantidad}`}
                            </Text>
                            <Button mx={4} bgColor='red.200' onClick={() => handleDelete(id)}>Eliminar</Button>
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
         
                <Center>
                    <Button onClick={onOpen}>Agregar nuevo Regalo</Button>
                <MyModal 
                handleAdd={ handleAdd } 
                handleChange={ handleChange }
                handleNumberChange= { handleNumberChange}
                formValue={ formValue } 
                cantidad = {cantidad}
                isOpen = { isOpen}
                onClose = { onClose} 
                />
                </Center>
            <Center>
                <Button w='sm' m='4' bg='red.400' onClick={deleteAll} >Borrar todo</Button>
            </Center>
        </Container >
    )
}
