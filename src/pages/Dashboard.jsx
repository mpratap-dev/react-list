import { useOktaAuth } from '@okta/okta-react';
import React from 'react'

const Dashboard = () => {
  const auth = useOktaAuth();
  console.log(auth);
  return (
    <div className='p-5'>Dashboard</div>
  )
}

export default Dashboard