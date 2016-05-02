import moment from 'moment/min/moment-with-locales';

moment.locale('fr');

export const datetime = (startAt, endAt) => {
  const start = moment(startAt);
  const end = moment(endAt);

  // ALL DAY EVENTS
  if (start.format('HH:mm:ss') === '00:00:00' || end.format('HH:mm:ss') === '00:00:00') {
    if (start.isSame(endAt, 'day')) {
      // SAME DAY: lundi 1 janvier 2016
      return start.format('dddd D MMMM YYYY');
    }
    if (start.isSame(endAt, 'month')) {
      // SAME MONTH: du lundi 1 au mardi 2 janvier 2016
      return `du ${start.format('dddd D')} au ${end.format('dddd D MMMM YYYY')}`;
    }
    if (start.isSame(endAt, 'year')) {
      // SAME YEAR: du lundi 1 janvier au mardi 2 mars 2016
      return `du ${start.format('dddd D MMMM')} au ${end.format('dddd D MMMM YYYY')}`;
    }
    // DIFFERENT YEAR: du lundi 1 janvier 2016 au lundi 1 janvier 2017
    return `du ${start.format('dddd D MMMM YYYY')} au ${end.format('dddd D MMMM YYYY')}`;
  }

  // SAME DAY EVENTS
  if (start.isSame(endAt, 'day')) {
    if (start.format('mm') == '00' && end.format('mm') == '00') {
      // lundi 1 janvier 2016 de 9h à 18h
      return `${start.format('dddd D MMMM YYYY [de] H[h]')} à ${end.format('H[h]')}`;
    }
    if (start.format('mm') == '00') {
      // lundi 1 janvier 2016 de 9h à 18h30
      return `${start.format('dddd D MMMM YYYY [de] H[h]')} à ${end.format('H[h]mm')}`;
    }
    if (end.format('mm') == '00') {
      // lundi 1 janvier 2016 de 9h30 à 18h
      return `${start.format('dddd D MMMM YYYY [de] H[h]mm')} à ${end.format('H[h]')}`;
    }
    // lundi 1 janvier 2016 de 9h30 à 18h30
    return `${start.format('dddd D MMMM YYYY [de] H[h]mm')} à ${end.format('H[h]mm')}`;
  }

  if (start.format('mm') == '00' && end.format('mm') == '00') {
    // du lundi 1 janvier 2016 à 9h au lundi 1 janvier 2017 à 18h
    return `du ${start.format('dddd D MMMM YYYY [à] H[h]')}
au ${end.format('dddd D MMMM YYYY [à] H[h]')}`;
  }
  if (start.format('mm') == '00') {
    // du lundi 1 janvier 2016 à 9h au lundi 1 janvier 2017 à 18h30
    return `du ${start.format('dddd D MMMM YYYY [à] H[h]')}
au ${end.format('dddd D MMMM YYYY [à] H[h]mm')}`;
  }
  if (end.format('mm') == '00') {
    // du lundi 1 janvier 2016 à 9h30 au lundi 1 janvier 2017 à 18h
    return `du ${start.format('dddd D MMMM YYYY [à] H[h]mm')}
au ${end.format('dddd D MMMM YYYY [à] H[h]')}`;
  }
  // du lundi 1 janvier 2016 à 9h30 au lundi 1 janvier 2017 à 18h30
  return `du ${start.format('dddd D MMMM YYYY [à] H[h]mm')}
au ${end.format('dddd D MMMM YYYY [à] H[h]mm')}`;
}
