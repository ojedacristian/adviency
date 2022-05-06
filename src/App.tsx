import { Box, Button, Container, Flex, FormControl, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import './index.css'

export const App = () => {
    const [regalos, setRegalos] = useState([{ name: 'medias', id: 1 }, {name: 'caramelos', id: 2}, { name: ' vitel tone', id:3}])
    const [formValue, setFormValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value)
    }
    const handleAdd = () => {
        const id = new Date().getTime()
        setRegalos(prev => [...prev, { name: formValue, id }]);
        setFormValue('')
    }

    const handleDelete = (id:number):void => {
        setRegalos( prev => prev.filter( regalo => regalo.id !== id) )
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
                                {regalo.name}
                            </Text>
                            <Button mx={4} bgColor='red.200' onClick={() => handleDelete(regalo.id) }>Eliminar</Button>
                        </Flex>
                    )
                    )
                }
            </VStack>
            <HStack w='sm'>
                <FormControl>
                    <Input placeholder="Nuevo regalo" variant='filled' value={formValue} onChange={(e) => handleChange(e)} />
                </FormControl>
                <Button onClick={handleAdd}>Agregar</Button>
            </HStack>
        </Container >
    )
}
