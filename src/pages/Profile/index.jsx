import { useEffect, useState } from 'react';

import ProfileMenu from '../../components/layout/ProfileMenu';
import {
  DashboardContainer,
  MyCourses,
  ProfileContainer,
  ProfileCourseList,
  ProfileDashboard,
  ProfileInfo,
  ProfileInfoText,
} from './styles';
import profileImage from '../../assets/images/default-user.png';
import { MyCourseItem } from '../../components/layout/MyCourseItem';
import { MenuBar } from '../../components/common/MenuBar';
import { BackgroundNavbar } from '../../components/common/BackgroundNavbar';
import { useSelector } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import Resize from '../../helpers/Resize';
import { Outlet, useParams } from 'react-router-dom';

import { FileUpload } from 'primereact/fileupload';
import { UploadImage } from './UploadImage';
import { fetchWithToken } from '../../helpers/fetch';
import { endPoints } from '../../const/endPoints';
import { toCapitalize } from '../../helpers/toCapitalize';
import { Image } from '@material-ui/icons';
import { Box } from '@mui/system';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  //async fetch to get the user profile image
  const fetchProfileImage = async () => {
    const res = await fetchWithToken(
      `${endPoints.get_profile_image}/${user.image}`,
      {},
      'GET'
    );
    if (res.status === 200) {
      setProfileImageUrl(res.url);
    } else {
      setProfileImageUrl('false');
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const param = useParams();
  const path = param['*'];

  const width = Resize();

  const name = user.firstName + ' ' + user.lastName;
  const capitalizeName = toCapitalize(name);

  if (!user) {
    return <Spinner />;
  }
  return (
    <>
      <BackgroundNavbar />
      <MenuBar />
      <ProfileContainer>
        <ProfileInfo>
          {path === 'profile/edit' ? (
            <UploadImage />
          ) : user.image !== 'false' ? (
            <Box
              sx={{
                '& > img': {
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                },
                overflow: 'hidden',
              }}
            >
              <img src={profileImageUrl} alt="profile" />
            </Box>
          ) : (
            <Box
              sx={{
                '& > img': {
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                },
                overflow: 'hidden',
              }}
            >
              <img src={profileImage} alt="profile standar" />
            </Box>
          )}
          <ProfileInfoText>
            <h2>{capitalizeName}</h2>
            {/* <p>Profesora en tal cosa</p>
            <p>Se unit en 2022</p> */}
          </ProfileInfoText>
        </ProfileInfo>
        <ProfileDashboard>
          <DashboardContainer>
            <Outlet />
          </DashboardContainer>
        </ProfileDashboard>
      </ProfileContainer>
    </>
  );
};

export default Profile;
