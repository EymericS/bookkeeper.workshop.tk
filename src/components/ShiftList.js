import React from "react"

import Table from "react-bootstrap/Table"
import Box from "@chakra-ui/core/dist/Box"
import Shift from "../script/shift"

export default function shiftList({ shifts } ) {
	shifts.map( shift => new Shift(shift) )

	return (
		<Box>
			<Table striped bordered hover size="sm">
				<thead>
				<tr>
					<th>Date</th>
					<th>Start</th>
					<th>End</th>
					<th>Location</th>
					<th>Bonus</th>
					<th>Earn</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{shifts.map( (shift) => (
					<tr key={shift.id}>
						<td>{shift.id}</td>
						<td>{shift.start}</td>
						<td>{shift.end}</td>
						<td>{shift.locationName}</td>
						<td>{shift.bonus}</td>
						<td>{shift.earn}</td>
						<td>EDIT / REMOVE</td>
					</tr>
				))}
				</tbody>
			</Table>
		</Box>
	)
}