import React from "react"

import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }) {

	return (
		<div id="page-container">
			<Header></Header>
			<div id="content-wrap">
				{children}
			</div>
			<Footer></Footer>
		</div>
	)
}