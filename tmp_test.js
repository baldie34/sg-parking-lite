// inline conversion from lib/svy21.ts (updated)
function svy21ToLatLng(N, E) {
    const a = 6378137;
    const f = 1 / 298.257223563;
    const oLat = 1.366666;
    const oLon = 103.833333;
    const k = 1;
    const falseE = 28001.642;
    const falseN = 38744.572;

    const b = a * (1 - f);
    const e2 = (2 * f) - (f * f);
    const e4 = e2 * e2;
    const e6 = e4 * e2;

    const Nprime = N - falseN;
    const Mprime = Nprime / k;
    const mu = Mprime / (a * (1 - e2/4 - 3*e4/64 - 5*e6/256));

    const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

    let phi1 = mu
      + (3*e1/2 - 27*e1**3/32) * Math.sin(2*mu)
      + (21*e1**2/16 - 55*e1**4/32) * Math.sin(4*mu)
      + (151*e1**3/96) * Math.sin(6*mu);

    const C1 = e2 * Math.cos(phi1)**2 / (1 - e2);
    const T1 = Math.tan(phi1)**2;
    const R1 = a*(1-e2)/Math.pow(1-e2*Math.sin(phi1)**2, 1.5);
    const D = (E - falseE) / (a * k);

    const lat = phi1 - (Math.tan(phi1)/R1) * (
      D**2/2 -
      (5+3*T1+10*C1-4*C1**2-9*e2)*D**4/24
    );

    const lon = (D -
      (1+2*T1+C1)*D**3/6
    ) / Math.cos(phi1);

    return {
      lat: oLat + lat * 180 / Math.PI,
      lng: oLon + lon * 180 / Math.PI,
    };
}

const x = 30314.7936, y = 31490.4942;
console.log('convert(x,y)=', svy21ToLatLng(x,y));
console.log('convert(y,x)=', svy21ToLatLng(y,x));
