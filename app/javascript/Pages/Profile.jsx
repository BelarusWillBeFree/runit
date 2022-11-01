import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSnippets } from '../hooks';

import axios from 'axios';
import routes from '../routes.js';

export function Profile() {
  const [snippets, setSnippets] = useState([]);
  const { t } = useTranslation();
  const [userdata, setUserdata] = useState([]);
  const snippetApi = useSnippets();

  const parseDate = (date) => {
    try {
      return new Intl.DateTimeFormat().format(new Date(date));
    } catch {
      return 'date is loading!';
    }
  };

  useEffect(() => {
    const fetchUserSnippets = async () => {
      const response = await axios.get(routes.userProfilePath());
      setUserdata(response.data.currentUser);
      setSnippets(response.data.snippets);
    };
    fetchUserSnippets();
    parseDate();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={12} md={3} my={4}>
          <div>
            <img
              className="rounded-circle"
              src="#" /* TODO: add link */
              alt="User avatar" /* TODO: add default user pic */
            />
          </div>
          <h2 className="my-2">
            {t('profile.username')} {userdata.name}
          </h2>
          <h3 className="my-2">
            {t('profile.createdAt')}
            {parseDate(userdata.created_at)}
          </h3>
          <h3 className="my-2">
            {t('profile.userId')} {userdata.id}
          </h3>
          <h3 className="my-2">
            {t('profile.email')} {userdata.email}
          </h3>
          <div>
            <Button>
              {t('profile.editProfileButton')} {/* TODO: add edit tool */}
            </Button>
            <Button>
              {t('profile.copyProfileButton')}{' '}
              {/* TODO: add ability to copy user profile link */}
            </Button>
          </div>
        </Col>
        <Col xs={12} md={9} my={4} className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <h2>{t('profile.replsHeader')}</h2>
            <Row xs={1} md={2} className="g-4">
              {snippets.map(({ id, name }) => (
                <Col xs lg="3" key={id}>
                  <Card border="primary">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {/* TODO: add a snapshot for snippet */}
                      </Card.Text>
                        <Link to={snippetApi.genSnippetLink(id)}>
                          <Button variant="primary">
                            {t('profile.openReplButton')}
                          </Button>
                        </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
