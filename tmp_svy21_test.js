const svy21 = require('svy21');

const x = 30314.7936;
const y = 31490.4942;

// check documentation by printing the object
console.log('svy21 package', svy21);
try {
    const latlng = svy21.svy21ToWgs84({easting: x, northing: y});
    console.log('svy21ToWgs84 result', latlng);
} catch (e) {
    console.error('error calling', e);
}
