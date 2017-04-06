import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import PersonalInfo from './personal.js'
import WorkInfo from './work.js'
import FinanceInfo from './finance.js'
import DocumentsInfo from './docs.js'

const MyProfile = (props) => {
  const { personal, finance, work, docs } = props.data
  return (
    <Tabs animation={false} id="Tabs">
      <Tab eventKey={1} title="Personal">
        <div style={{height: '500px','overflowY':'auto'}}>
          <br/><PersonalInfo data={personal}/>
        </div>
      </Tab>
      <Tab eventKey={2} title="Work">
        <br/><WorkInfo data={work}/>
      </Tab>
      <Tab eventKey={3} title="Finance">
        <br/><FinanceInfo data={finance}/>
      </Tab>
      <Tab eventKey={4} title="Documents">
        <br/><DocumentsInfo data={docs}/>
      </Tab>
    </Tabs>
  )
}

export default MyProfile
