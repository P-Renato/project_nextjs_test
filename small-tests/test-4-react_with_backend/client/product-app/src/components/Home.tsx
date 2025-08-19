import React, { useEffect, useState } from 'react'

function Home() {
  const [albums, setAlbums] = useState([]);

  useEffect(()=> {
    fetch('https://all-apis.com/musics?limit=40')
      .then(res => res.json())
      .then(data => console.log(data))
  })

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
