import React from "react"

import Layout from "../components/layout/layout"
import ShiftList from "../components/ShiftList"
import ShiftCreator from "../components/ShiftCreator"

import Shift from "../script/shift"

export default function IndexPage({ data }) {

	const shifts = [
		new Shift({
			id: 1,
			date: "01/01/2020",
			start: 578,
			end: 743,
			location: 1,
			bonus: 1
		}),
		new Shift({
			id: 2,
			date: "27/04/2020",
			start: 450,
			end: 510,
			location: 1,
			bonus: 1
		}),
			new Shift({
			id: 3,
			date: "05/09/2020",
			start: 785,
			end: 973,
			location: 2,
			bonus: 1,
		}),
	]


	return (
		<Layout>
			<ShiftCreator  />
			<ShiftList shifts={shifts}/>
		</Layout>
	)
}

/*
export const query = graphql`
    query {

    }
`

8.5
6

 */