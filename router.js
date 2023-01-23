const axios = require('axios')
const converter = require('json-2-csv')
const fs = require('fs');

const _convertJSON2CSV = (list) => {
  converter.json2csv(list, (err, csv) => {
    if (err) {
      throw err
    }

    if (!fs.existsSync('./tmp')){
      fs.mkdirSync('./tmp');
    }
    fs.writeFileSync('./tmp/file.csv', csv)
  })

  return list;
}

exports.apiHandler = async (request, h) => {
  response = await axios.get("https://gbfs.divvybikes.com/gbfs/en/station_information.json")

  stations = ((response.data || {}).data || {}).stations || [];

  stations = stations
    .map(({ rental_methods, rental_uris, external_id, station_id, legacy_id, ...rest }) => ({ externalId: external_id, stationId: station_id, legacyId: legacy_id, ...rest }))
    .filter(v => v.capacity < 12)

  return _convertJSON2CSV(stations)
}