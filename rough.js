require('isomorphic-fetch')

fetch('https://html.spec.whatwg.org/').then(res => {
  let reader = res.body.getReader();
  let bytesRecieved = 0;

  reader.read().then(function processReult(result) {
    if(result.done) {
      console.log('Done fetching the data');
      return;
    }

    bytesRecieved += result.value.length;
    console.log(`Recieved ${bytesRecieved} bytes of data so far`)
    return reader.read().then(processResult);
  })
})
