
import { gql } from '@apollo/client';

const REPO_FRAGMENT = gql`
fragment RepoDetails on Repository {
  id
  fullName
  language
  ownerAvatarUrl
  description
  stargazersCount
  forksCount
  reviewCount
  ratingAverage
}
`;
const REVIEW_FRAGMEMT = gql`
fragment ReviewDetails on Review {
  id
  text
  rating
  createdAt
  repositoryId
  user {
    id
    username
  }
}
`

export const GET_REPOS = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
        ...RepoDetails
      }
    }
  }
}
${REPO_FRAGMENT}    
`;

export const GET_SINGLE_REPO = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    ...RepoDetails
    url
    reviews {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
}
${REPO_FRAGMENT}
${REVIEW_FRAGMEMT}
`

export const ME = gql`
query Me($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
}
${REVIEW_FRAGMEMT}
`