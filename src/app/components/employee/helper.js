import React from 'react'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'

export const RenderTextField = ({ type, label, input : { value, onChange, onBlur, onFocus }, meta: { touched, error }, ...custom })  => (
  <Input
    type={type}
    label={label}
    value={value}
    error={ touched && error ? error : undefined }
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    {...custom}
  />
)

export const RenderDropDown = ({ source, label, input : { value, onChange, onBlur, onFocus }, meta: { touched, error }, ...custom }) => (
  <Dropdown
    auto
    label={label}
    source={source}
    value={value}
    error={ touched && error ? error : undefined }
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    {...custom}
  />
)

export const RenderDatePicker = ({ label, input : { value, onChange, onBlur, onFocus }, meta: { touched, error }, ...custom }) => (
  <DatePicker
    sundayFirstDayOfWeek
    label={label}
    value={value}
    error={ touched && error ? error : undefined }
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    {...custom}
  />
)
