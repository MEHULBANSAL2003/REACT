import React from 'react'
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error=useRouteError();
  return (
    <div>
      <h1>Oops!! Something Went Wrong</h1>
      <h2>{error.status}: {error.statusText}</h2>
    </div>
  )
}

export default Error;
