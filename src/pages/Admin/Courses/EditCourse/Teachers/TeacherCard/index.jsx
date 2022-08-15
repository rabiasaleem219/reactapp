import { Avatar } from '@mui/material';
import { endPoints } from 'const/endPoints';
import { profileImageLink } from 'const/profileImageLink';
import { toCapitalize } from 'helpers/toCapitalize';
import { TeacherCardContainer } from './styles';

export const TeacherCard = ({ teacher }) => {
  const { id, firstName, lastName, email, image, username } = teacher;

  const name = toCapitalize(`${firstName} ${lastName}`);

  return (
    <TeacherCardContainer>
      <Avatar
        sx={{
          width: '57px',
          height: '57px',
        }}
        src={`${profileImageLink}${image}`}
        alt="avatar"
      />
      <h3>
        {name} <br />
        <span>{username}</span>
      </h3>
    </TeacherCardContainer>
  );
};
