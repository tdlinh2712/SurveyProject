//survey form shows a form for user to enter input
import _ from 'lodash';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';


const FIELDS = [
    {label:"Survey Title",name:"title"},
    {label:"Subject Line",name:"subject"},
    {label:"Email Body",name:"body"},
    {label:"Recipient List",name:"emails"},
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({name, label}) => {
            return <Field key={name} component={SurveyField} type="text" name={name} label={label} />
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>

                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>

                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right ">done</i>
                    </button>
                </form>
                
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    
    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({name, label}) => {
        if(!values[name]) {
            errors[name] = `You must provide a ${label}`;
        }
    });

    
    //if errors is empty => redux form knows that there's no errors
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);