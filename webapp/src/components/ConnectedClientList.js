import React, {useRef, useEffect, useState } from 'react';
import { Box, Stack, Text, Flex } from '@chakra-ui/core';
import axios from 'axios'

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
  const resp = await axios.get('api/connected_clients')
  return resp.data
}

export const ConnectedClientList = () => {
  const [clientList, setClientList] = useState([]);
  const [files, setFiles] = useState([]);

  useInterval(async () => {
    setClientList(await fetchClientList());
  }, 2000);

  return <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
    <Stack spacing={8} textAlign="center" width="36rem">
      <Text fontSize="4xl">{clientList.length} Connected Devices</Text>
      <Stack>
      {clientList.map((client, idx) => <ConnectedClientViewer key={client.ip + idx} client={client} />)}
      </Stack>
{/* 
      <form action="http://localhost:8000/api/upload_binary" method="post" encType="multipart/form-data">
        <input type="file" name="file" multiple/>
        <input type="submit" value="Upload"/>
      </form> */}

      <Dropzone onDrop={acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(acceptedFiles)
        const formData = new FormData();
        formData.append("file", acceptedFiles[0])
        axios.post('http://localhost:8000/api/upload_binary', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
        }}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
              {files.map(file => <div key={file.path}>{file.path}</div>)}
            {!files.length && <p>Drag 'n' drop some files here, or click to select files</p>}
          </div>
        </section>
      )}
      </Dropzone>
    </Stack>
  </Box>
}

const ConnectedClientViewer = ({client}) => {
  return <Flex key={client.ip} borderWidth={2} borderRadius={4} p={2} mb={1} borderColor="green.300" direction="row" justify="space-between">
    <Text fontWeight={600}>{client.name}</Text>
    <Text fontWeight={400}>IP: {client.ip}</Text>
    </Flex>
}

