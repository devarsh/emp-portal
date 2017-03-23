import React, { Component } from 'react'
import flexGrid from 'components/Util/flexGrid.css'
import { Field } from 'redux-form'
import { RenderTextField } from './helper.js'
import classNames from 'classnames'

export const Address = ({ title }) => (
  <div className={classNames(flexGrid['row'],flexGrid['nested'])}>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-12'])}>
      <label>{title}</label>
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-12'])}>
      <Field name="street1" type="text" label="Street 1" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-12'])}>
      <Field name="street2" type="text" label="Street 2" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-4'])}>
      <Field name="area" type="text" label="Area" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-4'])}>
      <Field name="city" type="text" label="City" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-4'])}>
      <Field name="pincode" type="number" label="Pincode" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
      <Field name="state" type="text" label="State" component={RenderTextField} />
    </div>
    <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
      <Field name="country" type="text" label="Country" component={RenderTextField} />
    </div>
  </div>
)
