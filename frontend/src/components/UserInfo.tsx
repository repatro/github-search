import React from 'react';
import styled from 'styled-components';

import { IGithubUser } from '../types';

interface IUserInfoProps {
  user: IGithubUser;
}
function UserInfo({ user }: IUserInfoProps) {
  return (
    <div>
      <UserNameWithAvatar>
        {user.avatar_url && <Avatar src={user.avatar_url} alt='User avatar' width={70} height={70} />}
        <UserName>{user.name || user.login}</UserName>
      </UserNameWithAvatar>

      <Bio>{user.bio}</Bio>
    </div>
  );
}

const UserNameWithAvatar = styled.div`
  display: flex;
  align-items: flex-end;
`;
const UserName = styled.h2`
  margin-bottom: 0;
  margin-left: 15px;
`;

const Avatar = styled.img`
  display: inline-block;
  border-radius: 12px;
  box-shadow: 0 0 1pt 1pt black;
`;

const Bio = styled.div`
  margin-top: 20px;
  color: #7b7c7e;
`;

export default UserInfo;
