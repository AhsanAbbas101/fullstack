
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

export const GET_REPOS = gql`
query Repositories {
  repositories {
    edges {
      node {
        ...RepoDetails
      }
    }
  }
}
${REPO_FRAGMENT}    
`;

export const ME = gql`
query Me {
  me {
    id
    username
  }
}
`