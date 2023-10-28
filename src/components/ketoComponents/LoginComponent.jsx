// LoginComponent.js
import React, { useState } from 'react';
import { Modal, Box, Typography, Divider, FormControl, Button, TextField } from '@mui/material';

const LoginComponent = ({ open, handleClose,handleOpenCreate,style }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    handleClose();
    setIsProcessing(false);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className="border-0">
      <Box sx={style}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card p-3 p-md-4">
                <Typography variant="h3" className="m-0 text-center">
                  Login
                </Typography>
                <Divider />
                <FormControl component="form" onSubmit={handleLogin} fullWidth className="mt-3">
                <>
                      <TextField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Input your email"
                        name="email"
                        required
                      />
                      <hr />
                      <TextField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Input your password"
                        name="password"
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-3"
                        fullWidth
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Logging in...' : 'Login'}
                      </Button>
                    </>
                </FormControl>
                <Button onClick={handleOpenCreate} className="d-block mt-3">
                    Create an account
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginComponent;
