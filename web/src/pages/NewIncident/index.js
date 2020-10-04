import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, Content, Section, Button, Form } from './styles';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ngoId,
        },
      });

      toast.success('New case registered', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      history.push('/profile');
    } catch (err) {
      toast.error('Error while creating a new case', {
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

          <h1>Register new case</h1>
          <p>
            Describe thoroughly the case, so that you can easily locate a hero.
          </p>

          <Link to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back
          </Link>
        </Section>
        <Form onSubmit={handleNewIncident}>
          <input
            placeholder="Case"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="How much is needed in BRL"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </Form>
      </Content>
    </Container>
  );
}
