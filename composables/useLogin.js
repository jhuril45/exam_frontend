import { ref } from '@nuxtjs/composition-api';
import { useApolloClient } from '@nuxtjs/apollo';
import {gql} from 'graphql-tag';

export function useLogin() {
  const email = ref('');
  const password = ref('');
  const error = ref(null);

  const apolloClient = useApolloClient()

  const login = async () => {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password)
          }
        `,
        variables: {
          email: email.value,
          password: password.value,
        },
      });

      const token = response.data.login;
      if (token) {
        // Handle successful login
        // For example, store token in localStorage and redirect user
        localStorage.setItem('token', token);
        window.location.href = '/'; // Redirect to homepage
      } else {
        error.value = 'Invalid credentials';
      }
    } catch (err) {
      console.error('Login error:', err);
      error.value = 'An error occurred during login';
    }
  };

  return { email, password, error, login };
}
