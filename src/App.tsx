import { Box, Button, Center, Container, Flex, FormControl, Heading, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import './index.css'


interface Regalo {
    name: string,
    id: number,
    cantidad: number
}

export const App = () => {
    
    const init = () =>{
        const strings = localStorage.getItem('regalos') || '[]'
        const stringsParsed = JSON.parse(strings)
        console.log(stringsParsed)
        return stringsParsed
    }

    const [regalos, setRegalos] = useState<Regalo[]>( ()=> JSON.parse( localStorage.getItem('regalos') || '[]')    )
    const [cantidad, setCantidad] = useState<number>(1)
    const [formValue, setFormValue] = useState<string>('')
    
    useEffect(() => {
        const regalosString = JSON.stringify(regalos)
        localStorage.setItem('regalos', regalosString)
    }, [regalos])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormValue(e.target.value)
    }
    const handleNumberChange = (e: number): void => {
        setCantidad(e)
    }
    const handleAdd = (): void => {
        if (!formValue) return;
        const res = regalos.filter(regalo => regalo.name === formValue)
        if (res.length) return;
        const id = new Date().getTime()
        setRegalos(prev => [...prev, { name: formValue, id, cantidad }]);
        setFormValue('')
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
                    regalos.map(regalo => (
                        <Flex key={regalo.id} justifyContent='center' alignItems='center'>
                            <Text>
                                {regalo.name} {regalo.cantidad > 1 && `x ${regalo.cantidad}`}
                            </Text>
                            <Button mx={4} bgColor='red.200' onClick={() => handleDelete(regalo.id)}>Eliminar</Button>
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
                    <Input name="input" placeholder="Nuevo regalo" variant='filled' value={formValue} onChange={(e) => handleChange(e)} />
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
