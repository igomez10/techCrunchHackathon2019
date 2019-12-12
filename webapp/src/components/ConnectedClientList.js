import React, {useRef, useEffect, useState } from 'react';
import { Box, Stack, Text, Flex } from '@chakra-ui/core';
import axios from 'axios'
import { ClientMap } from './ClientMap'

import Dropzone from 'react-dropzone'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}


const fetchClientList = async () => {
  const resp = await axios.get('/api/connected_clients')
  return resp.data
}

export const ConnectedClientList = () => {
  const [clientList, setClientList] = useState([]);
  const [files, setFiles] = useState([]);

  useInterval(async () => {
    setClientList(await fetchClientList());
  }, 2000);

  return <Box display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around" width="100%" pt="1rem">

<Stack spacing={8} textAlign="center" width="36rem">
      <Text fontSize="4xl">{clientList.length} Available Instances</Text>
      <Stack>
      {clientList.map((client, idx) => <ConnectedClientViewer key={client.ip + idx} client={client} />)}
      </Stack>
    </Stack>
    <Box mt={16} mr={12} mb={4} width="36rem">
      <Box mb={4}>
    <Dropzone onDrop={acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(acceptedFiles)
        const formData = new FormData();
        formData.append("file", acceptedFiles[0])
        axios.post('/api/upload_binary', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
        }}>
      {({getRootProps, getInputProps}) => (
        <section>
          <Box {...getRootProps()} borderRadius={6} borderWidth={2} borderColor="gray.300" p={2}>
            <input {...getInputProps()} />
              {files.map(file => <Box textAlign="center" key={file.path}>{file.path}</Box>)}
            {!files.length && <Box textAlign="center">Upload binary WebAssembly file</Box>}
          </Box>
        </section>
      )}
      </Dropzone>
      </Box>
      <ClientMap clients={clientList}/>
    </Box>
  </Box>
}

const ConnectedClientViewer = ({client}) => {
  return <Flex key={client.ip} borderWidth={2} borderRadius={4} p={2} mb={1} borderColor="green.300" direction="row" justify="space-between">
    <Text fontWeight={600}>{client.name}</Text>
    <Text fontWeight={400}>IP: {client.ip}</Text>
    </Flex>
}

