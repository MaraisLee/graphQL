import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, Title } from "./category.styles";

const GET_CATEGORY = gql`
	query ($title: String!) {
		getCollectionsByTitle(title: $title) {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

const SET_CATEGORY = gql`
	mutation ($category: Category) {
		addCategory(category: $category) {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

const Category = () => {
	const { category } = useParams();

	// 2번째 pram은 위 query의 pram 정보
	// const { loading, error, data } = useQuery(GET_CATEGORY, {
	// 	variables: {
	// 		title: category,
	// 	},
	// });

	// [함수이름, {}]
	const [addCategory, { loading, error, data }] = useMutation(SET_CATEGORY);

	addCategory({ variables: { category: categoryObject } });

	useEffect(() => {
		if (data) {
			const {
				getCollectionsByTitle: { items },
			} = data;

			setProducts(items);
		}
	}, [category, data]);

	const [products, setProducts] = useState([]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Title>{category.toUpperCase()}</Title>
					<CategoryContainer>
						{products &&
							products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
					</CategoryContainer>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Category;
