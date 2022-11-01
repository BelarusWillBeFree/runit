import React from 'react';
import { SnippetsContext } from '../contexts';
import axios from 'axios';
import routes from '../routes';
const { Buffer } = require('buffer');

function SnippetsProvider({ children }) {

  const encodeId = (id) => {
    const idString = id.toString();
    const encodedId = Buffer.from(idString).toString('base64');
    return encodedId;
  };

  const decodeId = (encodedId) => {
    const decodedId = Buffer.from(encodedId, 'base64').toString('utf-8');
    return decodedId;
  };

  const getSnippetData = async (id) => {
    const response = await axios.get(routes.getSnippetPath(id));
    return response.data;
  };

  const saveSnippet = async (code, name) => {
    const response = await axios.post(routes.createSnippetPath(), { name, code });
    const id = (response.data.id).toString();
    const encodedId = encodeId(id);
    return encodedId;
  };

  const hasSnippetsPath = () => {
    const url = new URL(window.location);
    return url.pathname.split('/').filter(path => path === 'snippets').length;
  };

  const getSnippetIdFromPath = () => {
    const url = new URL(window.location);
    const elementsPath = url.pathname.split('/');
    const lastElementPath = elementsPath[elementsPath.length - 1];
    return Number(lastElementPath);
  };

  const genSnippetLink = (id) => {
    return `/snippets/${id}`;
  };

  return (
    <SnippetsContext.Provider
    value={{
      encodeId,
      decodeId,
      saveSnippet,
      genSnippetLink,
      getSnippetData,
      hasSnippetsPath,
      getSnippetIdFromPath,
    }}
    >
      {children}
    </SnippetsContext.Provider>
  );
}

export default SnippetsProvider;
