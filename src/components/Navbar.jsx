import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Container,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 991.98px)');
  const drawerWidth = '50%';
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const renderNavItems = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '230px', display: 'flex', alignItems: 'center' }}>
        {/* Add the search input */}
        <div style={{ marginRight: '10px' }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </div>
        <InputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          style={{ color: 'inherit' }}
        />
      </div>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/about">
        About
      </Button>
      <Button color="inherit" component={Link} to="/services">
        Services
      </Button>
      <Button color="inherit" component={Link} to="/contact">
        Contact
      </Button>
    </div>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Container>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ketogenic
          </Typography>
          {!isMobile && renderNavItems()}
        </Toolbar>
        {isMobile && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
            }}
          >
            <Container style={{ marginTop: '50px' }}>
              <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
                {/* Add the search input */}
                <div style={{ marginRight: '10px' }}>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </div>
                <InputBase
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                  style={{ color: 'inherit' }}
                />
              </div>
              <List style={{ margin: 'auto' }}>
                <ListItem component={Link} to="/" onClick={handleDrawerClose}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to="/about" onClick={handleDrawerClose}>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem component={Link} to="/services" onClick={handleDrawerClose}>
                  <ListItemText primary="Services" />
                </ListItem>
                <ListItem component={Link} to="/contact" onClick={handleDrawerClose}>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Container>
          </Drawer>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;
