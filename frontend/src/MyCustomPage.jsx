import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import authenticate from './auth';
import ErrorBoundary from 'react-error-boundary';
import CustomPageTemplate from './CustomPageTemplate';
import LoginForm from '@mui/material';

const MY_CUSTOM_PAGE_QUERY = gql`
  query MyCustomPageQuery {
    myCustomPageData {
      field1
      field2
      // add additional fields as needed
      products {
        id
        name
        price
        image {
          url
          // add additional image fields as needed
        }
      }
    }
  }
`;

const MyCustomPage = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = async (email, password) => {
    const token = await authenticate(email, password);
    setAccessToken(token);
  };

  return (
    <div>
      {!accessToken && (
        <LoginForm onLogin={handleLogin} />
      )}

      {accessToken && (
        <Query
          query={MY_CUSTOM_PAGE_QUERY}
          context={{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error!</div>;

            // pass data to custom page template
            return (
              <ErrorBoundary fallback={<div>Error!</div>}>
                <CustomPageTemplate data={data.myCustomPageData} />
              </ErrorBoundary>
            );
          }}
        </Query>
      )}
    </div>
  );
};

export default MyCustomPage;