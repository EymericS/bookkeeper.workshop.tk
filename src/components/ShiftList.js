import React from "react"

import Table from "react-bootstrap/Table"
import Box from "@chakra-ui/core/dist/Box"

export default function shiftList( props ) {

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
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<td>3</td>
					<td colSpan="2">Larry the Bird</td>
					<td>@twitter</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				</tbody>
			</Table>
		</Box>
	)
}