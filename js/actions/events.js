import moment from 'moment/min/moment-with-locales';

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export function requestEvents(edition) {
  return {
    type: REQUEST_EVENTS,
    edition,
  }
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export function receiveEvents(edition, json) {
  return {
    type: RECEIVE_EVENTS,
    edition,
    events: json.events,
    receivedAt: Date.now(),
  }
}

export function fetchEvents(edition) {
  return dispatch => {
    dispatch(requestEvents(edition));

    const url = 'https://digisquare.net/events.json?'
      + 'end_at=' + moment().format('YYYY-MM-DD')
      + '&edition_id=' + edition
      + '&sort=start_at'
      + '&direction=asc';

    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveEvents(edition, json))
      })
      .done();
  }
}
