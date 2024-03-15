import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MailDrawer from 'components/application/mail/MailDrawer';
import MailDetails from 'components/application/mail/MailDetails';
import MailList from 'components/application/mail/MailList';
import Loader from 'ui-component/Loader';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { getMails, filterMails, setImportant, setStarred, setRead } from 'store/slices/mail';

// types
import { KeyedObject } from 'types';
import { MailProps, MailDetailsProps, MailBoxCount } from 'types/mail';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: Theme; open: boolean }) => ({
  width: 'calc(100% - 320px)',
  flexGrow: 1,
  paddingLeft: open ? theme.spacing(3) : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down('xl')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

// ==============================|| MAIL MAIN PAGE ||============================== //

const MailPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('xl'));
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const [emailDetails, setEmailDetailsValue] = useState(false);
  const [selectedMail, setSelectedMail] = useState<MailProps | null>(null);
  const handleUserChange = async (data: MailProps | null) => {
    if (data) {
      await dispatch(setRead(data.id));
      await dispatch(getMails());
    }
    setSelectedMail(data);
    setEmailDetailsValue((prev) => !prev);
  };

  const [openMailSidebar, setOpenMailSidebar] = useState(true);
  const handleDrawerOpen = () => {
    setOpenMailSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    if (matchDownSM) {
      setOpenMailSidebar(false);
    } else {
      setOpenMailSidebar(true);
    }
  }, [matchDownSM]);

  const [data, setData] = useState<MailProps[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<MailBoxCount>();
  const mailState = useSelector((state) => state.mail);

  useEffect(() => {
    setData(mailState.mails);
    setUnreadCounts(mailState.unreadCount);
  }, [mailState]);

  useEffect(() => {
    // hide left drawer when email app opens

    // getData();
    const drawerToggler = dispatch(openDrawer(false));
    const mailCall = dispatch(getMails());
    Promise.all([drawerToggler, mailCall]).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState('all');
  const handleFilter = async (string: string) => {
    setEmailDetailsValue(false);
    setFilter(string);
    await dispatch(filterMails(string));
  };

  const handleImportantChange: MailDetailsProps['handleImportantChange'] = async (event, dataImportant) => {
    if (dataImportant) {
      await dispatch(setImportant(dataImportant.id));
      handleFilter(filter);
    }
  };

  const handleStarredChange: MailDetailsProps['handleStarredChange'] = async (event, dataStarred) => {
    if (dataStarred) {
      await dispatch(setStarred(dataStarred.id));
      handleFilter(filter);
    }
  };

  // search email using name
  const [search, setSearch] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newString = event.target.value;
    setSearch(newString);

    if (newString) {
      const newRows = data.filter((row: KeyedObject) => {
        let matches = true;

        const properties = ['name'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row.profile[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setData(newRows);
    } else {
      handleFilter(filter);
    }
  };

  if (loading) return <Loader />;

  return (
    <Page title="Mail">
      <Box sx={{ display: 'flex' }}>
        <MailDrawer
          openMailSidebar={openMailSidebar}
          handleDrawerOpen={handleDrawerOpen}
          filter={filter}
          handleFilter={handleFilter}
          unreadCounts={unreadCounts}
        />
        <Main theme={theme} open={openMailSidebar}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              {/* mail details & list */}
              {emailDetails ? (
                <MailDetails
                  data={selectedMail}
                  handleUserDetails={(e, d) => handleUserChange(d)}
                  handleImportantChange={handleImportantChange}
                  handleStarredChange={handleStarredChange}
                />
              ) : (
                <MailList
                  handleUserDetails={(e, d) => handleUserChange(d)}
                  handleDrawerOpen={handleDrawerOpen}
                  handleImportantChange={handleImportantChange}
                  handleStarredChange={handleStarredChange}
                  data={data}
                  search={search}
                  handleSearch={handleSearch}
                />
              )}
            </Grid>
          </Grid>
        </Main>
      </Box>
    </Page>
  );
};

MailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MailPage;
