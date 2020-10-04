import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { toast } from 'react-toastify';

import api from '../../services/api';
import {
  Container,
  Content,
  Section,
  InputGroup,
  Button,
  Form,
} from './styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await api.post('/ngos', data);

      toast.success(`Your access code: ${response.data.id}`, {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      history.push('/');
    } catch (err) {
      toast.error('An error has occurred, try again', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const { logo } = useContext(ThemeContext);

  return (
    <Container>
      <Content>
        <Section>
          <img src={logo} alt="Be The Hero" />

          <h1>Sign Up</h1>
          <p>
            Sign up and join thousands of people around the world helping NGOs
          </p>

          <Link to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Already have an account? Login
          </Link>
        </Section>
        <Form onSubmit={handleRegister}>
          <input
            placeholder="NGO Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Telephone"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <InputGroup>
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '70%' }}
            />
            <input
              placeholder="USPS"
              style={{ width: 125 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </InputGroup>

          <Button type="submit">Sign Up</Button>
        </Form>
      </Content>
    </Container>
  );
}
