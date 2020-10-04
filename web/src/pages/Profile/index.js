import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FaSignOutAlt } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';

import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, Header, Ul } from './styles';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');

  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          Authorization: ngoId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));

      toast.success('Case deleted sucessfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('Error while deleting the case', {
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

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }
  const { logo } = useContext(ThemeContext);
  return (
    <Container>
      <Header>
        <img src={logo} alt="Be The Hero" />

        <span>Welcome, {ngoName} </span>

        <Link to="/incidents/new">Register new case</Link>
        <button onClick={handleLogout} type="button">
          <div>
            <FaSignOutAlt size={22} color="#E02041" />
          </div>
        </button>
      </Header>
      {incidents.length > 0 ? <h1>Registered cases</h1> : null}

      <Ul>
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <li key={incident.id}>
              <strong>CASE:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIPTION:</strong>
              <p>{incident.description}</p>

              <strong>HELP NEEDED:</strong>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident.value)}
              </p>

              <button
                onClick={() => handleDeleteIncident(incident.id)}
                type="button"
              >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))
        ) : (
          <h1>No cases registered</h1>
        )}
      </Ul>
    </Container>
  );
}
