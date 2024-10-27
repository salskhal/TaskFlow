import React from 'react';

const OverlappingAvatars = ({ members, limit = 4 }) => {
  return (
    <div className="flex items-center">
      {members.slice(0, limit).map((member, index) => (
        <div
          key={index}
          className="relative rounded-full overflow-hidden border-2 border-white"
          style={{
            width: '40px',
            height: '40px',
            marginLeft: index > 0 ? '-15px' : '0',
            zIndex: members.length - index,
          }}
        >
          <img
            src={member.profile}
            alt={member.name || `Member ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {members.length > limit && (
        <div
          className="relative rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
          
          style={{
            width: '40px',
            height: '40px',
            marginLeft: '-10px',
            zIndex: 0,
          }}
        >
          +{members.length - limit}
        </div>
      )}
    </div>
  );
};

export default function WorkspaceMemberDisplay({ workspaceData }) {
  return (
    <div>
      <OverlappingAvatars members={workspaceData.members} />
    </div>
  );
}