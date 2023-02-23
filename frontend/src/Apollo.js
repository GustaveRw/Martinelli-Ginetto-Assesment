import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://your-magento-site.com/graphql'
});

export default client;
