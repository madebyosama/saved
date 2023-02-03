import './Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [videos, setVideos] = useState([]);
  let count = 0;
  let videoNumber = 0;
  let itemsNumber = 7;
  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const data = await axios.get('http://localhost:1337/save');
      setVideos(data.data);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='row'>
        {videos.map((item, index) => {
          if (index === 1 || index % itemsNumber === 0) {
            count = count + videoNumber;
            return (
              <div className='column'>
                {videos.slice(count, count + itemsNumber).map((video, i) => {
                  videoNumber++;
                  return (
                    <video
                      width='100%'
                      controls
                      key={i}
                      poster={video.placeholder}
                    >
                      <source src={video.link} type='video/mp4' />
                    </video>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
