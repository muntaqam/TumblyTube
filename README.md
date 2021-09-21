<!-- markdownlint-disable-file MD033 -->

<h1 align="center"> TumblyTube </h1> <br>
<p align="center">
    <a href="https://tumblytube.herokuapp.com/">
        <img alt="TumblyTube" title="TumblyTube" src="app/assets/images/logo.svg" width="300">
    </a>
</p>

<p align="center" > Inspired by YouTube </p>
<p align="center" > <a href="https://tumblytube.herokuapp.com/"> :rocket: LINK TO LIVE SITE </a></p>

## Table of Contents

- [Overview](#overview)
  - [Technologies](#technologies)
  - [Libraries & Methodologies](#libraries--methodologies)
- [Features](#features)
- [Technical Implementation Details](#technical-implementation-details)
  - [Ploymorphic Associations](#ploymorphic-associations)
  - [Toast Notifications](#toast-notifications)
- [Sources](#sources)
- [TODOs / Features to implement](#todos--features-to-implement)
- [Author Info](#author-info)

---

## Overview

TumblyTube is a fully responsive clone of YouTube.
It includes key featrues of a typical video sharing social media web application.

### Technologies

- React
- Redux
- Ruby
- Rails
- Postgresql
- AWS

### Libraries & Methodologies

- [Ajax](https://api.jquery.com/jQuery.ajax/) for sending and requesting data asynchronously
- [BCrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) for user authentication
- [Material-ui icons](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/material-icons/material-icons.md) for app-wide icons

[:arrow_up_small: Back To The Top](#table-of-contents)

## Features

- **USER AUTH**
  - Login, Create Account, or browse as guest/ demo-user
- **VIDEOS**
  - Watch Videos shared by other users
  - Upload, Edit, Delete your uploaded Videos
  - View your Liked videos
- **COMMENTS**
  - Leave Comments on Videos
  - Reply to Comments
  - Edit, Delete your own Comments
- **LIKES / DISLIKES**
  - Like / Dislike Videos
  - Like / Dislike Comments
- **CHANNELS**
  - Subscribe to Channels
  - View Videos from Subscribed Channels
- **SEARCH**
  - Search for Channles by name
  - Search for Videos by title

[:arrow_up_small: Back To The Top](#table-of-contents)

## Technical Implementation Details

### Ploymorphic Associations

```RUBY
class Like < ApplicationRecord
    validates :liker_id, uniqueness: { scope: [:likeable_id, :likeable_type] }
    validates :version, inclusion: { in: %w(like dislike), 
        message: "%{value} is not a valid version, must be like or dislike"}

    belongs_to :likeable, polymorphic: true
  
    belongs_to :user,
        foreign_key: :liker_id,
        class_name: :User
end
```

```RUBY
# app/models/like.rb
class User < ApplicationRecord
    has_many :likes,
        foreign_key: :liker_id,
        class_name: :Like,
        dependent: :destroy

    has_many :liked_videos,
        through: :likes,
        source: :likeable,
        source_type: :Video
end

# app/models/comment.rb
class Comment < ApplicationRecord
    has_many :likes, as: :likeable, dependent: :destroy
end

# app/models/video.rb
class Video < ApplicationRecord
    has_many :likes, as: :likeable, dependent: :destroy
end
```

### Toast Notifications

```javascript
// components/noti_portal/noti_portal.jsx
const [loaded, setLoaded] = useState(false);
const [portalId] = useState(`noti-portal-${uuid()}`);

useEffect(() => {
    const div = document.createElement("div");
    div.id = portalId;
    div.style = "position: fixed; bottom: 20px; left: 30px; z-index: 300";
    
    document.getElementsByTagName("body")[0].prepend(div);
    setLoaded(true);

    return () => document.getElementsByTagName("body")[0].removeChild(div);
}, [portalId]);

return (
    loaded && createPortal(
      <div className='noti'>
        {notis.map((noti) => (
          <Noti
            key={noti.id}
            mode={noti.mode}
            message={noti.message}
            onClose={() => removeNoti(noti.id)}
          />
        ))}
      </div>,
      
  document.getElementById(portalId)
)
```

```javascript
// components/root.jsx
import { NotiContext } from "../context/noti_context"

const Root = ({ store }) => {
  const notiRef = useRef(null);

  const addNoti = ({ mode, message }) => {
    notiRef.current.addMessage({ mode, message });
  };
  
  return (
    <>
        <NotiContext.Provider value={{ addNoti }}>
            <App />
        </NotiContext.Provider>
        <NotiPortal ref={notiRef} autoClose={true} />
    </>
  );
}

// components/noti_portal/noti_portal.jsx
const NotiPortal = forwardRef(({ autoClose, autoCloseTime = 3000 }, ref) => {
    const [notis, setNotis] = useState([]); // contains message and color(mode)
  
    useImperativeHandle(ref, () => ({
        addMessage(noti) {
            setNotis([{ ...noti, id: uuid() }, ...notis]);  // takes in message and mode; generates unique id
        },
    }));
    
    return (
        // create portal...
    )
});
```


## Sources

- https://stackoverflow.com/a/25821830
  padStart fix for hex code length issue <br>
  when generating random colors for user avatars at Create Account completion

[:arrow_up_small: Back To The Top](#table-of-contents)

## TODOs / Features to implement

- [ ] Fix video metadata not preloading on iOS devices
- [ ] Add light / dark mode

[:arrow_up_small: Back To The Top](#table-of-contents)

---

## Author Info

- Website - [Ryan Naing]()

[:arrow_up_small: Back To The Top](#table-of-contents)
