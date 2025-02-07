
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
query Repositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
  repositories(
   searchKeyword: $searchKeyword,
   orderBy: $orderBy,
   orderDirection: $orderDirection,
   first: $first,
   after: $after) {
    edges {
      node {
        ...RepoDetails
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
${REPO_FRAGMENT}    
`;

export const GET_SINGLE_REPO = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    ...RepoDetails
    url
    reviews(first: $first, after: $after) {
      edges {
        node {
          ...ReviewDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
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