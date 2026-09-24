import { useState } from "react";
import RepositoryListContainer from "./RepositoryListContainer";
import useRepositories from "../hooks/useRepositories";

const RepositoryList = () => {
	const [principle, setPrinciple] = useState("latest");

	const orderVariables = {
		latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
		highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
		lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
	}[principle] ?? { orderBy: "CREATED_AT", orderDirection: "DESC" };

	const { repositories } = useRepositories(orderVariables);

	return (
		<RepositoryListContainer
			repositories={repositories}
			principle={principle}
			onPrincipleChange={setPrinciple}
		/>
	);
};

export default RepositoryList;
