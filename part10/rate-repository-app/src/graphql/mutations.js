import { gql } from "@apollo/client";


export const AUTH = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
    id
  }
}
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}`