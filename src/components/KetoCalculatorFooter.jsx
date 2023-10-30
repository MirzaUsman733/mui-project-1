import React from 'react';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
export default function KetoCalculatorFooter() {
  const year = new Date().getFullYear();
  return (
    <>
    <div className="bg-dark bg-gradient py-5 text-white">
        <Container>
      <Grid container spacing={2} direction="row" className='m-auto'>
        <Grid item xs={12} sm={6} md={3} className="">
          <img
            className="rounded-circle mt-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtpgtnG5Cpz1YED7euVoVL5NcnuxebO7LvCQArmByBA&s"
            alt=""
          />
          <p>&copy;{year}. Mirza Usman</p>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="">
            <h5 className='text-warning ms-4'>Website Links</h5>
          <ul style={{listStyleType: 'none'}}>
            <li><Link className='text-white text-decoration-none d-block my-2'>Home</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>About</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>Services</Link></li>
            <li><Link className='text-white text-decoration-none d-block'>Contact</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="">
            <h5 className='text-warning ms-4'>Resources</h5>
          <ul style={{listStyleType: 'none'}}>
            <li><Link className='text-white text-decoration-none d-block my-2'>Home</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>About</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>Services</Link></li>
            <li><Link className='text-white text-decoration-none d-block'>Contact</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="">
            <h5 className='text-warning ms-4'>Further Information</h5>
          <ul style={{listStyleType: 'none'}}>
            <li><Link className='text-white text-decoration-none d-block my-2'>Facebook</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>Instagram</Link></li>
            <li><Link className='text-white text-decoration-none d-block mb-2'>Linkedin</Link></li>
            <li><Link className='text-white text-decoration-none d-block'>Pintrest</Link></li>
          </ul>
        </Grid>
      </Grid>
      </Container>
      <div className='text-center text-white mt-3'>
      <div className="input-group input-group-lg w-50 text-center m-auto">
  <input type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button className="btn btn-outline-primary" type="button" id="button-addon2">Button</button>
</div>
      </div>
    </div>
    <div className='bg-dark bg-gradient text-white'>
    <div className="container">
        <div className="row">
          <div className="col text-center">
            &copy; {year}. Made By Mirza Usman.
          </div>
        </div>
      </div>
      </div>
      </>
  );
}
