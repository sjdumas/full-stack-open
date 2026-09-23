import { render, screen, within } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { NativeRouter } from "react-router-native";
import RepositoryListContainer from "../../components/RepositoryListContainer";

describe("RepositoryList", () => {
	describe("RepositoryListContainer", () => {
		it("renders repository information correctly", async () => {
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

			await render(
				<NativeRouter>
					<RepositoryListContainer repositories={repositories} />
				</NativeRouter>
			);

			const repositoryItems = screen.getAllByTestId("repositoryItem");
			expect(repositoryItems).toHaveLength(2);

			const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

			expect(within(firstRepositoryItem).getByText("jaredpalmer/formik")).toHaveTextContent(
				"jaredpalmer/formik"
			);
			expect(
				within(firstRepositoryItem).getByText("Build forms in React, without the tears")
			).toHaveTextContent("Build forms in React, without the tears");
			expect(within(firstRepositoryItem).getByText("TypeScript")).toHaveTextContent(
				"TypeScript"
			);
			expect(within(firstRepositoryItem).getByText("1.6k")).toHaveTextContent("1.6k");
			expect(within(firstRepositoryItem).getByText("21.9k")).toHaveTextContent("21.9k");
			expect(within(firstRepositoryItem).getByText("88")).toHaveTextContent("88");
			expect(within(firstRepositoryItem).getByText("3")).toHaveTextContent("3");

			expect(within(secondRepositoryItem).getByText("async-library/react-async")).toHaveTextContent(
				"async-library/react-async"
			);
			expect(
				within(secondRepositoryItem).getByText("Flexible promise-based React data loader")
			).toHaveTextContent("Flexible promise-based React data loader");
			expect(within(secondRepositoryItem).getByText("JavaScript")).toHaveTextContent(
				"JavaScript"
			);
			expect(within(secondRepositoryItem).getByText("69")).toHaveTextContent("69");
			expect(within(secondRepositoryItem).getByText("1.8k")).toHaveTextContent("1.8k");
			expect(within(secondRepositoryItem).getByText("72")).toHaveTextContent("72");
			expect(within(secondRepositoryItem).getByText("3")).toHaveTextContent("3");
		});
	});
});
