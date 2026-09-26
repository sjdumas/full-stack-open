import { useState } from "react";
import { useDebounce } from "use-debounce";
import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../hooks/useRepositories";

const RepositoryList = () => {
	const [principle, setPrinciple] = useState("latest");
	const [searchKeyword, setSearchKeyword] = useState("");
	const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

	const orderVariables = {
		latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
		highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
		lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
	}[principle] ?? { orderBy: "CREATED_AT", orderDirection: "DESC" };

	const { repositories } = useRepositories({
		...orderVariables,
		searchKeyword: debouncedSearchKeyword,
	});

	return (
		<RepositoryListContainer
			repositories={repositories}
			principle={principle}
			onPrincipleChange={setPrinciple}
			searchKeyword={searchKeyword}
			onSearchKeywordChange={setSearchKeyword}
		/>
	);
};

export default RepositoryList;
