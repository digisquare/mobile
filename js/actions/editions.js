export const SELECT_EDITION = 'SELECT_EDITION';

export function selectEdition(edition) {
  return {
    type: SELECT_EDITION,
    edition,
  };
}
