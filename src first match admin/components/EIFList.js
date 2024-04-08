import React from 'react';
import { fetchEiflist, baseApiUrl } from '../api/api';
import { connect } from 'react-redux';
import axios from 'axios';
import '../App.css';
import { BeatLoader } from 'react-spinners';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { store } from '../App';
export class EIFList extends React.Component {
    constructor() {
        super();
        this.state = {
            EifList: [],
            listID: '',
            listData: [],
            customerId: '',
            categoryId: '',
            formstatus: '',
            raf_link: '',
            list_status: '',
            Host: window.location.host
        };
    }
    async componentDidMount() {
        this.setState({ loading: true });
        const EifList = await fetchEiflist();
        this.setState({
            EifList: EifList,
            loading: false
        });
    }

    getDetails = (e) => {
        e.preventDefault();
        let listID = this.state.listID;
        if (e.currentTarget.dataset.id === 0 || e.currentTarget.dataset.id) {
            listID = e.currentTarget.dataset.id;
        }

        const List = this.state.EifList.response.filter((listdata) => listdata.id == listID);
        let customer_id = List.find((obj) => obj.customer_id);
        this.setState({
            listID: listID,
            listData: List,
            customerId: customer_id.customer_id,
            categoryId: customer_id.category_id,
            list_status: customer_id.is_status_updated
        });
    };
    addDecision = async (e) => {
        const { categoryId, customerId } = this.state;
        const { value } = e.target;
        const data = {
            customer: customerId,
            category: categoryId,
            form_status: value
        };

        const currentUser = store.getState().loginData.user.token;
        const response = await axios
            .post(`${baseApiUrl}/stages/validate/`, data, {
                headers: {
                    Authorization: `Bearer ${currentUser}`
                }
            })
            .then((response) => {
                return response.data;
            });

        this.setState({ listID: '', raf_link: response.response.raf_link });
    };

    render() {
        let { listID, raf_link, list_status, loading } = this.state;
        let eifID = raf_link && raf_link.split('/');
        if (listID !== '') {
            return (
                <div className="container-fluid">
                    <div className="row p-2 bg-primary text-white mb-1">EIF List Details</div>

                    <ul className="list-group">
                        {this.state.listData.map((info) =>
                            info.questions.map((qinfo) =>
                                qinfo.answers.map((q) => (
                                    <li className="list-group-item mb-1" onClick={this.getDetails}>
                                        <span className="text-primary "> {qinfo.question}</span> <br />
                                        <span className=" ">(A)</span> - <span className="text-primary font-weight-bold">{q.answer}</span>
                                    </li>
                                ))
                            )
                        )}
                    </ul>

                    {list_status === true ? (
                        ''
                    ) : (
                        <div className="form-group row mt-3 mb-3">
                            <div className="col-sm-1  ">&nbsp;</div>
                            <div className="col-sm-5 d-flex justify-content-center">
                                <button type="submit" value="approved" className="btn btn-primary pr-5 pl-5" onClick={(e) => this.addDecision(e, 'value')}>
                                    Approve
                                </button>
                            </div>
                            <div className="col-sm-5 d-flex justify-content-center">
                                <button type="submit" value="rejected" className="btn btn-secondary pr-5 pl-5" onClick={(e) => this.addDecision(e, 'value')}>
                                    Reject
                                </button>
                            </div>
                            <div className="col-sm-1">&nbsp;</div>
                        </div>
                    )}

                    <div className="m-0">&nbsp;</div>
                </div>
            );
        } else {
            if (raf_link !== '') {
                return (
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center mb-4">
                            Click here to fill the Readiness Assessment Form - &nbsp;
                            <Link to={`/admin/raf/${eifID[eifID.length - 1]}`} className="font-weight-bold">
                                {raf_link}
                            </Link>
                        </div>
                        <div>&nbsp;</div>
                    </div>
                );
            } else {
                return (
                    <div className="container-fluid">
                        <div className="row p-2 bg-primary text-white mb-1">EIF List</div>
                        {loading ? (
                            <div className="form-group mt-5 row d-flex justify-content-center">
                                <span className="font-weight-bold h5">Loading</span>
                                <BeatLoader size={24} color="#0099CC" loading={loading} />
                                <BeatLoader size={24} color="#0099CC" loading={loading} />
                            </div>
                        ) : (
                            ''
                        )}
                        <ul className="list-group">
                            {this.state.EifList.response &&
                                this.state.EifList.response.map((ques, index) => (
                                    <li key={index} className="list-group-item mb-1" data-id={ques.id} onClick={this.getDetails}>
                                        <span className="text-primary ">{ques.org_name}</span> <br />
                                        <span className=" ">Created On: </span> <span className="text-primary font-weight-bold">{ques.date_created}</span>
                                        <br />
                                        <span className=" ">Status: </span>
                                        <span className="text-primary font-weight-bold">{ques.is_approved === ques.is_rejected ? 'Pending' : ques.is_approved !== true ? 'Rejected' : 'Approved'}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                );
            }
        }
    }
}
const mapStateToProps = (state) => {
    return {
        EifList: state.eiflist.EifList
    };
};
export default connect(mapStateToProps)(EIFList);
