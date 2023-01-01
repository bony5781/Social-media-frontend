import './sidebar.css'
import { Users } from '../../dummyData'
import CloseFriend from '../closeFriend/CloseFriend';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <QuestionMarkIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkHistoryIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar