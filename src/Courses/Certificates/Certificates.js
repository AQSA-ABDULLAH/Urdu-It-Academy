import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Certificate from './Certificate/Certificate';
import { Container, Row, Col } from 'react-bootstrap';
import globalVar from '../../globalVar';

export class Certificates extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        courseName: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            certificatesArray: [],
            vendorId: props.id
        };
    }
    
    componentDidMount() {
        const { vendorId } = this.state;
        this.loadCertificates(vendorId);
    }

    loadCertificates(vendorId) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vendorId })
        };
        fetch(globalVar.url + 'certificates', requestOptions)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    certificatesArray: response.data
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const { certificatesArray, vendorId } = this.state;

        return (
            <section className="section section-courses inner-page">
                <Container>
                    {certificatesArray.length > 0 ? (
                        <Row>
                            {certificatesArray.map((e) => (
                                <Col sm={6} lg={4} xl={3} key={e.certificationId}>
                                    <Certificate
                                        certificationId={e.certificationId}
                                        certification_Name={e.certification_Name}
                                        vendorId={vendorId} // Pass vendorId here
                                        certificateDetail={e.detail} // Pass certificateDetail
                                        status={e.status} // Pass status
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="alert alert-info">
                            No certificates available.
                        </div>
                    )}
                </Container>
            </section>
        );
    }
}

export default Certificates;
