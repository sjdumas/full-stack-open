import { useNavigate } from "react-router-native";
import ReviewForm from "./ReviewForm";
import useCreateReview from "../hooks/useCreateReview";

const CreateReview = () => {
	const navigate = useNavigate();
	const [createReview] = useCreateReview();

	const onSubmit = async (values) => {
		try {
			const data = await createReview({
				...values,
				rating: Number(values.rating),
			});
			const repositoryId = data.createReview.repositoryId;
			navigate(`/repository/${repositoryId}`);
		} catch (e) {
			console.log(e);
		}
	};

	return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
