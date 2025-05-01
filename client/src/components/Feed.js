// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../contexts/AuthContext';

// const Feed = ({ feeds }) => {
//   const { user } = useContext(AuthContext);
//   const [savedFeeds, setSavedFeeds] = useState([]);

//   const saveFeed = async (feed) => {
//     if (!user) {
//       alert('Please log in to save feeds.');
//       return;
//     }

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/feed/save',
//         {
//           postId: feed.data.id,
//           title: feed.data.title,
//           url: feed.data.url,
//           source: 'Reddit',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.message === 'Feed already saved') {
//         alert('This feed is already in your saved items');
//       } else {
//         alert('Feed saved successfully!');
//         setSavedFeeds([...savedFeeds, feed.data.id]);
//       }
//     } catch (err) {
//       console.error("Error while saving feed:", err);
//       alert(err.response?.data?.error || 'Failed to save feed');
//     }
//   };

//   const shareFeed = (feedUrl) => {
//     alert(`Shared Feed: ${feedUrl}`);
//   };

//   const reportFeed = (feed) => {
//     alert(`Reported Feed: ${feed.data.title}`);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Feed</h2>
//       <div className="space-y-4">
//         {feeds.map((feed) => (
//           <div key={feed.data.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">{feed.data.title}</h3>
//             <p>{feed.data.selftext}</p>
//             <div className="mt-2 flex space-x-4">
//               <button
//                 onClick={() => saveFeed(feed)}
//                 className={`p-2 text-white rounded ${
//                   savedFeeds.includes(feed.data.id) ? 'bg-gray-500' : 'bg-green-500'
//                 }`}
//                 disabled={savedFeeds.includes(feed.data.id)}
//               >
//                 {savedFeeds.includes(feed.data.id) ? 'Saved' : 'Save'}
//               </button>
//               <button
//                 onClick={() => shareFeed(feed.data.url)}
//                 className="p-2 bg-blue-500 text-white rounded"
//               >
//                 Share
//               </button>
//               <button
//                 onClick={() => reportFeed(feed)}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 Report
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const Feed = ({ feeds }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [savedFeeds, setSavedFeeds] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const saveFeed = async (feed) => {
    if (!user) {
      alert('Please log in to save feeds');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/feed/save',
        {
          postId: feed.data.id,
          title: feed.data.title,
          url: feed.data.url,
          source: 'Reddit'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.message.includes('already saved')) {
        alert('You already saved this feed');
      } else {
        // Update credits in global state
        updateUser({ credits: response.data.newCredits });
        // Update local saved feeds state
        setSavedFeeds([...savedFeeds, feed.data.id]);
        alert(`Feed saved! +5 credits (Total: ${response.data.newCredits})`);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveError(error.response?.data?.error || 'Failed to save feed');
    } finally {
      setIsSaving(false);
    }
  };

  const shareFeed = (url) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const reportFeed = (feed) => {
    console.log('Reported feed:', feed.data.id);
    alert('Thank you for reporting. We will review this content.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      {saveError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {saveError}
        </div>
      )}
      
      <div className="space-y-4">
        {feeds.map((feed) => (
          <div key={feed.data.id} className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold">{feed.data.title}</h3>
            {feed.data.selftext && (
              <p className="mt-2 text-gray-700">{feed.data.selftext}</p>
            )}
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => saveFeed(feed)}
                disabled={isSaving || savedFeeds.includes(feed.data.id)}
                className={`px-3 py-1 rounded text-white ${
                  savedFeeds.includes(feed.data.id) 
                    ? 'bg-gray-400 cursor-default'
                    : 'bg-green-600 hover:bg-green-700'
                } ${
                  isSaving ? 'opacity-70' : ''
                }`}
              >
                {savedFeeds.includes(feed.data.id) ? '✓ Saved' : 'Save'}
              </button>
              
              <button
                onClick={() => shareFeed(feed.data.url)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Share
              </button>
              
              <button
                onClick={() => reportFeed(feed)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;