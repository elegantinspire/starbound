import React from 'react';
import TaskCard from '../components/Widgets/TaskCard/TaskCard';
import TaskList from '../components/Widgets/TaskList/TaskList';
import Calendar from '../components/Widgets/Calendar/Calendar';
import MessageList from '../components/Widgets/MessageList/MessageList';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
      <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
        <div className="flex flex-col flex-wrap sm:flex-row">
          <div className="w-full sm:w-1/2 xl:w-1/3 p-2">
            <TaskCard />
            <TaskList />
          </div>
          <div className="w-full sm:w-1/2 xl:w-1/3 p-2">
            <Calendar />
          </div>
          <div className="w-full sm:w-1/2 xl:w-1/3 p-2">
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
