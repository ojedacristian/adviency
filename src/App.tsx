import { AspectRatio, Box, Button, Center, Container, Flex, FormControl, Heading, HStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import './index.css'


interface Regalo {
    name: string,
    id: number,
    cantidad: number,
    image: string
}
interface GiftForm {
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
            <HStack w='sm'>
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
            </HStack>
            <Center>
                <Button w='sm' m='4' bg='red.400' onClick={deleteAll} >Borrar todo</Button>
            </Center>
        </Container >
    )
}
