import express from 'express'
import cors from 'cors'
import https from 'https'
import bodyParser from 'body-parser'

const key = require('./key.pem')
const cert = require('./cert.pem')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const api = express.Router()

/*
https.createServer({ key, cert }, app).listen(8082, () => {
  console.log('server started listening on 8082')
})
*/

app.use('/api/', api)

app.listen(8082,()=> {
  console.log('server started listening on 8082')
})

app.get('/', (req, res) => {
  res.send('Api server running')
})

let id = 3
const attendance = {
  1: {
    application_dt: new Date(2015, 2, 5),
    from_dt: new Date(2015, 2, 10),
    to_dt: new Date(2015, 2, 12),
    leaveType: 'PL',
    reason: 'Went out on a vacation',
    description: 'this is a dummy description',
    sanctioned: true,
    sanctionedBy: 'Alice',
    sanctioned_from_dt: new Date(2015, 2, 10),
    sanctioned_to_dt: new Date(2015, 2, 12),
  },
  2: {
    application_dt: new Date(2015, 3, 5),
    from_dt: new Date(2015, 3, 10),
    to_dt: new Date(2015, 3, 12),
    leaveType: 'PL',
    reason: 'going out with friend',
    description: 'this is a dummy description',
    sanctioned: false,
    sanctionedBy: 'Alice',
    sanctioned_from_dt: new Date(2015, 3, 10),
    sanctioned_to_dt: new Date(2015, 3, 12),
  },
  3: {
    application_dt: new Date(2015, 4, 15),
    from_dt: new Date(2015, 4, 20),
    to_dt: new Date(2015, 4, 28),
    leaveType: 'CL',
    reason: 'Going for a wedding',
    description: 'this is a dummy description',
    sanctioned: true,
    sanctionedBy: 'Alice',
    sanctioned_from_dt: new Date(2015, 4, 23),
    sanctioned_to_dt: new Date(2015, 4, 28),
  }
}

api.get('/attendance', (req, res) => {
  res.send({
    attendance
  })
})

api.post('/attendance', (req, res) => {
  attendance[++id] = req.body
  res.send('aok')
})

api.put('/attendance/:id', (req, res) => {
  if (attendance[req.params.id]) {
    attendance[req.params.id] = req.body
    res.send('aok')
  } else {
    res.status(404).send('Bad Request')
  }
})

api.get('/employee', (req, res) => {
  res.send({
    personal: {
      name: 'Kim H. Cedillo',
      shortName: 'Kim',
      gender: 'Female',
      birthDate: new Date(1986, 6, 23),
      bloodGroup: 'B-',
      maritialStatus: 'UnMarried',
      email: 'hhkim7@yopmail.com',
      contact: '+11(939)-1337932',
      emergencyContact: [
        {
          relation: 'Father',
          name: 'Cyril P. Hollis',
          contactNo: '+11(848)-1886133',
        },
        {
          relation: 'Mother',
          name: 'Anouk N. Swider',
          contactNo: '+11(232)-4552919',
        }
      ],
      address: [
        {
          type: 'Permanent',
          street1: '665 Benson Circle',
          street2: '618 S Drive',
          area: 'Satellite',
          city: 'Saxony-Anhalt',
          state: 'Yorkshire del Sur',
          country: 'England',
          pincode: '98677',
        },
        {
          type: 'Current',
          street1: '665 Benson Circle',
          street2: '618 S Drive',
          area: 'Satellite',
          city: 'Saxony-Anhalt',
          state: 'Yorkshire del Sur',
          country: 'England',
          pincode: '98677',
        }
      ]
    },
    finance: {
      bankName: 'ICICI',
      bankAccountNo: '4OEB6G6J113A101881',
      homeBranchName: 'Main',
      ifscCode: 'ICICI000034',
      pfNo: 'AHJ/DL3/354/3435535',
      esiNo: '23535355646SDSFD4',
    },
    work: {
      designation: 'Junior DBA',
      department: 'DataBase Admin',
      employeeId: 'ACU491',
      email: 'hhkim7@company.com',
      dateOfJoin: new Date(2008, 1, 15),
      contactNo: '+11(939)-337932',
    },
    docs: {
      panNo: 'AHJDF34545SDDS',
      adharCardNo: '1333 4565 6786',
      passportNo: 'PDSs32344',
    }
  })
})
