import { AspectRatio, Badge, Box, Button, Flex, GridItem, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Regalo } from '../interfaces/interfaces'

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

interface Props {
    regalo: Regalo,
    duplicar: (id: number) => void,
    setEditModal: (id: number) => void,
    handleDelete: (id: number) => void
}

export const RegaloComponent = ({ regalo, duplicar, setEditModal, handleDelete }: Props) => {

    const { cantidad, destinatario, id, image, name, precio } = regalo
    return (
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
}
