import React, { useState } from 'react';
import ipfs from '../api/ipfs';

const Index = () => {
  const [fileHash, setFileHash] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const fileBuffer = await file.arrayBuffer();

    ipfs.add(Buffer.from(fileBuffer), (err, files) => {
      if (err) {
        console.error(`Error: ${err}`);
        return;
      }
      console.log(files);
      if (!files) {
        console.error('Error: No files returned from IPFS.add');
        return;
      }
      const hash = files[0].hash;
      setFileHash(hash);
    });
    
  };

  return (
    <div className="header flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-xl" onSubmit={handleUpload}>
        <h1 className="text-lg font-medium mb-4">Upload a file to IPFS</h1>
        <input
          type="file"
          className="block border border-gray-400 p-2 w-full mb-4"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
>
Upload
</button>
{fileHash && (
<p className="text-gray-700 mt-4">File uploaded with IPFS hash: {fileHash}</p>
)}
</form>
</div>
);
};

export default Index;
