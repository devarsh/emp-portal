import React, { PropTypes as P } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import PersonalInfo from './personal'
import WorkInfo from './work'
import FinanceInfo from './finance'
import DocumentsInfo from './docs'

const MyProfile = (props) => {
  const { personal, finance, work, docs } = props.data
  return (
    <Tabs animation={false} id="Tabs">
      <Tab eventKey={1} title="Personal">
        <div style={{ height: '500px', overflowY: 'auto' }}>
          <br /><PersonalInfo data={personal} />
        </div>
      </Tab>
      <Tab eventKey={2} title="Work">
        <br /><WorkInfo data={work} />
      </Tab>
      <Tab eventKey={3} title="Finance">
        <br /><FinanceInfo data={finance} />
      </Tab>
      <Tab eventKey={4} title="Documents">
        <br /><DocumentsInfo data={docs} />
      </Tab>
    </Tabs>
  )
}
MyProfile.propTypes = {
  data: P.shape({
    personal: P.object.isRequired,
    finance: P.object.isRequired,
    work: P.object.isRequired,
    docs: P.object.isRequired
  }).isRequired
}

export default MyProfile
