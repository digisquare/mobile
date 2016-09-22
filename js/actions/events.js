import moment from 'moment/min/moment-with-locales';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export function fetchEventsRequest(edition) {
  return {
    type: FETCH_EVENTS_REQUEST,
    edition,
  };
}

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export function fetchEventsSuccess(edition, json) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    edition,
    events: json.events,
    receivedAt: Date.now(),
  };
}

export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export function fetchEventsFailure(edition, error) {
  return {
    type: FETCH_EVENTS_FAILURE,
    edition,
    error,
    receivedAt: Date.now(),
  };
}

export function fetchEvents(edition) {
  return (dispatch) => {
    dispatch(fetchEventsRequest(edition));

    const url = 'https://digisquare.net/events.json?'
      + `end_at=${moment().format('YYYY-MM-DD HH:mm')}`
      + `&edition_id=${edition}`
      + '&sort=start_at'
      + '&direction=asc'
      + '&limit=100';

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(fetchEventsSuccess(edition, json)))
      .catch(error => dispatch(fetchEventsFailure(edition, error)));
  };
}
