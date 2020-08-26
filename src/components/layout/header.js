import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

const MenuItem = ({ to, children }) => (
	<Nav.Link as={GatsbyLink} to={to}>
		{children}
	</Nav.Link>
)

export default function Header( props ) {
	const data = useStaticQuery(
		graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
		`
	)

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand color="white" href="/">{data.site.siteMetadata.title}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<MenuItem to="/">Home</MenuItem>
					<MenuItem to="/about">About</MenuItem>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	)
}