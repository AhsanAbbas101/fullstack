import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query ALL_AUTHORS {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query ALL_BOOKS {
        allBooks {
            author {
                name
            }
            published
            title
        }
    }
`
export const ADD_BOOK = gql`
    mutation ADD_BOOK($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            author {
                name
            }
            published
            title
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
    }
`