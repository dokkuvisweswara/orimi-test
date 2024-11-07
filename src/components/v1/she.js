import React, { useEffect } from 'react';
import { subscriberUser } from '@/services/actions/user.actions';
import ProfileTabSelection from '@/shared/v1/profileTabSelection';
import Toggle from '@/shared/v1/toggle';


export default function ProfilePage() {
  // Use useEffect to call subscriberUser when the component mounts
  useEffect(() => {
    // Assuming subscriberUser returns a Promise, you can handle the result here
    subscriberUser()
      .then((result) => {
        // Handle the result, e.g., update state or perform other actions
        // console.log('Subscriber information:', result);
      })
      .catch((error) => {
        console.error('Error fetching subscriber information:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      {/* Your existing JSX code */}
    </>
  );
}
