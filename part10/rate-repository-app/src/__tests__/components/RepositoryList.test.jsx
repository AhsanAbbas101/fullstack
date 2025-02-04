import { RepositoryListContainer } from "../../components/RepositoryList";

import { render, screen } from "@testing-library/react-native";
import { within } from "@testing-library/dom";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      const [expectedFirstRepo, expectedSecondRepo] = repositories.edges.map(
        (x) => x.node
      );
      const verifyRepoObj = (elem, expected) => {
        const options = { exact: false };
        const convert = (value) =>
          value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
        expect(elem).toHaveTextContent(expected.fullName, options);
        expect(elem).toHaveTextContent(expected.language, options);
        expect(elem).toHaveTextContent(convert(expected.forksCount), options);
        expect(elem).toHaveTextContent(
          convert(expected.stargazersCount),
          options
        );
        expect(elem).toHaveTextContent(
          convert(expected.ratingAverage),
          options
        );
        expect(elem).toHaveTextContent(convert(expected.reviewCount), options);
      };

      // Add your test code here
      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(repositoryItems.length).toBeGreaterThanOrEqual(2);
      verifyRepoObj(firstRepositoryItem, expectedFirstRepo);
      verifyRepoObj(secondRepositoryItem, expectedSecondRepo);
    });
  });
});
