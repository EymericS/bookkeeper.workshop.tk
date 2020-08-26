import React from "react"

import Layout from "../components/layout/layout"
import ShiftList from "../components/ShiftList"
import ShiftCreator from "../components/ShiftCreator"

export default function IndexPage({ data }) {

	return (
		<Layout>
			<ShiftCreator/>
			<ShiftList/>
		</Layout>
	)
}

/*
export const query = graphql`
    query {

    }
`
 */