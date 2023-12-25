import React from 'react'
// import Styles from './styles'
import Styles from './styles.css'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const ReduxForm = () => {
    return(
        // <Styles>
        <div className='card'>
            <h1>React Final Form</h1>
            <Form
                onSubmit={onSubmit}
                initialValues={{ employed: false }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <Field className='firstName' name="firstName" component="input" type="text" placeholder="First Name"/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Field className="lastName" name="lastName" component="input" type="text" placeholder="Last Name"/>
                    </div>
                    <div>
                        <label>Employed</label>
                        <Field name="employed" component="input" type="checkbox" />
                    </div>
                    <div className='framework'>
                        <label>Framework Technology</label>
                        <div>
                        <label>
                            <Field name="framework" component="input" type="checkbox" value="node"/>{' '}
                            Node JS
                        </label>
                        <label>
                            <Field name="framework" component="input" type="checkbox" value="react"/>{' '}
                            React JS
                        </label>
                        <label>
                            <Field name="framework" component="input" type="checkbox" value="express"/>{' '}
                            Express JS
                        </label>
                        <label>
                            <Field name="framework" component="input" type="checkbox" value="vue"/>{' '}
                            Vue JS
                        </label>
                        </div>
                    </div>
                    <div>
                        <label>Position</label>
                        <div>
                        <label>
                            <Field name="position" component="input" type="radio" value="frontend"/>{' '}
                            Front-End
                        </label>
                        <label>
                            <Field name="position" component="input" type="radio" value="backend" />{' '}
                            Back-End
                        </label>
                        <label>
                            <Field name="position" component="input" type="radio" value="fullstack"/>{' '}
                            Full-Stack
                        </label>
                        </div>
                    </div>
                    <div>
                        <label>Notes</label>
                        <Field className="notes" name="notes" component="textarea" placeholder="Notes" />
                    </div>
                    <div className="buttons">
                        <button className="submit-button" type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                        <button className='reset-button' type="button" onClick={form.reset} disabled={submitting || pristine}>
                            Reset
                        </button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}/>
        </div>
        // </Styles>
    )
}

export default ReduxForm
