import { AspectRatio, Badge, Box, Button, ButtonGroup, Center, Container, Flex, Heading, Image, Text, useDisclosure, VStack, HStack, Grid, GridItem, Divider, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Spacer, Progress, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { api } from "./api";
import { MyModal } from "./MyModal";
import './app.css'
import Snowfall from 'react-snowfall'
import { motion } from 'framer-motion';



interface Regalo {
    name: string,
    id: number,
    cantidad: number,
    image: string,
    destinatario: string,
    precio: number
}
export interface GiftForm {
    name: string,
    image: string,
    destinatario: string,
    precio: number
}


export const App = () => {

    const { toggleColorMode } = useColorMode()
    const modalColor = useColorModeValue('gray.50', 'blue.800')
    const bgColor = useColorModeValue('green.700', 'blue.900')

    const [regalos, setRegalos] = useState<Regalo[]>([])
    const [cantidad, setCantidad] = useState<number>(1)
    const [formValue, setFormValue] = useState<GiftForm>({
        name: '',
        image: '',
        destinatario: '',
        precio: 0
    })
    const [onMusic, setOnMusic] = useState<Boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        api.regalos.list().then(regalos => {
            setRegalos(regalos as Regalo[])
            setIsLoading(false)
        })
        audioRef.current.volume = 0.3
    }, [])


    const [idToEdit, setidToEdit] = useState<number>(0);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure()


    useEffect(() => {
        const regalosString = JSON.stringify(regalos)
        localStorage.setItem('regalos', regalosString);
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
            destinatario: '',
            precio: 0
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
            image: regaloEdit?.image || '',
            precio: regaloEdit?.precio || 0
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
    const duplicar = (id: number): void => {
        const regalo = regalos.find(regalo => regalo.id === id);
        if (regalo) {
            const { name, destinatario, image, precio } = regalo
            setFormValue({
                name, destinatario, image, precio
            })
            onOpen();
        }
    }

    useEffect(() => {
        const res = regalos.reduce((acc, obj) => acc + obj.precio * obj.cantidad, 0);
        setTotal(res)

    }, [regalos])

    const audioRef = useRef<any>(null)
    const clickPlay = (): void => {
        if (audioRef.current !== null) {
            onMusic
                ? audioRef.current.pause()
                : audioRef.current.play()
            setOnMusic(!onMusic)
        }
    }

    const initial = {
        opacity: 0,
        scale: 0,
        x: -100
    }

    const animate = {
        opacity: 1,
        scale: 1,
        x: 0
    }
    return (

        <Box
            bg={bgColor}

        >
            <Button
                position='fixed'
                right={1}
                top={1}
                onClick={toggleColorMode}
            >
                🌗
            </Button>
            <Snowfall
                // color='white'
                snowflakeCount={150}
            />

            {/* <div className='snowflake snow-1'>❄️</div>
            <div className='snowflake snow-2'>❄️</div>
            <div className='snowflake snow-3'>❄️</div>
            <div className='snowflake snow-4'>❄️</div>
            <div className='snowflake snow-5'>❄️</div> */}


            <Container
                w='full'
                minHeight='100vh'
                p={[3, 5]}
                // minWidth='container.lg'
                // bg='gray.100'
                centerContent
            >

                <VStack
                    bg={modalColor}
                    spacing={6}
                    w={['xs','sm', 'md', '2xl']}
                    borderRadius={10}
                    padding={[2,5]}
                >
                    <audio ref={audioRef}>
                        <source src='./jingle bells.mp3' type='audio/mpeg' />
                    </audio>
                    <Box display='flex' justifyContent='space-between' width='50%' alignItems='center' flexDirection={['column', 'row']} >
                        <Heading>
                            Regalos
                        </Heading>
                        <Button onClick={clickPlay}>🎵</Button>
                    </Box>
                    {
                        isLoading && <>
                            <Progress size='xs' isIndeterminate minWidth='xs' height={1} />
                            <Text>Cargando...</Text>
                        </>
                    }
                    <Grid
                        templateColumns={['1fr', null, '1fr 2fr 1fr',]}
                        w='full'
                    >
                        {
                            regalos.map(({ id, name, cantidad, image, destinatario, precio }) => (
                                <>

                                    <GridItem
                                        as={motion.div}
                                        initial={initial}
                                        animate={animate}
                                    >


                                        <AspectRatio ratio={1} minW='100px' m={4} >
                                            {
                                                image
                                                    ? <Image src={image} />
                                                    : <Box minW='100px' bg='gray.100'>
                                                        No Image
                                                    </Box>
                                            }
                                        </AspectRatio>
                                    </GridItem>
                                    <GridItem
                                        as={motion.div}
                                        initial={initial}
                                        animate={animate}
                                    >
                                        <Text>
                                            {name} {cantidad > 1 && `x ${cantidad}`}<br />
                                            <Badge colorScheme='yellow'>{destinatario}</Badge><br />
                                            <Badge colorScheme='green'>$ {precio}</Badge>
                                        </Text>
                                    </GridItem>
                                    <GridItem
                                        as={motion.div}
                                        initial={initial}
                                        animate={animate}
                                    >
                                        <Flex direction={'row'} justifyContent='flex-end' flexWrap='wrap' alignItems='center'>
                                            <Button colorScheme='orange' variant='outline' title='Duplicar producto' m={1} size='sm' onClick={() => duplicar(id)}> 💕 </Button>
                                            <Button colorScheme='blue' m={1} size='sm' onClick={() => setEditModal(id)}>
                                                <Text>
                                                    ✏️
                                                </Text>
                                            </Button>
                                            <Button colorScheme='red' m={1} size='sm' onClick={() => handleDelete(id)}>
                                                <Text 
                                                // textShadow='0 0 0 red' color='transparent' 
                                                >
                                                    ❌
                                                </Text>
                                            </Button>
                                        </Flex>
                                    </GridItem>
                                </>

                            )
                            )
                        }
                    </Grid>
                    {
                        !regalos.length
                            ? <Text>No hay regalos. Agrega algo</Text>
                            : <>
                                <Divider />
                                <Stack direction='row' justifyContent='space-around' width='full' >
                                    <Text fontWeight='bold'>Total</Text>
                                    <Text>$ {total}</Text>
                                </Stack>
                            </>
                    }
                </VStack>

               

                <Center>
                    <MyModal
                        handleAdd={handleAdd}
                        handleChange={handleChange}
                        handleNumberChange={handleNumberChange}
                        formValue={formValue}
                        setFormValue={setFormValue}
                        cantidad={cantidad}
                        isOpen={isOpen}
                        onClose={onClose}
                        idToEdit={idToEdit}
                        handleEdit={handleEdit}
                    />
                    <Modal isOpen={isPreviewOpen} onClose={onPreviewClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Lista de compras</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {
                                    regalos.map(({ name, image, cantidad, destinatario }) =>
                                        <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' spacing={5} padding={5} >
                                            <AspectRatio ratio={1} minWidth='100px'>
                                                <img src={image} />
                                            </AspectRatio>
                                            <Text>{name} ({cantidad})</Text>
                                            <Badge>{destinatario}</Badge>
                                        </Stack>
                                    )
                                }
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onPreviewClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Center>
                <Button onClick={openModal} colorScheme='blue' p={2} w={['xs', 'sm']} m={2}>Agregar nuevo Regalo</Button>
                <Button w={['xs', 'sm']} m={2} p={2} colorScheme='red' onClick={deleteAll} >Borrar todo</Button>
                <Button w={['xs', 'sm']} m={2} p={2} colorScheme='gray' onClick={onPreviewOpen}>Previsualizar</Button>
            </Container >

        </Box>
    )
}
