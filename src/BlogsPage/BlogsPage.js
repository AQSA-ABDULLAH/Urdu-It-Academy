import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';

import globalVar from '../globalVar';
import Discovers from '../Discovers/Discovers';
import Blog from '../Blogs/Blog/Blog';

export class BlogsPage extends Component {
    constructor() {
        super();
        this.state = {
            blogsArray: [],
        };
    }

    componentDidMount() {
        this.loadBlogs();
    }

    loadBlogs() {
        fetch(globalVar.url + 'blogpost', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latestRecordCount: 0 })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ blogsArray: response.data.data });
                console.log("BLOGS HAIN", this.state.blogsArray);
            })
            .catch(error => console.log(error));
    }

    render() {
        const { blogsArray } = this.state;
        return (
            <>
                <section className="section section-courses inner-page">
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Blogs</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className="title page-title">Blogs</h2>

                        <Row>
                            {blogsArray.map((b, index) => (
                                <Col sm={6} lg={4} xl={3} key={index} className="mb-4">
                                    {b && index < 4 && (
                                        <Blog
                                            key={index}
                                            id={b.id}
                                            name={b.Title}
                                            img={b.feature_image}
                                        />
                                    )}
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                <Discovers />
            </>
        );
    }
}

export default BlogsPage;
