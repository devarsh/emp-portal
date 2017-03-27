import React, { Component } from 'react'
import flexGrid from 'components/Util/flexGrid.css'
import { Field, FormSection } from 'redux-form'
import { RenderTextField, RenderDropDown, RenderDatePicker } from './helper.js'
import { Address } from './address.js'
import classNames from 'classnames'

let PersonalInfo = () => {

  const Genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female'},
    { value: 'TransGender', label: 'TransGender' },
  ]
  const BloodGroups = [
    { value: 'O+', label: 'O+' },
    { value: 'O–', label: 'O–' },
    { value: 'A+', label: 'A+' },
    { value: 'A–', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B–', label: 'B–' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
  ]
  const MaratialStatus = [
    { value: 'Married', label: 'Married' },
    { value: 'UnMarried', label: 'UnMarried' }
  ]

  return (
    <div>
      <section className={flexGrid.row} >
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <Field name="fullName" type="text" label="Full Name" component={RenderTextField} />
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <Field name="nickName" type="text" label="NickName" component={RenderTextField} />
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-3'])}>
          <Field name="birthDate" type="text" label="BirthDate" component={RenderDatePicker} parse={(value,name) => new Date(value).toDateString()} />
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-3'])}>
          <Field name="gender" type="text" label="Gender" source={Genders} component={RenderDropDown} />
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-3'])}>
          <Field name="bloodGroup" type="text" label="Blood Group" source={BloodGroups} component={RenderDropDown} />
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-3'])}>
          <Field name="maritialStatus" type="text" label="Maritial Status" source={MaratialStatus} component={RenderDropDown} />
        </div>
      </section>
      <section className={flexGrid.row} >
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <FormSection name="address.permanent">
            <Address title="Permanent Address"/>
          </FormSection>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <FormSection name="address.current">
            <Address title="Current Address"/>
          </FormSection>
        </div>
      </section>
    </div>
  )
}

export default PersonalInfo

