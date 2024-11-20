import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Course from './Course/Course';
import { Container, Row, Col } from 'react-bootstrap';

import globalVar from '../globalVar';


export class RecentCourse extends Component {
    constructor() {
        super();
        this.state = {
            coursesArray: [],
        };

        console.log("api", globalVar.url + 'courses_library' )
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses() {
        const { page } = this.state;
        // Fetching data from FaceBook Jest Repo
        fetch( globalVar.url + 'courses_library',
            {
                method: "GET",
                headers: new Headers({
                    Accept: "application/vnd.github.cloak-preview"
                })
            }
        )
            .then(res => res.json())
            .then(response => 
                this.setState({ coursesArray: response.data })
            )
            .catch(error => console.log(error));
    }


    render() {
        const { coursesArray } = this.state;

        return (
            <>
            
                <section className="section section-courses">
                    <Container>
                        <h2 className="title mb-4">New Uploads</h2>
                        <Row>
                            {coursesArray.map((c, index) => (
                                
                                <Col sm={6} lg={4} xl={3}  key={c.vendorId}>
                                {c && index < 4 && (
                                    <Course 
                                        key={index}
                                        id={c.vendorId}
                                        name={c.vendor_Name}
                                        img={c.vendor_ImageLink}
                                        cssclass={c.cssclass}
                                        detail={c.detail}
                                        sort={c.sort}

                                    />
                                )}
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </>
        )
    }
}

export default RecentCourse