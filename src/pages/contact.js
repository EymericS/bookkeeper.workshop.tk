import React from "react"
import { Link } from "gatsby"

import Header from "../components/header"
import Layout from "../components/layout"

export default function Contact() {
  return (
    <Layout>
      <Link to="/">Home</Link>
      <Header headerText="Contact" />
      <h2>I'd love to talk! Email me at the address below</h2>
      <p>
        Send us nudes ! <a href="mailto:me@example.com">me@example.com</a>
      </p>
    </Layout>
  )
}