import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, FormContainer, Form, Button } from './styles';

import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch {
      toast.error('An error has occurred, try again', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setId('');
    }
  }

  const { logo } = useContext(ThemeContext);

  return (
    <Container>
      <FormContainer>
        <img src={logo} alt="Be The Hero" />

        <Form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <input
            placeholder="Your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button type="submit">Sign in</Button>

          <Link to="/register">
            <FiLogIn size={16} color="#E02041" />
            Sign Up
          </Link>
        </Form>
      </FormContainer>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
