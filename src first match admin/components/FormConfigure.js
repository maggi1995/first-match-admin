import React, { useState } from 'react';
import { saveClientConfigure, fetchConfigureQuestions } from '../api/api';
import Preview from './Preview_Questions';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GrDrag } from "react-icons/gr";

const animatedComponents = makeAnimated();
const customStyles = {
    content: {
        position: 'absolute',
        width: '70%',
        top: '35%',
        marginTop: '-150px',
        left: '20%',
        right: '10%',
        marginLeft: '-100px',
        height: 'auto',
        overflow: 'scroll',
        border: '1px solid black'
    }
};
const colourStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '0px dotted green',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'green' : 'white'
    }),
    control: (provided) => ({
        ...provided,
        marginTop: '5%'
    })
};
class FormConfigure extends React.Component {
    constructor() {
        super();
        this.state = this.getInitialState();
    }
    getInitialState() {
        return {
            sections: [
                {
                    section: 'Demographics',
                    section_id: 0,
                    related: 'false',
                    questions: [
                        {
                            question_id: 0,
                            question: 'Client Code',
                            description: '',
                            field_type: '1',
                            answer_type: 'NUMBER',
                            suggested_answers: [''],
                            suggested_jump: [''],
                            validation1: '100',
                            validation2: '99999',
                            error_msg: 'Should be range between 100 - 99999',
                            related: 'no',
                            required: 'yes',
                            flag: '0'
                        },
                        {
                            question_id: 1,
                            question: 'First Name',
                            description: '',
                            field_type: '1',
                            answer_type: 'TEXT',
                            suggested_answers: [''],
                            suggested_jump: [''],
                            validation1: 'Contains',
                            validation2: 'Both',
                            error_msg: 'Should not contain special characters',
                            related: 'no',
                            required: 'yes',
                            flag: '0'
                        },
                        {
                            question_id: 2,
                            question: 'Last Name',
                            description: '',
                            field_type: '1',
                            answer_type: 'TEXT',
                            suggested_answers: [''],
                            suggested_jump: [''],
                            validation1: 'Contains',
                            validation2: 'Both',
                            error_msg: 'Should not contain special characters',
                            related: 'no',
                            required: 'yes',
                            flag: '0'
                        }
                    ]
                },
            ],
            lastItemId: 3,
            lastSectionId: 0,
            Org_id: '',
            readOnly: '',
            isPreview: false,
            isOpen: false,
            logoPath: '',
            header_color: ''
        };
    }

    componentDidMount = async () => {
        let outcomesSec = {
            section: "Outcomes1",
            section_id: this.state.sections.length - 1,
            related: "false",
            questions: [
                {
                    answer_type: "RADIO",
                    question: "Referral Status",
                    question_id: 0,
                    related: "no",
                    required: "no",
                    flag: "0",
                    suggested_answers: [
                        {
                            id: 0,
                            value: 'Pending',
                            isChecked: true
                        },
                        {
                            id: 1,
                            value: 'Accepted',
                            isChecked: false
                        },
                        {
                            id: 2,
                            value: 'Rejected',
                            isChecked: false
                        },
                        {
                            id: 3,
                            value: 'Rescinded',
                            isChecked: false
                        }
                    ],
                    suggested_jump: [
                        {
                            answer: 'Pending',
                            jumpto: [''],
                            question_jumpto: ["Reason for Rescinded Referral", "How many programs?"]
                        },
                        {
                            answer: 'Rejected',
                            jumpto: [''],
                            question_jumpto: ["Reason for Rescinded Referral", "Reason for Unsuccessful Program Completion", "Who was the referring agency/agencies?"]
                        },
                        {
                            answer: 'Rescinded',
                            jumpto: [''],
                            question_jumpto: ["Reason for Rescinded Referral", "Reason for Unsuccessful Program Completion", "Who was the referring agency/agencies?"]
                        }
                    ],
                    validation1: "",
                    validation2: ""
                },
                {
                    answer_type: "SELECT",
                    question: "Program",
                    question_id: 1,
                    related: "no",
                    required: "no",
                    flag: "0",
                    suggested_answers: [
                        {
                            id: 0,
                            value: 'The Academy: Community Based Services',
                            isChecked: false
                        },
                        {
                            id: 1,
                            value: 'The Academy: Phoenix Program',
                            isChecked: false
                        },
                        {
                            id: 2,
                            value: 'Diakon SPIN',
                            isChecked: false
                        },
                        {
                            id: 3,
                            value: 'George Junior Preventative Aftercare',
                            isChecked: false
                        },
                        {
                            id: 4,
                            value: 'Lebanon County Probation: Informal Adjustment',
                            isChecked: false
                        },
                        {
                            id: 5,
                            value: 'Lebanon County Probation: Consent Decree',
                            isChecked: false
                        },
                        {
                            id: 6,
                            value: 'PA Counseling: MST',
                            isChecked: false
                        },
                        {
                            id: 7,
                            value: 'Youth Advocate Program: Advocate Services',
                            isChecked: false
                        },
                        {
                            id: 8,
                            value: 'Youth Advocate Program: Community Reintegration Program',
                            isChecked: false
                        },
                        {
                            id: 9,
                            value: 'Youth Advocate Program: Community Treatment Center',
                            isChecked: false
                        }
                    ],
                    validation1: "",
                    validation2: ""
                },
                {
                    answer_type: "DATE",
                    question: "Start Date",
                    question_id: 2,
                    related: "no",
                    required: "no",
                    flag: "0",
                    suggested_answers: [''],
                    suggested_jump: [''],
                    validation1: "",
                    validation2: ""
                },
                {
                    answer_type: "RADIO",
                    question: "Program Completion",
                    question_id: 3,
                    related: "no",
                    required: "no",
                    flag: "0",
                    suggested_answers: [
                        {
                            id: 0,
                            value: 'Successful',
                            isChecked: false
                        },
                        {
                            id: 1,
                            value: 'Unsuccessful',
                            isChecked: false
                        }
                    ],
                    suggested_jump: [''],
                    validation1: "",
                    validation2: ""
                },
                {
                    answer_type: "DATE",
                    question: "End Date",
                    question_id: 4,
                    related: "no",
                    required: "no",
                    flag: "0",
                    suggested_answers: [''],
                    suggested_jump: [''],
                    validation1: "",
                    validation2: ""
                },
                {
                    answer_type: "SELECT",
                    question: "Remained Out of Care",
                    question_id: 5,
                    related: "no",
                    required: "yes",
                    flag: "0",
                    suggested_answers: [
                        {
                            id: 0,
                            value: 'Yes',
                            isChecked: false
                        },
                        {
                            id: 1,
                            value: 'No',
                            isChecked: false
                        }
                    ],
                    suggested_jump: [],
                    validation1: "",
                    validation2: ""
                }
            ],
        }
        let { id } = this.props.match.params;
        let logopath = this.props.organizationsList.find((org) => org.id === Number(id)).logo_path;
        console.log("logoooo", logopath, this.props)
        let headerColor = this.props.organizationsList.find((org) => org.id === Number(id)).header_color;
        let response = await fetchConfigureQuestions(id);
        console.log("fetch Configure Questions", response)
        let res = response.response[response.response.length - 1]
        if (res.section != "Outcomes1") {
            response.response.push(outcomesSec)
        }
        if (response.message !== 'sections not available') {
            this.setState({
                Org_id: id,
                sections: response.response ? response.response : this.state.sections,
                //sections: this.state.sections,
                readOnly: response.is_prediction_available,
                logoPath: logopath,
                header_color: headerColor
            });
        } else {
            this.setState({
                Org_id: id,
                logoPath: logopath,
                header_color: headerColor,

            });
        }
    };
    handleMove = async (e) => {
        e.preventDefault();
        const { srcI, desI, list } = this.state;
        console.log('handle move', srcI, desI, list)
        if (desI) {
            const src = list[srcI].id;
            const des = list[desI].id;
            list.splice(desI, 0, list.splice(srcI, 1)[0]);
            await this.saveList(list);
            //    const response = await alterQuestions(src, des)
        }
        this.setState({
            showPOPUP: false,
            btnAction: ''
        });
    };
    getList() {
        return (localStorage.getItem('theList') && JSON.parse(localStorage.getItem('theList'))) || this.list;
    }
    saveList = (list) => {
        localStorage.setItem('theList', JSON.stringify(list));
        console.log('list', list)
    };

    handleDelete = (idx) => (e) => {
        const index = e.target.dataset.id;
        const secid = e.target.dataset.secid;
        let sections = [...this.state.sections];
        sections[secid].questions[idx].suggested_answers = sections[secid].questions[idx].suggested_answers.filter((item, i) => index != i);
        sections[secid].questions[idx].suggested_jump = sections[secid].questions[idx].suggested_jump.filter((item, i) => index != i);
        // const sectionss = this.state.sections[secid].questions[idx].suggested_answers.filter((item, i) => index != i)
        this.setState({
            sections
        });
    };

    alterID = (id) => {
        let sections = [...this.state.sections];
        sections[id].questions = sections[id].questions.map((item, id) => {
            return {
                question_id: id,
                question: item.question,
                description: item.description,
                field_type: item.field_type,
                answer_type: item.answer_type,
                suggested_answers: item.suggested_answers,
                suggested_jump: item.suggested_jump,
                validation1: item.validation1,
                validation2: item.validation2,
                error_msg: item.error_msg,
                related: item.related,
                required: item.required,
                flag: item.flag
            };
        });
        this.setState({ sections });
    };

    quesDelete = (i) => (e) => {
        e.preventDefault();
        const idi = e.target.dataset.id;
        let sections = [...this.state.sections];
        sections[idi].questions = [...sections[idi].questions.slice(0, i), ...sections[idi].questions.slice(i + 1)];
        let id = sections[idi].questions.length;
        this.alterID(idi);
        this.setState({
            //sections,
            lastItemId: id
        });
    };

    sectionDelete = (i) => (e) => {
        e.preventDefault();
        const idi = e.target.dataset.id;
        let sections = [...this.state.sections];
        sections = [...sections.slice(0, i), ...sections.slice(i + 1)];
        let id = this.state.lastSectionId;
        this.setState({
            sections,
            lastSectionId: id - 1
        });
    };

    addAnswer = (i) => (e) => {
        e.preventDefault();
        let secid = e.target.dataset.secid;
        let sections = [...this.state.sections];
        sections[secid].questions[i].suggested_answers = this.state.sections[secid].questions[i].suggested_answers.concat(['']);
        this.setState({ sections });
    };

    handleChange = (e) => {
        let secid = e.target.dataset.secid;
        console.log("section id", secid)
        if (
            ['question', 'suggested_answers', 'suggested_jump', 'description', 'validation1', 'validation2', 'answer_type', 'error_msg', 'required', 'related', 'flag', 'field_type', 'checkbox'].includes(
                e.target.dataset.name,
                console.log(e.target.dataset.name)
            )
        ) {
            if (e.target.dataset.name === 'suggested_answers' || e.target.dataset.name === 'suggested_jump'
                || e.target.dataset.name === 'checkbox') {
                let sections = [...this.state.sections];
                if (e.target.dataset.name === 'suggested_jump') {
                    sections[secid].questions[e.target.dataset.id].suggested_jump[e.target.dataset.idy] = {
                        answer: sections[secid].questions[e.target.dataset.id].suggested_answers[e.target.dataset.idy].value,
                        jumpto: e.target.value
                    };
                } else if (e.target.dataset.name === 'suggested_answers') {
                    sections[secid].questions[e.target.dataset.id].suggested_answers[e.target.dataset.idy] = {
                        id: parseInt(e.target.dataset.idy),
                        value: e.target.value,
                        isChecked: false
                    };
                    console.log(secid, e.target.dataset.id, e.target.dataset.idy)
                    console.log(parseInt(e.target.dataset.idy), e.target.value)
                } else {
                    let answer = { ...sections[secid].questions[e.target.dataset.id].suggested_answers[e.target.dataset.idy] }
                    console.log("answers", answer)
                    if (e.target.checked) {
                        answer.isChecked = e.target.checked
                        sections[secid].questions[e.target.dataset.id].suggested_answers.splice(e.target.dataset.idy, 1);
                        sections[secid].questions[e.target.dataset.id].suggested_answers.push(answer);
                        console.log(answer.isChecked, e.target.checked)
                    }
                    else {
                        sections[secid].questions[e.target.dataset.id].suggested_answers[e.target.dataset.idy].isChecked = false;
                    }

                }
                this.setState({ sections });
            } else {
                let sections = [...this.state.sections];

                if (e.target.dataset.name === 'answer_type') {
                    sections[secid].questions[e.target.dataset.id][e.target.dataset.name] = e.target.value;
                    sections[secid].questions[e.target.dataset.id].suggested_answers =
                        sections[secid].questions[e.target.dataset.id].suggested_answers.length === 0 ? [''] : sections[secid].questions[e.target.dataset.id].suggested_answers;
                    this.setState({ sections });
                } else {
                    sections[secid].questions[e.target.dataset.id][e.target.dataset.name] = e.target.value;
                    this.setState({ sections });

                    let quesName = e.target.value
                    let quesRes = quesName.includes(".")
                    console.log("question name", quesName, quesRes)
                    if (quesRes === true) {
                        alert("Sections" + " " + [secid] + " " + ": " + "Question" + " " + [e.target.dataset.id] + " " + ": " + [quesName] + " " + 'should not contain "." sign. Please remove "." sign')
                    }
                }
            }
        } else {
            let sections = [...this.state.sections];
            const { name, value } = e.target;
            if (name === 'related') {
                let val = this.state.sections[secid].related;
                const val1 = value === val ? (value === 'true' ? 'false' : 'true') : 'false';
                sections[secid][name] = val1;
            } else {
                sections[secid][name] = value;
            }
            this.setState({
                sections
            });
        }
    };
    newItemId = () => {
        const id = this.state.lastItemId;
        this.state.lastItemId += 1;
        return id;
    };

    newSectionId = () => {
        const id = this.state.lastSectionId - 2;
        console.log("new section id", id)
        this.state.lastSectionId += 1;
        return id;
    };

    addQuestion = (e) => {
        const secid = e.target.dataset.id;
        const quesid = Number(e.target.dataset.idx);
        this.setState({
            lastItemId: quesid
        });
        const id = this.newItemId();
        let ques = {
            question_id: quesid + 1,
            question: '',
            description: '',
            field_type: '1',
            answer_type: '',
            suggested_answers: [''],
            suggested_jump: [],
            validation1: '',
            validation2: '',
            error_msg: '',
            related: 'no',
            required: 'yes',
            flag: '0'
        };
        let sections = [...this.state.sections];
        sections[secid].questions = [...sections[secid].questions, ques];
        let { readOnly } = this.state;

        if (readOnly) {
            this.setState({
                [`Ques-${quesid + 1}`]: true
            });
        }

        this.setState({ sections });
    };

    addSection = () => {
        const id = this.newSectionId();
        this.setState((prevState) => ({
            sections: [
                ...prevState.sections,
                {
                    section: '',
                    section_id: id + 1,
                    related: 'false',
                    questions: [
                        {
                            question_id: 0,
                            question: '',
                            description: '',
                            field_type: '1',
                            answer_type: '',
                            suggested_answers: [''],
                            suggested_jump: [],
                            validation1: '',
                            validation2: '',
                            error_msg: '',
                            related: 'no',
                            required: 'yes',
                            flag: '0'
                        }
                    ]
                }
            ],
            lastItemId: 1
        }));
    };

    onPreviuos = () => {
        let id = this.state.lastSectionId;
        this.setState({
            lastSectionId: id - 1
        });
    };

    onNext = () => {
        let id = this.state.lastSectionId;
        this.setState({
            lastSectionId: id + 1
        });
    };
    handlePreview = async (e) => {
        e.preventDefault();
        this.setState({
            isPreview: true,
            isOpen: true
        });
    };
    handleSubmit = async (e, id) => {
        e.preventDefault();

        const outcomesId = this.state.sections.findIndex((sec) => sec.section === "Outcomes1")
        console.log("outcomesId", outcomesId)
        const outcomeSec = this.state.sections.filter((sec) => sec.section === "Outcomes1")[0]
        console.log("outcomes section", outcomeSec)
        this.state.sections.splice(outcomesId, 1);
        console.log("remove sec", this.state.sections)
        this.state.sections.push(outcomeSec)
        console.log("new sections", this.state.sections)
        this.setState({ ...this.state.sections, sections: this.state.sections });
        let data = {
            customer: this.state.Org_id,
            sections: this.state.sections
        };
        let isSubmit = false;
        this.state.sections[id].questions.map((ques, i) => {
            let qres = ques.question.includes(".")
            if (qres) {
                isSubmit = qres
            }
            console.log("dot submit ", isSubmit, qres)
        })
        const response = await saveClientConfigure(data, isSubmit);
        console.log("save client config ", response, isSubmit)
        if (isSubmit === false) {
            if (response.status === 'success') {
                toast.info(`Questions configured successfully. `, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });
            } else {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });
            }
        }
    };
    handleLastSection = () => {
        let lastId = this.state.sections.length - 1
        console.log("last section id", lastId)
        this.setState({
            lastSectionId: lastId
        })
    }
    handleClose = () => {
        this.setState({
            isOpen: false,
            isPreview: false
        });
    };
    jumpOptions = () => {
        let options = [];
        this.state.sections.filter((sec, key) => sec.related === 'true').map((q, i) => options.push({ value: q.section, label: q.section, id: i }));
        return options;
    };
    Question_jumpOptions = (id) => {
        let options = [];
        this.state.sections[id].questions.filter((sec, key) => sec.related === 'yes').map((q, i) => options.push({ value: q.question, label: q.question, id: i }));
        return options;
    };

    multihandleChange = (id, idx, idy) => (e) => {
        let sections = [...this.state.sections];
        let jumpValues = Array.isArray(e) ? e.map((arr) => arr.value) : [];
        sections[id].questions[idx].suggested_jump[idy] =
            jumpValues.length === 0
                ? []
                : {
                    answer: sections[id].questions[idx].suggested_answers[idy].value,
                    jumpto: jumpValues,
                    question_jumpto: sections[id].questions[idx].suggested_jump[idy] ? sections[id].questions[idx].suggested_jump[idy].question_jumpto : []
                };
        this.setState({
            sections
        });
    };
    Question_multihandleChange = (id, idx, idy) => (e) => {
        let sections = [...this.state.sections];
        let jumpValues = Array.isArray(e) ? e.map((arr) => arr.value) : [];
        sections[id].questions[idx].suggested_jump[idy] =
            jumpValues.length === 0
                ? []
                : {
                    answer: sections[id].questions[idx].suggested_answers[idy].value,
                    jumpto: sections[id].questions[idx].suggested_jump[idy] ? sections[id].questions[idx].suggested_jump[idy].jumpto : [],
                    question_jumpto: jumpValues
                };
        this.setState({
            sections
        });
    };
    handleSort = (idx, id, e) => {
        e.preventDefault()

        console.log(idx, id);
        let sections = [...this.state.sections];
        let ques = sections[id].questions;
        console.log('questions array', ques);
        let answers = sections[id].questions[idx].suggested_answers;
        console.log("answer array", answers)
        const quesArray = ["Referral Status", "Program", "Start Date", "Program Completion", "End Date", "Remained Out of Care"]
        quesArray.includes(this.state.sections[id].questions[idx].question)
        for (let i = 0; i < quesArray.length; i++) {
            console.log("idsssssssss", quesArray[i])
            console.log("find question ids", this.state.sections[id].questions.findIndex((names) => names.question === quesArray[i]))

        }



        function sortedData(a, b) {
            if (a.isChecked === false) {
                console.log(a)
                let Avalue = a.value.toUpperCase();
                let Bvalue = b.value.toUpperCase();
                let result = (Avalue < Bvalue) ? -1 : (Avalue > Bvalue) ? 1 : 0;
                console.log('sorted check res', result, 'avalues=' + Avalue, 'bvalues=' + Bvalue)
                return result
            }
        }
        let customArray = []
        customArray = answers.sort(sortedData)
        console.log("sorted answers", customArray)
        let checkList = [];
        checkList = customArray.filter((ans) => ans.isChecked === true)
        console.log("checked lidt", checkList)
        let uncheckList = [];
        uncheckList = customArray.filter((ans) => ans.isChecked === false).sort(customArray.value)
        console.log("unchecked lidt", uncheckList)
        let answersList = uncheckList.concat(checkList)
        console.log("new answers list", answersList)
        sections[id].questions[idx].suggested_answers = answersList
        this.alterID(id)
        this.setState({
            sections
        });
    }
   
    render() {
        toast.configure();
        let { sections, isPreview, logoPath, header_color } = this.state;
        console.log('form configure state', this.state)
        let id = this.state.lastSectionId;
        console.log("id values", id)
        const sectionLength = this.state.sections.length - 1;
        let jumpOpt = [];
        let indexQ = [];
        let correctId = [];
        let quesIndex = [];

        const quesArray = ["Referral Status", "Program", "Start Date", "Program Completion", "End Date", "Remained Out of Care"]
        this.state.sections[id].questions.map((ques,i) => {       
        if(quesArray.includes(ques.question)){ 
         quesIndex = this.state.sections[id].questions.findIndex((nameID) => { return quesArray.map((namesQ) => namesQ=== nameID.question  ) }) 
         console.log("finding question idssss", quesIndex)
         indexQ.push(quesIndex)
        }
         console.log("quesindexes in an array ",indexQ)         
        //  correctId = indexQ.filter((ans) => ans !== -1)
        //  console.log("correct Idsss", correctId  )x`
         })
         console.log("form config", indexQ)
        
       
        this.state.sections.filter((sec, key) => sec.related === 'true').map((q, i) => jumpOpt.push({ value: q.section, label: q.section, id: i }));
        if (isPreview) {
            return (
                <Modal isOpen={this.state.isOpen} ariaHideApp={false} onRequestClose={this.handleClose} style={customStyles} scrollable="true" contentLabel="Example Modal">
                    <Preview DynamicQuestions={this.state.sections} logoPath={logoPath} headerColor={header_color} />
                </Modal>
            );
        } else {
            return (
                <div className="container-fluid">
                    {this.state.sections.length > 0 ? (
                        <div style={{ border: '1px solid #007bff' }}>
                            <form onChange={this.handleChange} className="m-3">
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label font-weight-bold " htmlFor="question">
                                        Section {id + 1}:
                                    </label>
                                    <div className="col-sm-5">
                                        <input className="form-control" type="text" name="section" id="section" data-secid={id} value={sections[id].section} />
                                    </div>
                                    <div className="form-check form-check-inline col-sm-1 ml-3">
                                        <input type="checkbox" className="form-check-input" name="related" data-secid={id} checked={this.state.sections[id].related === 'true'} value="false" />
                                        <label className="form-check-label font-weight-bold">Related</label>
                                    </div>
                                    {id === 0 ? (
                                        ''
                                    ) : (
                                        <div
                                            style={{
                                                position: 'relative',
                                                top: '-5px',
                                                right: '-0px',
                                                width: '50px',
                                                height: '44px'
                                            }}
                                            className="ml-3"
                                            data-id={id}
                                            onClick={this.sectionDelete(id)}
                                        >
                                            <Link data-id={id} className="btn btn-danger" to="#">
                                                <i data-id={id} className="fa fa-trash-o fa-lg"></i>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <DragDropContext
                                    onDragEnd={async (param, props) => {
                                        const srcI = param.source.index;
                                        const desI = param.destination?.index;
                                        console.log(srcI, desI)
                                        if (desI || desI === 0) {
                                            sections[id].questions.splice(desI, 0, sections[id].questions.splice(srcI, 1)[0]);
                                            await this.saveList(sections[id].questions);
                                            this.alterID(id);
                                        }
                                    }}
                                >
                                    <Droppable droppableId="droppable-1">
                                        {(provided, _) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {sections[id].questions.map((val, idx) => {
                                                    let catId = `cat-${idx}`,
                                                        answerId = `answer-${idx}`,
                                                        descId = `description-${idx}`,
                                                        validationId1 = `validation1-${idx}`,
                                                        validationId2 = `validation2-${idx}`,
                                                        typeId = `type-${idx}`,
                                                        errorId = `error-${idx}`,
                                                        relatedId = `related-${idx}`,
                                                        requiredId = `required-${idx}`,
                                                        flagId = `flag-${idx}`,
                                                        fieldTypeId = `fieldType-${idx}`;

                                                    return (
                                                        <div className="mb-2">
                                                            <Draggable key={val.question_id} draggableId={'draggable-' + val.question_id} index={idx}>
                                                                {(provided, snapshot) => (
                                                                    <>
                                                                        {' '}
                                                                        <div
                                                                            className="list-group-item col-10  mt-1 "
                                                                            {...provided.dragHandleProps}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            style={{
                                                                                ...provided.draggableProps.style,
                                                                                boxShadow: snapshot.isDragging ? '0 0 .4rem #666' : 'none'
                                                                            }}
                                                                        >
                                                                            <div className="m-3 p-3">
                                                                                <div className="form-group row">
                                                                                    <label className="col-sm-2 col-form-label font-weight-bold " htmlFor={catId}>{`Question #${idx + 1}:`}</label>

                                                                                    <div className="col-sm-6">
                                                                                        <input
                                                                                            type="text"
                                                                                            name={catId}
                                                                                            data-id={idx}
                                                                                            data-secid={id}
                                                                                            data-name="question"
                                                                                            id={catId}
                                                                                            required
                                                                                            readOnly={this.state.readOnly === true ? (this.state[`Ques-${idx}`] ? false : true) : correctId.includes(sections[id].questions[idx].question) ? true : false }
                                                                                            value={sections[id].questions[idx].question}
                                                                                            //disabled={sections[id].questions[idx] === sections[id].questions[correctId  ]}                                                           
                                                                                            autoComplete='off'
                                                                                            className="form-control"
                                                                                 
                                                                                        />
                                                                                    </div>
                                                                                      {!this.state.readOnly || this.state[`Ques-${idx}`] ? (
                                                                                        id === sections.length - 1 ? (
                                                                                            idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4 || idx === 5 ? (
                                                                                                ''
                                                                                            ) : (
                                                                                                <div
                                                                                                    style={{
                                                                                                        position: 'relative',
                                                                                                        top: '1px',
                                                                                                        right: '-20px',
                                                                                                        width: '50px',
                                                                                                        height: '25px'
                                                                                                    }}
                                                                                                    className=""
                                                                                                    data-id={id}
                                                                                                    onClick={this.quesDelete(idx)}
                                                                                                >
                                                                                                    <Link data-id={id} className="btn btn-danger" to="#">
                                                                                                        <i data-id={id} className="fa fa-trash-o fa-lg"></i>{' '}
                                                                                                    </Link>
                                                                                                </div>
                                                                                            )
                                                                                        ) : (
                                                                                            <div
                                                                                                style={{
                                                                                                    position: 'relative',
                                                                                                    top: '1px',
                                                                                                    right: '-20px',
                                                                                                    width: '50px',
                                                                                                    height: '25px'
                                                                                                }}
                                                                                                className=""
                                                                                                data-id={id}
                                                                                                onClick={this.quesDelete(idx)}
                                                                                            >
                                                                                                <Link data-id={id} className="btn btn-danger" to="#">
                                                                                                    <i data-id={id} className="fa fa-trash-o fa-lg"></i>{' '}
                                                                                                </Link>
                                                                                            </div>
                                                                                        )
                                                                                    ) : (
                                                                                        ''
                                                                                    )}
                                                                                </div>
                                                                                <div className="form-group row" key={idx}>
                                                                                    <label className="col-sm-2 col-form-label font-weight-bold " htmlFor={descId}>
                                                                                        Description:
                                                                                    </label>
                                                                                    <div className="col-sm-6">
                                                                                        <input
                                                                                            type="text"
                                                                                            name={descId}
                                                                                            data-id={idx}
                                                                                            data-secid={id}
                                                                                            data-name="description"
                                                                                            id={descId}
                                                                                            value={sections[id].questions[idx].description}
                                                                                            className="form-control"
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                {sections[id].questions[idx].question === 'Client Code' && (
                                                                                    <fieldset className="form-group">
                                                                                        <div className="row">
                                                                                            <legend className="col-form-label col-sm-2 font-weight-bold" htmlFor={fieldTypeId}>
                                                                                                Field Type:
                                                                                            </legend>
                                                                                            <div className="col-sm-10">
                                                                                                <div className="form-check form-check-inline">
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        name={fieldTypeId}
                                                                                                        className="form-check-input"
                                                                                                        data-id={idx}
                                                                                                        data-secid={id}
                                                                                                        data-name="field_type"
                                                                                                        id={fieldTypeId}
                                                                                                        checked={sections[id].questions[idx].field_type?.toString() === '0'}
                                                                                                        value="0"
                                                                                                    />
                                                                                                    <label className="form-check-label">Auto</label>
                                                                                                </div>
                                                                                                <div className="form-check form-check-inline">
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        name={fieldTypeId}
                                                                                                        className="form-check-input"
                                                                                                        data-id={idx}
                                                                                                        data-secid={id}
                                                                                                        data-name="field_type"
                                                                                                        id={fieldTypeId}
                                                                                                        checked={sections[id].questions[idx].field_type?.toString() === '1'}
                                                                                                        value="1"
                                                                                                    />
                                                                                                    <label className="form-check-label">Manual</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </fieldset>
                                                                                )}

                                                                                {((Object.keys(sections[id].questions[idx]).includes('field_type') &&
                                                                                    sections[id].questions[idx].field_type?.toString() !== '0') ||
                                                                                    !Object.keys(sections[id].questions[idx]).includes('field_type')) && (
                                                                                        <React.Fragment>
                                                                                            <fieldset className="form-group">
                                                                                                <div className="row">
                                                                                                    <legend className="col-form-label col-sm-2 font-weight-bold" htmlFor={typeId}>
                                                                                                        Answer Type:
                                                                                                    </legend>
                                                                                                    <div className="col-sm-8">
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'SELECT'}
                                                                                                                // disabled={this.state.answer_type !== "SELECT" ? true : false}
                                                                                                                value="SELECT"
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Drop Down</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="TEXT"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'TEXT'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Text</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="NUMBER"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'NUMBER'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Number</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="CHECKBOX"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'CHECKBOX'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Checkbox</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="RADIO"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'RADIO'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Radio</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="FILE"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'FILE'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Upload File</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                className="form-check-input"
                                                                                                                name={typeId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="answer_type"
                                                                                                                id={typeId}
                                                                                                                type="radio"
                                                                                                                value="DATE"
                                                                                                                checked={sections[id].questions[idx].answer_type === 'DATE'}
                                                                                                                required
                                                                                                            />
                                                                                                            <label className="form-check-label">Date</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </fieldset>

                                                                                            {this.state.sections[id].questions[idx].answer_type === '' ||
                                                                                                this.state.sections[id].questions[idx].answer_type === 'TEXT' ||
                                                                                                this.state.sections[id].questions[idx].answer_type === 'NUMBER' ||
                                                                                                this.state.sections[id].questions[idx].answer_type === 'RELATED' ||
                                                                                                this.state.sections[id].questions[idx].answer_type === 'DATE' ||
                                                                                                this.state.sections[id].questions[idx].answer_type === 'FILE'
                                                                                                ? ''
                                                                                                :
                                                                                                <>
                                                                                                    <button className='btn btn-info' onClick={(e) => { this.handleSort(idx, id, e) }} >Sort Icon</button>
                                                                                                    < DragDropContext
                                                                                                        onDragEnd={async (param, props) => {
                                                                                                            console.log(param, props)
                                                                                                            const srcIndex = param.source.index;
                                                                                                            const desIndex = param.destination?.index;
                                                                                                            console.log(srcIndex, desIndex)
                                                                                                            if (desIndex || desIndex === 0) {
                                                                                                                (sections[id].questions[idx].suggested_answers.splice(desIndex, 0, sections[id].questions[idx].suggested_answers.splice(srcIndex, 1)[0]));
                                                                                                                await this.saveList(sections[id].questions);
                                                                                                                this.alterID(id);
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        <Droppable droppableId='droppable-2'>
                                                                                                            {(provided) => (
                                                                                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                                                                    {
                                                                                                                        this.state.sections[id].questions
                                                                                                                            .filter((p) => p.question_id === this.state.sections[id].questions[idx].question_id)
                                                                                                                            .map((q, i) =>
                                                                                                                                q.suggested_answers.map((question, idy) => (
                                                                                                                                    <Draggable key={idy + 1} draggableId={'draggable-' + idy + 1} index={idy}>
                                                                                                                                        {(provided) => (
                                                                                                                                            <div
                                                                                                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                                                                                <div className="form-group row">
                                                                                                                                                    <label className="col-sm-1 col-form-label font-weight-bold">Answer {idy + 1}:</label>
                                                                                                                                                    <div className="col-sm-3">
                                                                                                                                                        <input
                                                                                                                                                            type="text"
                                                                                                                                                            name={answerId}
                                                                                                                                                            data-id={idx}
                                                                                                                                                            data-secid={id}
                                                                                                                                                            data-name="suggested_answers"
                                                                                                                                                            id={answerId}
                                                                                                                                                            data-idy={idy}
                                                                                                                                                            value={question.value ? question.value : ''}
                                                                                                                                                            className="form-control"
                                                                                                                                                            required
                                                                                                                                                        />

                                                                                                                                                        {idy !== 0 && (
                                                                                                                                                            <div
                                                                                                                                                                style={{
                                                                                                                                                                    position: 'absolute',
                                                                                                                                                                    top: '1px',
                                                                                                                                                                    right: '-0px',
                                                                                                                                                                    width: '25px',
                                                                                                                                                                    height: '25px',
                                                                                                                                                                    fontSize: '24px',
                                                                                                                                                                    color: 'red'
                                                                                                                                                                }}
                                                                                                                                                                className="font-text-bold text-center "
                                                                                                                                                                data-secid={id}
                                                                                                                                                                data-id={idy}
                                                                                                                                                                onClick={this.handleDelete(idx, idy)}
                                                                                                                                                            >
                                                                                                                                                                <i className="fa fa-remove" data-secid={id} data-id={idy}></i>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                        {idy === this.state.sections[id].questions[idx].suggested_answers.length - 1 && (
                                                                                                                                                            <div
                                                                                                                                                                style={{
                                                                                                                                                                    position: 'absolute',
                                                                                                                                                                    top: '1px',
                                                                                                                                                                    right: '-25px',
                                                                                                                                                                    width: '25px',
                                                                                                                                                                    height: '25px',
                                                                                                                                                                    fontSize: '24px'
                                                                                                                                                                }}
                                                                                                                                                                className="font-text-bold text-center "
                                                                                                                                                                data-secid={id}
                                                                                                                                                                data-id={idy}
                                                                                                                                                                onClick={this.addAnswer(idx)}
                                                                                                                                                            >
                                                                                                                                                                <i
                                                                                                                                                                    className="fa fa-plus"
                                                                                                                                                                    style={{
                                                                                                                                                                        fontSize: '28px'
                                                                                                                                                                    }}
                                                                                                                                                                    data-secid={id}
                                                                                                                                                                    data-id={idy}
                                                                                                                                                                ></i>
                                                                                                                                                            </div>
                                                                                                                                                        )}
                                                                                                                                                    </div>
                                                                                                                                                    {this.state.sections[id].questions[idx].answer_type === 'CHECKBOX' ? (
                                                                                                                                                        ''
                                                                                                                                                    ) : (
                                                                                                                                                        <>
                                                                                                                                                            <label className="col-sm-1 col-form-label font-weight-bold ml-3">Jump to:</label>
                                                                                                                                                            <div className="col-sm-3">
                                                                                                                                                                <Select
                                                                                                                                                                    key={id}
                                                                                                                                                                    value={jumpOpt.filter(
                                                                                                                                                                        (value) =>
                                                                                                                                                                            this.state.sections[id].questions[idx].suggested_jump[idy] &&
                                                                                                                                                                            Array.isArray(
                                                                                                                                                                                this.state.sections[id].questions[idx].suggested_jump[idy]
                                                                                                                                                                                    .jumpto
                                                                                                                                                                            ) &&
                                                                                                                                                                            this.state.sections[id].questions[idx].suggested_jump[
                                                                                                                                                                                idy
                                                                                                                                                                            ].jumpto.includes(value.value)
                                                                                                                                                                    )}
                                                                                                                                                                    isClearable
                                                                                                                                                                    styles={colourStyles}
                                                                                                                                                                    isMulti
                                                                                                                                                                    name="suggested_jump"
                                                                                                                                                                    components={animatedComponents}
                                                                                                                                                                    options={jumpOpt}
                                                                                                                                                                    className="basic-multi-select"
                                                                                                                                                                    placeholder="Select Sections jump"
                                                                                                                                                                    onChange={this.multihandleChange(id, idx, idy)}
                                                                                                                                                                />

                                                                                                                                                                {/* <select name="jumpto"
                                                                                                                                                        className="form-control" id="exampleFormControlSelect1"
                                                                                                                                                        multiple
                                                                                                                                                        data-id={idx}
                                                                                                                                                        data-secid={id}
                                                                                                                                                        data-name="suggested_jump"
                                                                                                                                                        id={answerId}
                                                                                                                                                        data-idy={idy} required>
                                                                                                                                                        <option value="" >Select</option>
                                                                                                                                                        {this.state.sections.filter((sec, key) => sec.related === "true").map(
                                                                                                                                                            (q, i) =>
                                                                                                                                                                <option key={i} value={q.section}
                                                                                                                                                                    selected={q.section === `${this.state.sections[id].questions[idx].suggested_jump[idy] && this.state.sections[id].questions[idx].suggested_jump[idy].jumpto}`}
                                                                                                                                                                >
                                                                                                                                                                    {q.section}
                                                                                                                                                                </option>
                                                                                                                                                        )}
                                                                                                                                                    </select> */}
                                                                                                                                                            </div>

                                                                                                                                                            <div className="col-sm-3">
                                                                                                                                                                <Select
                                                                                                                                                                    value={this.Question_jumpOptions(id).filter(
                                                                                                                                                                        (value) =>
                                                                                                                                                                            this.state.sections[id].questions[idx].suggested_jump[idy] &&
                                                                                                                                                                            Array.isArray(
                                                                                                                                                                                this.state.sections[id].questions[idx].suggested_jump[idy]
                                                                                                                                                                                    .question_jumpto
                                                                                                                                                                            ) &&
                                                                                                                                                                            this.state.sections[id].questions[idx].suggested_jump[
                                                                                                                                                                                idy
                                                                                                                                                                            ].question_jumpto.includes(value.value)
                                                                                                                                                                    )}
                                                                                                                                                                    isClearable
                                                                                                                                                                    styles={colourStyles}
                                                                                                                                                                    isMulti
                                                                                                                                                                    name="ques_suggested_jump"
                                                                                                                                                                    options={this.Question_jumpOptions(id)}
                                                                                                                                                                    className="basic-multi-select"
                                                                                                                                                                    placeholder="Select jump within Section"
                                                                                                                                                                    onChange={this.Question_multihandleChange(id, idx, idy)}
                                                                                                                                                                />
                                                                                                                                                            </div>
                                                                                                                                                        </>
                                                                                                                                                    )}
                                                                                                                                                    <button className='btn btn-warning' ><GrDrag /></button>
                                                                                                                                                    <div className="form-check  " >
                                                                                                                                                        <input
                                                                                                                                                            className="form-check-input"
                                                                                                                                                            type="checkbox"
                                                                                                                                                            data-name="checkbox"
                                                                                                                                                            data-secid={id}
                                                                                                                                                            data-id={idx}
                                                                                                                                                            data-idy={idy}
                                                                                                                                                            id={answerId}
                                                                                                                                                            value={this.state.sections[id].questions[idx].suggested_answers[idy].isChecked}
                                                                                                                                                            checked={this.state.sections[id].questions[idx].suggested_answers[idy].isChecked}
                                                                                                                                                            style={{ marginLeft: "5px", marginTop: "25px" }}
                                                                                                                                                        />
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                                    </Draggable>
                                                                                                                                ))
                                                                                                                            )
                                                                                                                    }
                                                                                                                    {provided.placeholder}
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </Droppable>
                                                                                                    </DragDropContext>
                                                                                                </>
                                                                                            }

                                                                                            {this.state.sections[id].questions[idx].answer_type === 'TEXT' ? (
                                                                                                <React.Fragment>
                                                                                                    <div className="form-group row" key={idx}>
                                                                                                        <label className="col-sm-2 col-form-label font-weight-bold " htmlFor={validationId1}>
                                                                                                            Validation:
                                                                                                        </label>
                                                                                                        <div className="col-sm-2">
                                                                                                            <select
                                                                                                                name={validationId1}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="validation1"
                                                                                                                id={validationId1}
                                                                                                                className="form-control"
                                                                                                                // id="exampleFormControlSelect1"
                                                                                                                onChange={this.handleChange}
                                                                                                                required
                                                                                                            >
                                                                                                                <option value="">Select</option>
                                                                                                                <option value="Contains" selected={sections[id].questions[idx].validation1 === 'Contains'}>
                                                                                                                    Contains
                                                                                                                </option>
                                                                                                                <option
                                                                                                                    value="Not Contains"
                                                                                                                    selected={sections[id].questions[idx].validation2 === 'Not Contains'}
                                                                                                                >
                                                                                                                    Does not contain
                                                                                                                </option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        <div className="col-sm-2">
                                                                                                            <select
                                                                                                                name={validationId2}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="validation2"
                                                                                                                id={validationId1}
                                                                                                                className="form-control"
                                                                                                                // id="exampleFormControlSelect1"
                                                                                                                onChange={this.handleChange}
                                                                                                                required
                                                                                                            >
                                                                                                                <option value="">Select</option>
                                                                                                                <option value="Numbers" selected={sections[id].questions[idx].validation2 === 'Numbers'}>
                                                                                                                    Numbers
                                                                                                                </option>
                                                                                                                <option
                                                                                                                    value="Special characters"
                                                                                                                    selected={sections[id].questions[idx].validation2 === 'Special characters'}
                                                                                                                >
                                                                                                                    Special characters
                                                                                                                </option>
                                                                                                                <option value="Both" selected={sections[id].questions[idx].validation2 === 'Both'}>
                                                                                                                    Both
                                                                                                                </option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        <div className="col-sm-2">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                name={errorId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="error_msg"
                                                                                                                id={errorId}
                                                                                                                placeholder="Error message"
                                                                                                                value={sections[id].questions[idx].error_msg}
                                                                                                                className="form-control"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </React.Fragment>
                                                                                            ) : (
                                                                                                ''
                                                                                            )}
                                                                                            {this.state.sections[id].questions[idx].answer_type === 'NUMBER' ? (
                                                                                                <React.Fragment>
                                                                                                    <div className="form-group row" key={idx}>
                                                                                                        <label className="col-sm-2 col-form-label font-weight-bold " htmlFor={validationId1}>
                                                                                                            Validation:
                                                                                                        </label>
                                                                                                        <label className="col-sm-1 col-form-label font-weight-bold ">Between</label>
                                                                                                        <div className="col-sm-1">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                name={validationId1}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="validation1"
                                                                                                                id={validationId1}
                                                                                                                placeholder="Number"
                                                                                                                value={sections[id].questions[idx].validation1}
                                                                                                                className="form-control"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <span className="text-center"> and</span>

                                                                                                        <div className="col-sm-1">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                name={validationId2}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="validation2"
                                                                                                                id={validationId2}
                                                                                                                placeholder="Number"
                                                                                                                value={sections[id].questions[idx].validation2}
                                                                                                                className="form-control"
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="col-sm-2">
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                name={errorId}
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="error_msg"
                                                                                                                id={errorId}
                                                                                                                placeholder="Error message"
                                                                                                                value={sections[id].questions[idx].error_msg}
                                                                                                                className="form-control"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </React.Fragment>
                                                                                            ) : (
                                                                                                ''
                                                                                            )}
                                                                                            <fieldset className="form-group">
                                                                                                <div className="row">
                                                                                                    <legend className="col-form-label col-sm-2 font-weight-bold" htmlFor={relatedId}>
                                                                                                        Related:
                                                                                                    </legend>
                                                                                                    <div className="col-sm-10">
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={relatedId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="related"
                                                                                                                id={relatedId}
                                                                                                                checked={sections[id].questions[idx].related == 'yes'}
                                                                                                                value="yes"
                                                                                                            />
                                                                                                            <label className="form-check-label">Yes</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={relatedId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="related"
                                                                                                                id={relatedId}
                                                                                                                checked={sections[id].questions[idx].related == 'no'}
                                                                                                                value="no"
                                                                                                            />
                                                                                                            <label className="form-check-label">No</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </fieldset>
                                                                                            <fieldset className="form-group">
                                                                                                <div className="row">
                                                                                                    <legend className="col-form-label col-sm-2 font-weight-bold" htmlFor={requiredId}>
                                                                                                        Required:
                                                                                                    </legend>
                                                                                                    <div className="col-sm-10">
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={requiredId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="required"
                                                                                                                id={requiredId}
                                                                                                                checked={sections[id].questions[idx].required == 'yes'}
                                                                                                                value="yes"
                                                                                                            />
                                                                                                            <label className="form-check-label">Yes</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={requiredId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="required"
                                                                                                                id={requiredId}
                                                                                                                checked={sections[id].questions[idx].required == 'no'}
                                                                                                                value="no"
                                                                                                            />
                                                                                                            <label className="form-check-label">No</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </fieldset>
                                                                                            <fieldset className="form-group">
                                                                                                <div className="row">
                                                                                                    <legend className="col-form-label col-sm-2 font-weight-bold" htmlFor={requiredId}>
                                                                                                        Flag:
                                                                                                    </legend>
                                                                                                    <div className="col-sm-10">
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={flagId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="flag"
                                                                                                                id={flagId}
                                                                                                                checked={sections[id].questions[idx].flag == '0'}
                                                                                                                value="0"
                                                                                                            />
                                                                                                            <label className="form-check-label">Add</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={flagId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="flag"
                                                                                                                id={flagId}
                                                                                                                checked={sections[id].questions[idx].flag == '1'}
                                                                                                                value="1"
                                                                                                            />
                                                                                                            <label className="form-check-label">Edit</label>
                                                                                                        </div>
                                                                                                        <div className="form-check form-check-inline">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                name={flagId}
                                                                                                                className="form-check-input"
                                                                                                                data-id={idx}
                                                                                                                data-secid={id}
                                                                                                                data-name="flag"
                                                                                                                id={flagId}
                                                                                                                checked={sections[id].questions[idx].flag == '2'}
                                                                                                                value="2"
                                                                                                            />
                                                                                                            <label className="form-check-label">Custom</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </fieldset>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </Draggable>
                                                        </div>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <div className=" col d-flex justify-content-end">
                                    <button className="btn btn-primary" data-id={id} data-idx={this.state.sections[id].questions.length - 1} onClick={this.addQuestion}>
                                        {this.state.sections[id].questions.length === 0 ? 'Add Question' : 'Add Next Question'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        ''
                    )
                    }
                    <div className="row mt-3 text-center">
                        <div className="col col-sm-2  mb-1">
                            <button className="btn btn-primary" disabled={id === 0 ? true : sectionLength >= 1 ? false : true} onClick={this.onPreviuos}>
                                Previous Section
                            </button>
                        </div>
                        <div className="col col-sm-2 mb-1">
                            <button className="btn btn-primary" disabled={sectionLength === id ? true : false} onClick={this.onNext}>
                                Next Section
                            </button>
                        </div>
                        <div className="col col-sm-2">
                            <button className="btn btn-primary" onClick={this.addSection}>
                                Add Section
                            </button>
                        </div>
                        <div className="col col-sm-2">
                            <button onClick={this.handlePreview} className="btn btn-primary" disabled={sectionLength > -1 ? false : true}>
                                Preview
                            </button>
                        </div>
                        <div className="col col-sm-2">
                            <button onClick={(e) => this.handleSubmit(e, id)} className="btn btn-primary" disabled={sectionLength > -1 ? false : true}>
                                Submit
                            </button>
                        </div>
                        <div className="col col-sm-2">
                            <button className="btn btn-primary" onClick={this.handleLastSection}  >
                                Last Section
                            </button>
                        </div>
                    </div>
                </div >
            );
        }
    }
}
const mapStateToProps = (state) => {
    return {
        organizationsList: state.getorganization.organizationsList
    };
};
export default connect(mapStateToProps)(FormConfigure);
