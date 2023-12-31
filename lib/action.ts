import { createUserMutation, getUserQuery } from '@/graphql';
import {GraphQLClient} from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction ?
process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' :
'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ?
process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'letmein';

const serverUrl = isProduction ?
process.env.NEXT_PUBLIC_SERVER_URL || '' :
'http://localhost:3000';

const cliente = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await cliente.request(query, variables);
    } catch(error) {
        throw error;
    }
}

export const getUser = (email: string) => {
    cliente.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
}

export const createUser = (
    name: string, email: string, avatarUrl: string
) => {
    cliente.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name, email, avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation, variables);
}