import React from 'react'
import flexGrid from 'components/Util/flexGrid.css'
import classNames from 'classnames'

let PersonalInfo = ({data}) => {
  let dob = new Date(data.birthDate)
  let dtStr = `${dob.getDate()}/${`${dob.getMonth()+1}`.padStart(2,'0')}/${dob.getUTCFullYear()}`

  return (
    <div>
      <section className={flexGrid.row} >
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>Name</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{data.fullName}</label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>NickName</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{data.nickName}</label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>Gender</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{data.gender}</label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>BirthDate</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{dtStr}</label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>BloodGroup</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{data.bloodGroup}</label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label><b>Maritial Status</b></label>
        </div>
        <div className={classNames(flexGrid['col'],flexGrid['col-span-6'])}>
          <label>{data.maritialStatus}</label>
        </div>
      </section>

    </div>
  )
}

export default PersonalInfo

