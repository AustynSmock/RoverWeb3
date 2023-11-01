import { useState } from 'react';

export default function Home() {
  const [roverMessage, setRoverMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const fetchRover = async () => {
    const data = await fetch('/api/data',{
      method: 'GET',

    });
    
    const message = await data.json();
    
    setRoverMessage(message);
  };

  const updateRoverMessage = async () => {
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage }),
    });
  };

  return (
    <main className="font-mono">
      <h1 className="text-3xl text-center p-4 font-bold">Rover App</h1>
      <div className='flex justify-center flex-col items-center'>
        <button className='active:bg-neutral-500 border p-2 border-black rounded' onClick={fetchRover}>Call Rover</button>
        {roverMessage && <p className='text-blue-700 pt-4'>Message from Rover: {roverMessage}</p>}
        <div className="pt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="New message to Rover"
            className="border p-2 border-black rounded"
          />
          <button
            className="active:bg-neutral-500 border p-2 border-black rounded ml-2"
            onClick={updateRoverMessage}
          >
            Send to Rover
          </button>
        </div>
      </div>
    </main>
  );
}
